"use client";

import { useEffect, useState } from "react";
import getUser from "@/hooks/getUser";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import SignOut from "@/lib/signout";
import { CreateGameModal } from "@/components/CreateGameModal";

export default function PlayPage() {
    const [name, setName] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const router = useRouter();

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

    const handleLogout = async () => {
        await SignOut();
        router.replace("/");
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center relative">
            <div className="absolute top-4 left-4">
                <span className="text-lg font-semibold text-orange-500">
                    Hello, {name}!
                </span>
            </div>
            <div className="absolute top-4 right-4">
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-orange-500 text-white rounded shadow hover:bg-orange-600 transition-colors"
                >
                    Logout
                </button>
            </div>

            <CreateGameModal />

        </main>
    );
}
