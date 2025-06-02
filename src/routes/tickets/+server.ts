import { getPocketBase } from "$lib/pocketbase";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ cookies, request }) => {
    const pb = getPocketBase();
    const secret = cookies.get("secret")
    if (!secret) {
        return json({
            error: "No secret cookie"
        }, { status: 401 })
    }
    let user: any
    try {
        user = await pb.collection("votes").getOne(secret)
    } catch (error) {
        return json({
            error: "Invalid secret cookie"
        }, { status: 401 })
    }
    
    const body = await request.json()
    
    let allMovies = await pb.collection("movies").getFullList()
    
    let redTicketMovie = allMovies.find(movie => movie.id === body.redticket)
    let goldTicketMovie = allMovies.find(movie => movie.id === body.goldticket)

    // check gold ticket
    if (goldTicketMovie && goldTicketMovie.suggester == user.id) {
        goldTicketMovie = undefined;
    }

    const result = await pb.collection("votes").update(secret, {
        redticket: redTicketMovie ? redTicketMovie.id : null,
        goldticket: goldTicketMovie ? goldTicketMovie.id : null
    })
    
    return json(result)
}

export const GET: RequestHandler = async ({ cookies }) => {
    const pb = getPocketBase();
    const secret = cookies.get("secret")
    if (!secret) {
        return json({
            error: "No secret cookie"
        }, { status: 401 })
    }
    let user: any
    try {
        user = await pb.collection("votes").getOne(secret)
    } catch (error) {
        return json({
            error: "Invalid secret cookie"
        }, { status: 401 })
    }

    return json(user)
}