<script>
export default {
  data() {
    return {
      title: '',
      canGoBack: true,
      canGoForward: true
    }
  }
};
</script>

<header>
  <button disabled="{!canGoBack}" on:click="fire('goBack')">&#8249;</button>
  <button disabled="{!canGoForward}" on:click="fire('goForward')">&#8250;</button>
  <h1>{title}</h1>
</header>
