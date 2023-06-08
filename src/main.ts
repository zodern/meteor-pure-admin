let currentModule: any = null;

if (module.hot && module.hot.onRequire) {
  module.hot.onRequire({
    before(importedModule) {
      if (importedModule.hot) {
        importedModule.hot.dispose(() => {
          PureAdmin._clearForModule(importedModule.id);
        });
      }
      const data = { previousModule: currentModule };
      currentModule = importedModule.id;
      return data;
    },
    after(_module, data) {
      currentModule = data.previousModule;
    }
  });
}

const addedBy = Symbol();

type RenderUtils = {
  renderSvelte: (component: any) => void
};

type Page = {
  name: string,
  render: (utils: RenderUtils, props: any, container: HTMLDivElement) => void,
  title: string | ((props: any) => string),
  [addedBy]?: string
}

type MenuEntry = {
  name: string;
  page?: string;
  section?: string;
  url?: string;
  pageProps?: any;
  [addedBy]?: string;
}

class AdminManager {
  _initHandlers: (() => void)[] = [
    () => import('./css').then(styles => {
      this.addCss(styles.default);
    })
  ];
  pages: {
    [key: string]: Page
  } = {};
  menu: {
    [key: string]: MenuEntry[]
  } = {
    '': [{
      name: 'Dashboard',
      page: 'Dashboard'
    }]
  };
  css: string[] = [];

  container: ShadowRoot | null = null;
  rootComponent: any = null;
  contentEl = null;

  history: {
    page: string,
    props: any
  }[] = [];
  historyIndex = -1;

  activePage: {
    component: any,
    type: string | null,
    name: string | null,
    props: any,
    page: Page | null
  } = {
    component: null,
    type: null,
    name: null,
    props: null,
    page: null
  };

  _injectCss(content: string) {
    const style = document.createElement('style');
    style.textContent = content;
    this.container!.appendChild(style);
  }

  addPage ({
    name,
    render = () => {},
    title = () => name
  }: Page) {
    if (name in this.pages) {
      console.warn(`PureAdmin: page with name already exists: ${name}`);
    }

    this.pages[name] = {
      name,
      render,
      title,
      [addedBy]: currentModule
    };

    if (name === 'Dashboard' && this.activePage.name === null) {
      this.goTo('Dashboard');
    }
  }

  addMenuItem ({
    name,
    section = '',
    page,
    pageProps,
    url
  }: MenuEntry) {
    this.menu[section] = this.menu[section] || [];
    this.menu[section].push({
      name,
      page,
      pageProps,
      url,
      [addedBy]: currentModule
    });

    if (this.rootComponent) {
      this.rootComponent.$set({
        menu: this.menu
      });
    }
  }

  svelteGoTo = (event: { detail: any }) => {
    this.goTo(event.detail);
  }

  goTo = (page: string | { page: string, props: any }) => {
    let props = {};
    if (typeof page === 'object') {
      props = page.props;
      page = page.page;
    }

    if (this.historyIndex < this.history.length - 1) {
      this.history.splice(this.historyIndex + 1, this.history.length - this.historyIndex - 1);
    }

    this.history.push({
      props,
      page
    });
    this.historyIndex += 1;

    this.displayCurrentPage();
  }

  goBack = () => {
    if (this.historyIndex > 0) {
      this.historyIndex -= 1;
      this.displayCurrentPage();
    }
  }

  goForward = () => {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex += 1;
      this.displayCurrentPage();
    }
  }

  displayCurrentPage() {
    const self = this;
    const utils = {
      renderSvelte(_component: any) {
        self.activePage.component = new _component({
          target: self.contentEl,
          props: {
            ...self.activePage.props
          }
        });
        self.activePage.type = 'svelte';
        self.activePage.component.$on('goTo', self.svelteGoTo);
      }
    };

    if (this.activePage.component) {
      switch (this.activePage.type) {
        case 'svelte':
          this.activePage.component.$destroy();
          break;
        default:
          console.warn('unknown content component type', this.activePage.type);
      }
    }

    const {
      props,
      page
    } = this.history[this.historyIndex];
    
    this.activePage = {
      component: null,
      type: null,
      name: page,
      props: props || {},
      page: this.pages[page]
    }

    if (this.activePage.page) {
      this.activePage.page.render(utils, this.activePage.props, this.contentEl!);
    }

    this.rootComponent.$set({
      activePage: this.activePage,
      historyCount: this.history.length,
      historyIndex: this.historyIndex
    });
  }

  addCss(content: string) {
    this.css.push(content);
    if (this.rootComponent) {
      this._injectCss(content);
    }
  }

  onInit(handler: () => void) {
    (handler as any)[addedBy] = currentModule;
    this._initHandlers.push(handler);
    if (this.rootComponent) {
      handler();
    }
  }

  _isAdmin () {
    return new Promise(resolve => {
      Meteor.call('_pa.isAdmin', (err: Meteor.Error, result: boolean) => {
        resolve(!err && result);
      });
    });
  }

  _clearForModule(moduleId: string) {
    Object.keys(this.pages).forEach(key => {
      if (this.pages[key][addedBy] === moduleId) {
        delete this.pages[key];
      }
    });

    Object.keys(this.menu).forEach(sectionName => {
      this.menu[sectionName] = this.menu[sectionName].filter(menuItem => {
        return menuItem[addedBy] !== moduleId;
      });

      if (this.menu[sectionName].length === 0) {
        delete this.menu[sectionName];
      }
    });

    if (this.rootComponent) {
      this.rootComponent.$set({
        menu: this.menu
      });
    }
  }

  async show () {
    if (this.container) {
      console.warn('Already shown');
      return;
    }
    const {default: AdminUI} = await import('./ui/UI.svelte');
    const isAdmin = await this._isAdmin();

    if (!isAdmin) {
      // TODO: create UI component for showing notifications
      alert('You do not have access to this page.');
      return;
    }

    await Promise.all(this._initHandlers.map(handler => {
      let previousModule = currentModule;
      currentModule = (handler as any)[addedBy];
      const potentialPromise = handler()
      currentModule = previousModule;

      return potentialPromise;
    }));

    this.container = document.body.attachShadow({ mode: 'open' });
    this.css.forEach(styles => {
      this._injectCss(styles);
    });
    this.rootComponent = new AdminUI({
      target: this.container,
      props: {
        menu: this.menu,
        activePage: this.activePage
      }
    });
    this.rootComponent.$on('goTo', this.svelteGoTo);
    this.rootComponent.$on('goBack', this.goBack);
    this.rootComponent.$on('goForward', this.goForward);
    this.contentEl = this.rootComponent.getContentEl();

    if (this.pages.Dashboard) {
      this.goTo('Dashboard');
    }
  }

  hide () {
  }
}

export const PureAdmin = new AdminManager;
