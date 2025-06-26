import { createClient } from "@/lib/supabase/client";


const getUser = () => {
    const supabase = createClient();
    return supabase.auth.getUser().then(({ data }) => {
        return data.user;
    }).catch((error) => {
        console.error("Error fetching user:", error);
        return null;
    });
}

export default getUser;