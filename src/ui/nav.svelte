<script>
export default {
  data() {
    return {
      menu: {}
    };
  },
  methods: {
    openPage (page) {
      if (page.page) {
        this.fire('goTo', { page: page.page, props: page.pageProps })
      } else if (page.url) {
        window.open(page.url, '_blank');
      }
    }
  },
  computed: {
    sections ({ menu}) {
      return Object.entries(menu).sort(([name1], [name2]) => {
        return name1.length - name2.length;
      });
    }
  },
  helpers: {
    isSelected (page, activePage) {
      if (!page.pageProps && page.page === activePage.name) {
        return true;
      }
      if (page.pageProps && activePage.props) {
        return Object.keys(page.pageProps)
          .every(propName => page.pageProps[propName] === activePage.props[propName]);
      }

      return false;
    }
  }
};
</script>
<nav>
<h1>Admin</h1>
{#each sections as [name, pages]}
  <h2>{name}</h2>
  {#each pages as page}
    <div class="page" class:selected="isSelected(page, activePage)" on:click="openPage(page)">{page.name}</div>
  {/each}
{/each}
</nav>
<style>
div {
  width: 200px;
}
</style>
