<script lang="ts">
  import Names from './lib/components/Names.svelte';
  import Result from './lib/components/Result.svelte';
  import { store } from './store/app.store';
</script>

{#if $store.state}
  <Names {store} />
{:else}
  <Result {store} />
{/if}
