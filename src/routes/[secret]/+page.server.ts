import { getPocketBase } from "$lib/pocketbase";
import { redirect, type Cookies } from "@sveltejs/kit";

export async function load({ params, cookies }: { params: { secret: string }, cookies: Cookies }) {
    const pb = getPocketBase();
    const secret = params.secret;
    let user: any;

    try {
        user = await pb.collection("votes").getOne(secret);
    } catch (error) {
        redirect(302, "/")
    }

    if (user) {
        cookies.set("secret", secret, { path: "/" })
        cookies.set("user", user.user, { path: "/" })
    }
    
    redirect(302, "/")
}