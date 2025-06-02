import { tickets } from "./tickets.svelte";

export interface Movie {
    id: string;
    title: string;
    year: number;
    description: string;
    videolink: string;
}

export let movies: {current: Movie[]} = $state({current: []})
export let selectedMovie: {current: number} = $state({current: 0})

export let getMovie = (index: number) => {
    return movies.current[index]
}

export let nextMovie = () => {
    selectedMovie.current = (selectedMovie.current + 1) % movies.current.length
}

export let previousMovie = () => {
    selectedMovie.current = (selectedMovie.current - 1 + movies.current.length) % movies.current.length
}

export let getRedTicketMovie = () => {
    return movies.current.find((movie: Movie) => movie.id === tickets.redticket)
}

export let getGoldTicketMovie = () => {
    return movies.current.find((movie: Movie) => movie.id === tickets.goldticket)
}