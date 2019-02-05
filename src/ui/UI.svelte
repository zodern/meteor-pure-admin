<script>
import Header from './Header.svelte';
import Nav from './Nav.svelte';

export default {
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
    }
  }
}
</script>
<div class="wrapper">
  <Nav {menu} activePage={activePage} on:goTo />
  <div class="content">
    <Header title={title} />
    <div ref:content class="contentComponent"></div>
  </div>
</div>
<style>

</style>
