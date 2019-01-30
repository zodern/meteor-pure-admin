<script>
export default {
  data() {
    return {
      title: '',
      showBack: false
    }
  }
};
</script>
<header>
{#if showBack}
  <button on:click>Back</button>
{/if}
<h1>{title}</h1>
</header>
