<script lang="ts">
  import type { Writable } from 'svelte/store';
  import type { IStore } from '../../store/app.store';

  interface Props {
    store: Writable<IStore>;
  }

  let { store }: Props = $props();

  const addNameToList = () => {
    const userName = $store.inputName;

    if (validate(userName)) {
      $store.names.push(userName);
      $store.inputName = '';
      $store.showError = false;
    } else {
      $store.showError = true;
    }
  };

  const validate = (v: string) => {
    $store.error = '';
    if (v === '') {
      $store.error = 'Sorry, no empty name';
      return false;
    }

    if ($store.names.includes(v)) {
      $store.error = 'Sorry, names must by unique';
      return false;
    }

    return true;
  };

  const removeName = (name: string) => {
    // $store.names = $store.names.filter((n) => n !== name);
    store.update((prev) => ({
      ...prev,
      names: prev.names.filter((n) => n !== name),
    }));
  };

  const showResults = () => {
    $store.error = '';
    if ($store.names.length >= 2) {
      $store.state = false;
    } else {
      $store.error = 'You need at least 2 names';
      $store.showError = true;
    }
  };
</script>

<div class="container">
  <div class="logo">
    <h1>Who pays the bill</h1>
  </div>
  <div class="input_container">
    <input type="text" bind:value={$store.inputName} />
    <button onclick={addNameToList}>Add</button>
  </div>

  {#if $store.showError}
    <div class="error_label">
      {$store.error}
    </div>
  {/if}

  <div class="list_of_names">
    {#each $store.names as name, index (name)}
      <button onclick={() => removeName(name)}
        >{name}</button
      >
    {/each}
  </div>

  <button class="action_button" onclick={showResults}>
    Who's the Looser?
  </button>
</div>
