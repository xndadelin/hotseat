import { createClient } from "./supabase/client";


function generateRandomUsername() {
    const adjectives = [
        "Fast", "Smart", "Happy", "Sneaky", "Loud", "Epic", "Brave", "Zany", "Quick", "Chill"
    ];
    const nouns = [
        "Tiger", "Wizard", "Banana", "Genius", "Sloth", "Penguin", "Ninja", "Panda", "Otter", "Cactus"
    ];
    const number = Math.floor(Math.random() * 900 + 100);

    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];

    return `${adjective}${noun}${number}`;
}


export default async function SignIn() {
    const supabase = createClient()

    await supabase.auth.signInAnonymously({
        options: {
            data: {
                name: generateRandomUsername(),
            }
        }
    })
    window.location.href = "/play";
}   