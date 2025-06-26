import { createClient } from "./supabase/client";

export default async function SignOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
}
