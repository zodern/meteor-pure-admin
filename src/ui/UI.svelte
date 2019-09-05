<script>
import Header from './Header.svelte';
import Nav from './Nav.svelte';

export default {
  data() {
    return {
      activePage: {},
      historyCount: 0,
      historyIndex: 0
    }
  },
  components: {
    Nav,
    Header
  },
  computed: {
    title ({ activePage }) {
      if (!activePage || !activePage.page) {
        return 'Untitled';
      }

      if (typeof activePage.page.title === 'function') {
        return activePage.page.title(activePage.props);
      } else {
        return activePage.page.title || 'Untitled';
      }
    },
    canGoBack ({ historyCount, historyIndex }) {
      return historyIndex > 0
    },
    canGoForward ({ historyCount, historyIndex }) {
      return historyIndex + 1 < historyCount;
    }
  }
}
</script>
<div class="wrapper">
  <Nav {menu} activePage={activePage} on:goTo />
  <div class="content">
    <Header title={title} {canGoForward} {canGoBack } on:goBack on:goForward />
    <div ref:content class="contentComponent"></div>
  </div>
</div>
<style>

</style>
