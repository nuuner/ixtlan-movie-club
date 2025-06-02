<script lang="ts">
    import Ticket from "./Ticket.svelte";
    import { Step, step } from "../step.svelte";
    let { data } = $props()
</script>

<div class="absolute top-0 left-0 w-full h-full flex flex-col justify-center p-4 z-5 bg-gradient-to-b from-gray-950 to-gray-900">
    <div class="absolute top-0 left-0 w-full h-full flex flex-col justify-center p-4">
        {#if data.isLoggedIn}
        <h1 class="text-2xl font-bold mb-4">Welcome {data.user}</h1>
        <p>
            You can vote with your <Ticket color="red" /> <span class="text-red-500 font-bold">red ticket</span>. The red ticket is worth <b>1 point</b> and can be voted on any movie.
        </p>
        <p class="mt-2">
            The <Ticket color="gold" /> <span class="text-yellow-500 font-bold">golden ticket</span> is worth <b>2 points</b> but can only be voted on suggestions of others.
        </p>
        {:else}
        <h1 class="text-2xl font-bold mb-4">Welcome to the Ixtlan Team Movie Club</h1>
        <p class="mb-2">
            <span class="font-bold">Ixtlan Team Movie Club</span> is a movie watching club on Ixtlan Team d.o.o. Attendance is free but you can donate for a good cause of helping fix Ivan's back.
        </p>
        {/if}
        <p class="flex items-center gap-1 mt-4">
            <button class="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer" onclick={() => {
                step.current = Step.Voting;
                const videos = document.getElementsByTagName("video")
                if (videos.length > 0) {
                    videos[0].play()
                    videos[0].muted = false
                }
                let volume = 0;
                const interval = setInterval(() => {
                    volume += 0.01;
                    videos[0].volume = volume;
                    if (volume >= 0.5) {
                        clearInterval(interval);
                    }
                }, 10);
                }}>
                {data.isLoggedIn ? "Vote" : "See movies"}
            </button>
        </p>
    </div>
</div>