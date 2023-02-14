<script lang="ts">
  import { onMount } from 'svelte';

  let search = '';

  type IPokemon = {
    name: string;
    url: string;
  };

  let baseResults: IPokemon[] = [];

  let results: IPokemon[] = [];

  async function getPokemon(name = '') {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}?offset=0&limit=898`,
      );

      const data = await response.json();

      baseResults = data.results;

      results = baseResults;
    } catch (error) {
      console.log(error);
    }
  }

  onMount(getPokemon);

  $: if (search) {
    results = baseResults.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase()),
    );
  } else {
    results = baseResults;
  }
</script>

<main class="h-full w-full flex gap-5 flex-col p-6">
  <div class="top-0 sticky flex flex-col gap-4 bg-white">
    <div class="text-xl self-center font-semibold">Poke Search</div>

    <input
      class="p-2 rounded outline-none border border-gray-300"
      placeholder="Search by name"
      bind:value={search}
    />
  </div>

  <div class="flex flex-col gap-2 mx-auto">
    {#each results as pokemon, i}
      <div
        class="grid grid-cols-2 gap-2 p-2 items-center border border-gray-300"
      >
        <div class="text-lg font-semibold">#{i + 1} {pokemon.name}</div>
        <div class="text-sm text-gray-500">{pokemon.url}</div>
      </div>
    {/each}
  </div>
</main>

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
