import { getPocketBase } from "$lib/pocketbase";
import type { Cookies } from "@sveltejs/kit";

export async function load({ cookies }: { cookies: Cookies }) {
    const pb = getPocketBase();

    const secret = cookies.get("secret");

    if (secret && cookies.get("user")) {
        const vote = await pb.collection("votes").getOne(secret)
        if (vote) {
            return {"isLoggedIn": true, "user": vote.user}
        } else {
            cookies.delete("secret", { path: "/" })
            cookies.delete("user", { path: "/" })
            return {"isLoggedIn": false}
        }
    } else {
        cookies.delete("secret", { path: "/" })
        cookies.delete("user", { path: "/" })
        return {"isLoggedIn": false}
    }
}