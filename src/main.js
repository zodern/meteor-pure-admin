class AdminManager {
  _initHandlers = [
    () => import('./css.js').then(styles => {
      this.addCss(styles.default);
    })
  ];
  pages = {};
  menu = {
    '': [{
      name: 'Dashboard',
      page: 'Dashboard'
    }]
  };
  css = [];

  container = null;
  rootComponent = null;
  contentComponent = null;

  history = [];
  activePage = {
    component: null,
    type: null,
    name: null,
    props: null,
    page: null
  };

  _injectCss(content) {
    const style = document.createElement('style');
    style.textContent = content;
    this.container.appendChild(style);
  }

  addPage ({
    name,
    render = () => {},
    title = () => name
  }) {
    // TODO: show warning when name already exists
    if (name in this.pages) {
      console.warn(`PureAdmin: page with name already exists: ${name}`);
    }

    this.pages[name] = {
      name,
      render,
      title
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
  }) {
    this.menu[section] = this.menu[section] || [];
    this.menu[section].push({
      name,
      page,
      pageProps,
      url
    });

    if (this.rootComponent) {
      this.rootComponent.set({
        menu: this.menu
      });
    }
  }

  goTo = (page) => {
    let props = {};
    if (typeof page === 'object') {
      props = page.props;
      page = page.page;
    }

    const self = this;
    const utils = {
      renderSvelte(_component) {
        self.activePage.component = new _component({
          target: self.contentEl,
          data: {
            props: self.activePage.props
          }
        });
        self.activePage.type = 'svelte';
        self.activePage.component.on('goTo', self.goTo);
      }
    };

    if (this.activePage.component) {
      switch (this.activePage.type) {
        case 'svelte':
          this.activePage.component.destroy();
          break;
        default:
          console.warn('unknown content component type', this.activePage.type);
      }
    }
    
    this.activePage = {
      component: null,
      type: null,
      name: page,
      props: props || {},
      page: this.pages[page]
    }

    if (this.activePage.page) {
      this.activePage.page.render(utils, this.activePage.props, this.contentEl);
    }
    this.rootComponent.set({
      activePage: this.activePage
    });
  }

  addCss(content) {
    this.css.push(content);
    if (this.rootComponent) {
      this._injectCss(content);
    }
  }

  onInit(handler) {
    this._initHandlers.push(handler);
    if (this.rootComponent) {
      handler();
    }
  }

  _isAdmin () {
    return new Promise(resolve => {
      Meteor.call('_pa.isAdmin', (err, result) => {
        resolve(!err && result);
      });
    });
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

    await Promise.all(this._initHandlers.map(handler => handler()));

    this.container = document.body.attachShadow({ mode: 'open' });
    this.css.forEach(styles => {
      this._injectCss(styles);
    });
    this.rootComponent = new AdminUI({
      target: this.container,
      data: {
        menu: this.menu,
        activePage: this.activePage
      }
    });
    this.rootComponent.on('goTo', this.goTo);
    this.contentEl = this.rootComponent.refs.content;
    if (this.pages.Dashboard) {
      this.goTo('Dashboard');
    }
  }

  hide () {
  }
}

export const PureAdmin = new AdminManager;
