<script>
  import { createEventDispatcher } from "svelte";
  import { EJSON } from "meteor/ejson";

  const dispatch = createEventDispatcher();

  export let menu = {};
  export let activePage;

  $: sections = Object.entries(menu).sort(([name1], [name2]) => {
    return name1.length - name2.length;
  });

  function openPage(page) {
    if (page.page) {
      dispatch("goTo", { page: page.page, props: page.pageProps });
    } else if (page.url) {
      window.open(page.url, "_blank");
    }
  }

  function isSelected(page, activePage) {
    if (!page.pageProps && page.page === activePage.name) {
      return true;
    }
    if (page.pageProps && activePage.props) {
      return EJSON.equals(page.pageProps, activePage.props);
    }

    return false;
  }
</script>

<nav>
  <h1>Admin</h1>
  {#each sections as [name, pages]}
    <h2>{name}</h2>
    {#each pages as page}
      <div
        class="page"
        class:selected={isSelected(page, activePage)}
        on:click={() => openPage(page)}>
        {page.name}
      </div>
    {/each}
  {/each}
</nav>
