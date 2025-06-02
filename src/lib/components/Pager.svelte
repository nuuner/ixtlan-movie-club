<script lang="ts">
    import { movies, selectedMovie } from "$lib/movies.svelte";
    import { tickets } from "$lib/tickets.svelte";

</script>

<div class="fixed bottom-0 left-0 w-full h-10 bg-black z-20 pb-8 flex items-center justify-center gap-2">
    <button aria-label="Previous movie" class="w-4 h-4 flex items-center justify-center cursor-pointer" onclick={() => {
        selectedMovie.current = (selectedMovie.current - 1 + movies.current.length) % movies.current.length;
    }}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
    </button>
    {#each movies.current as movie, index}
        <button class="w-4 h-4 rounded-full cursor-pointer {tickets.redticket === movie.id ? 'bg-red-500' : tickets.goldticket === movie.id ? 'bg-yellow-500' : 'bg-white'} {selectedMovie.current === index ? 'opacity-100' : 'opacity-50'}" aria-label="Go to page {index + 1}" onclick={() => {
            selectedMovie.current = index
        }}></button>
    {/each}
    <button aria-label="Next movie" class="w-4 h-4 flex items-center justify-center cursor-pointer" onclick={() => {
        selectedMovie.current = (selectedMovie.current + 1) % movies.current.length;
    }}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
    </button>
</div>