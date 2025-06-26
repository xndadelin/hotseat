import { createClient } from "./supabase/client";


function generateRandomNumber() {
    const number = Math.floor(Math.random() * 900 + 100);
    return `${number}`;
}


export default async function SignIn(name: string) {
    const supabase = createClient()

    await supabase.auth.signInAnonymously({
        options: {
            data: {
                name: name + generateRandomNumber(),
            }
        }
    })
    window.location.href = "/play";
}   