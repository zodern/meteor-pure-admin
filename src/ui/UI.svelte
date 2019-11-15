<script>
  import Header from "./Header.svelte";
  import Nav from "./Nav.svelte";
  import { onMount } from "svelte";

  export let activePage;
  export let historyCount = 0;
  export let historyIndex = 0;
  export let menu;

  let title;
  $: {
    if (!activePage || !activePage.page || !activePage.page.title) {
      title = "Untitled";
    } else if (typeof activePage.page.title === "function") {
      title = activePage.page.title(activePage.props);
    } else {
      title = activePage.page.title;
    }
  }

  $: canGoForward = historyIndex + 1 < historyCount;
  $: canGoBack = historyIndex > 0;

  let contentEl;
  export function getContentEl() {
    return contentEl;
  }
</script>

<div class="wrapper">
  <Nav {menu} {activePage} on:goTo />
  <div class="content">
    <Header {title} {canGoForward} {canGoBack} on:goBack on:goForward />
    <div bind:this={contentEl} class="contentComponent" />
  </div>
</div>
