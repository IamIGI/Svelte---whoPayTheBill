<script lang="ts">
  import type { Writable } from 'svelte/store';
  import {
    resetStore,
    type IStore,
  } from '../../store/app.store';
  import { onMount } from 'svelte';

  interface Props {
    store: Writable<IStore>;
  }

  let { store }: Props = $props();

  let resultPromise = $state<Promise<string> | null>(null);

  const getRandomName = () => {
    return $store.names[
      Math.floor(Math.random() * $store.names.length)
    ];
  };

  const updateStoreResult = () => {
    let randomName = getRandomName();
    if ($store.result !== '') {
      while (randomName === $store.result) {
        randomName = getRandomName();
      }
    }
    $store.result = randomName;
    return randomName;
  };

  const generateResult = async () => {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        const rand = updateStoreResult();
        resolve(rand);
      }, 1000);
    });
  };

  const getNewResult = () => {
    updateStoreResult();
  };

  const resetApp = () => {
    resetStore();
    resultPromise = null;
  };

  onMount(() => {
    resultPromise = generateResult();
  });
</script>

<div class="container">
  <div class="result_container">
    <h1>The looser is:</h1>
    {#if resultPromise}
      {#await resultPromise}
        <div class="result_value">Loading...</div>
      {:then}
        <div class="result_value">
          {$store.result}
        </div>
        <button class="action_button" onclick={resetApp}>
          Start over
        </button>
        <br />
        <button
          class="action_button btn2"
          onclick={getNewResult}
        >
          Get a new name
        </button>
      {/await}
    {/if}
  </div>
</div>
