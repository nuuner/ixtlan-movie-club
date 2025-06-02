import { getPocketBase } from "$lib/pocketbase";
import { json } from "@sveltejs/kit";

export async function GET() {
    const pb = getPocketBase();
    const movies = await pb.collection("movies").getFullList();
    return json(movies);
}