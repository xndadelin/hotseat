"use client";

import { useEffect, useState } from "react";
import getUser from "@/hooks/getUser";
import Loading from "@/components/Loading";

export default function PlayPage() {
  const [name, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const user = await getUser();
      const userName = user?.user_metadata?.name || null;
      setName(userName);
      setLoading(false);
    }
    fetchUser();
  }, []);

  if (loading) return <Loading />;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Hello, {name || "Anonymous"}!</h1>
    </main>
  );
}
