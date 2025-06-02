<script lang="ts">
    import Explanation from "$lib/components/Explanation.svelte";
    import Pager from "$lib/components/Pager.svelte";
    import Ticket from "$lib/components/Ticket.svelte";
    import Voting from "$lib/components/Voting.svelte";
    import { getGoldTicketMovie, getRedTicketMovie, movies, selectedMovie, type Movie } from "$lib/movies.svelte";
    import { Step, step } from "$lib/step.svelte";
    import { tickets } from "$lib/tickets.svelte.js";
    import { onMount } from "svelte";
    import { blur, slide } from "svelte/transition";

    let { data } = $props();

    onMount(async () => {
        const moviesResponse = await fetch("/movies");
        const moviesData = await moviesResponse.json();
        movies.current = [...moviesData];
        movies.current.sort((a: Movie, b: Movie) => Math.random() - 0.5);
    
        if (data.isLoggedIn) {
            const ticketsResponse = await fetch("/tickets");
            const ticketsData = await ticketsResponse.json();
            console.log(ticketsData)
            tickets.redticket = ticketsData.redticket;
            tickets.goldticket = ticketsData.goldticket;
        }
    })
</script>

<svelte:head>
    <title>Ixtlan Team Movie Club</title>
</svelte:head>

<div class="absolute top-0 left-0 w-full flex flex-col md:flex-row gap-4 p-4 justify-between z-10 ">
    <div class="flex items-center gap-4">
        <img src="/ixtlan-proto-logo.svg" alt="">
        {#if data.isLoggedIn}
            <p class="text-sm leading-4">Logged in as<br><b>{data.user}</b></p>
        {:else}
            <p>Voting disabled as <b>guest</b></p>
        {/if}
    </div>
    {#if data.isLoggedIn}
    <div class="flex gap-2 flex-col md:flex-row">
        <div class="flex items-center gap-1">
            <Ticket color="red" />
            <p>{getRedTicketMovie()?.title || "None"}</p>
        </div>
        <div class="flex items-center gap-1">
            <Ticket color="gold" />
            <p>{getGoldTicketMovie()?.title || "None"}</p>
        </div>
    </div>
    {/if}
</div>

{#if step.current === Step.Explanation}
    <Explanation {data} />
{/if}

<Voting {data} />

{#if step.current === Step.Voting}
    <Pager />
{/if}
