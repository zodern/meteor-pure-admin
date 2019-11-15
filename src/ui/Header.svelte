<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let title = "";
  export let canGoBack = true;
  export let canGoForward = true;
</script>

<header>
  <button disabled={!canGoBack} on:click={() => dispatch('goBack')}>
    &#8249;
  </button>
  <button disabled={!canGoForward} on:click={() => dispatch('goForward')}>
    &#8250;
  </button>
  <h1>{title}</h1>
</header>
