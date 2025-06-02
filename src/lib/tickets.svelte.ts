import type { Movie } from "./movies.svelte"

export let tickets: {redticket: string | null, goldticket: string | null} = $state({redticket: null, goldticket: null})
let timer: number | null = null

export let setRedTicket = (movie: Movie) => {
    tickets.redticket = movie.id
    if (tickets.goldticket === movie.id) {
        tickets.goldticket = null
    }
    updateTicket()
}

export let setGoldTicket = (movie: Movie) => {
    tickets.goldticket = movie.id
    if (tickets.redticket === movie.id) {
        tickets.redticket = null
    }
    updateTicket()
}

export let clearRedTicket = () => {
    tickets.redticket = null
    updateTicket()
}

export let clearGoldTicket = () => {
    tickets.goldticket = null
    updateTicket()
}

export let updateTicket = async () => {
    // Clear existing timer if it exists
    if (timer !== null) {
        clearTimeout(timer)
    }
    
    // Set a new timer to debounce the update
    timer = setTimeout(async () => {
        const response = await fetch("/tickets", {
            method: "POST",
            body: JSON.stringify(tickets)
        })
        const data = await response.json()
        tickets.redticket = data.redticket
        tickets.goldticket = data.goldticket
        timer = null
    }, 300)
}