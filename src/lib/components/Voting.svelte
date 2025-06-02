<script lang="ts">
    import { getGoldTicketMovie, getMovie, getRedTicketMovie, nextMovie, previousMovie, selectedMovie } from "$lib/movies.svelte";
    import { setGoldTicket, setRedTicket } from "$lib/tickets.svelte";
    import { onMount } from "svelte";
    import Ticket from "./Ticket.svelte";
    let { data } = $props()
    let movie = $derived(getMovie(selectedMovie.current))
    let blankScreen = $state(true)

    onMount(() => {
        window.addEventListener("keydown", (e) => {
            if (e.key === "ArrowRight" || e.key === " ") {
                blankScreen = true
                nextMovie()
            } else if (e.key === "ArrowLeft") {
                blankScreen = true
                previousMovie()
            }
        })
    })
</script>

<div class="h-screen">
    <div class="absolute top-0 left-0 w-full h-full flex flex-col justify-center p-4">
        <h1 class="text-2xl font-bold">{movie?.title}</h1>
        <p class="text-sm text-gray-100">{movie?.year}</p>
        <p class="text-sm text-gray-100 max-w-md">{movie?.description}</p>
        {#if data.isLoggedIn}
        <div class="flex gap-2 mt-4">
            <button
            class="cursor-pointer p-2 rounded-md bg-gray-600 bg-opacity-50 text-white flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700"
            disabled={getRedTicketMovie()?.id === movie?.id} onclick={() => {
                setRedTicket(movie)
            }}><Ticket color="red" /> Vote with your red ticket</button>
            <button
            class="cursor-pointer p-2 rounded-md bg-gray-600 bg-opacity-50 text-white flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700"
            disabled={getGoldTicketMovie()?.id === movie?.id} onclick={() => {
                setGoldTicket(movie)
            }}><Ticket color="gold" /> Vote with your gold ticket</button>
        </div>
        {/if}
    </div>
    <div class="absolute top-0 left-0 w-full h-full bg-black z-[-1] transition-opacity duration-1000 {blankScreen ? 'opacity-100' : 'opacity-0'}"></div>
    <div class="absolute top-0 left-0 w-full h-full z-[-1] transition-opacity duration-1000 bg-gradient-to-r from-black via-transparent to-transparent"></div>
    {#if movie?.videolink}
        <video onplay={() => {
            blankScreen = false
        }} src={movie?.videolink} muted autoplay loop class="absolute top-0 left-0 w-full h-full object-cover z-[-2]"></video>
    {/if}
</div>