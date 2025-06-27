"use client";

import { useEffect, useState } from "react";
import getUser from "@/hooks/getUser";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import SignOut from "@/lib/signout";
import { CreateGameModal } from "@/components/CreateGameModal";
import {
    Input as ShadcnInput
} from '@/components/ui/input';

const hc_links = `
        https://hackclub.com/stickers/macintosh.svg
        https://hackclub.com/stickers/2020_progress.png
        https://hackclub.com/stickers/enjoy.svg
        https://hackclub.com/stickers/2016_hack_camp.svg
        https://hackclub.com/stickers/2018_holidays.svg
        https://hackclub.com/stickers/2020_progress.png
        https://hackclub.com/stickers/2020_storm_the_hack.png
        https://hackclub.com/stickers/2021_design_awards.png
        https://hackclub.com/stickers/2023_OnBoard_hatching_orpheus.png
        https://hackclub.com/stickers/AI_safety_campfire.png
        https://hackclub.com/stickers/AI_safety_meme.png
        https://hackclub.com/stickers/Blot.png
        https://hackclub.com/stickers/FIRST_co-branded_no_ears_sticker.png
        https://hackclub.com/stickers/HackHackClub.png
        https://hackclub.com/stickers/I_❤️_HC.png
        https://hackclub.com/stickers/In-N-Out.png
        https://hackclub.com/stickers/MRT.png
        https://hackclub.com/stickers/OnBoard_holographic_sticker.png
        https://hackclub.com/stickers/Rummage.png
        https://hackclub.com/stickers/adobe.svg
        https://hackclub.com/stickers/airlines.png
        https://hackclub.com/stickers/all_fun_javascript.svg
        https://hackclub.com/stickers/anxiety.png
        https://hackclub.com/stickers/apocalypse.png
        https://hackclub.com/stickers/arcade.png
        https://hackclub.com/stickers/assemble.svg
        https://hackclub.com/stickers/black_lives_matter.svg
        https://hackclub.com/stickers/bottle_caps.png
        https://hackclub.com/stickers/burst.png
        https://hackclub.com/stickers/drake.svg
        https://hackclub.com/stickers/emergency_meeting.svg
        https://hackclub.com/stickers/enjoy.svg
        https://hackclub.com/stickers/epoch.png
        https://hackclub.com/stickers/epoch_among_us.png
        https://hackclub.com/stickers/epoch_bubbly.png
        https://hackclub.com/stickers/epoch_h.png
        https://hackclub.com/stickers/find out.png
        https://hackclub.com/stickers/game_lab.png
        https://hackclub.com/stickers/game_lab_flask.png
        https://hackclub.com/stickers/grab.png
        https://hackclub.com/stickers/hack-club-anime.png
        https://hackclub.com/stickers/hack_club_HQ.png
        https://hackclub.com/stickers/hack_in_the_club.svg
        https://hackclub.com/stickers/hack_ok_please.png
        https://hackclub.com/stickers/hack_strikes_back.svg
        https://hackclub.com/stickers/hack_to_the_future.svg
        https://hackclub.com/stickers/hackers,_assemble!.png
        https://hackclub.com/stickers/hacky_new_year.png
        https://hackclub.com/stickers/hcb.png
        https://hackclub.com/stickers/hcb_(dark).png
        https://hackclub.com/stickers/hcb_pumpkin.png
        https://hackclub.com/stickers/hcb_sticker_sheet_1.png
        https://hackclub.com/stickers/hcb_sticker_sheet_2.png
        https://hackclub.com/stickers/horizon_computer.png
        https://hackclub.com/stickers/horizon_patch.png
        https://hackclub.com/stickers/horse.png
        https://hackclub.com/stickers/inside.png
        https://hackclub.com/stickers/jetlag.png
        https://hackclub.com/stickers/jurassic_hack.png
        https://hackclub.com/stickers/log_on.png
        https://hackclub.com/stickers/logo.png
        https://hackclub.com/stickers/m_a_s_h.png
        https://hackclub.com/stickers/macintosh.svg
        https://hackclub.com/stickers/mo' parts mo' problems.png
        https://hackclub.com/stickers/nasa.svg
        https://hackclub.com/stickers/nest_hat_orpheus.png
        https://hackclub.com/stickers/nest_hatched_smolpheus.png
        https://hackclub.com/stickers/orpheus-having-boba.png
        https://hackclub.com/stickers/orpheus-skateboarding-PCB.png
        https://hackclub.com/stickers/orpheus_flag.svg
        https://hackclub.com/stickers/orpheus_goes_to_FIRST_robotics.png
        https://hackclub.com/stickers/orpheus_with_duck.png
        https://hackclub.com/stickers/orphmoji_peefest.png
        https://hackclub.com/stickers/orphmoji_scared.png
        https://hackclub.com/stickers/orphmoji_yippee.png
        https://hackclub.com/stickers/pride.svg
        https://hackclub.com/stickers/raycast.png
        https://hackclub.com/stickers/riveter.svg
        https://hackclub.com/stickers/semicolon.svg
        https://hackclub.com/stickers/ship.png
        https://hackclub.com/stickers/sinerider_blue.png
        https://hackclub.com/stickers/sinerider_pink.png
        https://hackclub.com/stickers/single neuron activated.png
        https://hackclub.com/stickers/skullpup.png
        https://hackclub.com/stickers/skullpup_boba.png
        https://hackclub.com/stickers/skullpup_pixel.png
        https://hackclub.com/stickers/sledding.png
        https://hackclub.com/stickers/some_assembly_required.png
        https://hackclub.com/stickers/sprig.svg
        https://hackclub.com/stickers/sprig_holographic.png
        https://hackclub.com/stickers/stranger_hacks.png
        https://hackclub.com/stickers/summer_of_making.svg
        https://hackclub.com/stickers/swiss_miss.png
        https://hackclub.com/stickers/the-bin.png
        https://hackclub.com/stickers/the_trail_sticker_sheet.png
        https://hackclub.com/stickers/tiktok.svg
        https://hackclub.com/stickers/tootsie_roll.png
        https://hackclub.com/stickers/undertale.svg
        https://hackclub.com/stickers/valorant.png
        https://hackclub.com/stickers/valorant_vertical.svg
        https://hackclub.com/stickers/zephyr.svg`.split("\n").map(s => s.trim()).filter(Boolean);

const randomSticker = hc_links[Math.floor(Math.random() * hc_links.length)];

export default function PlayPage() {
    const [name, setName] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [joinGameId, setJoinGameId] = useState("");
    const [joinPassword, setJoinPassword] = useState("");
    const [joinError, setJoinError] = useState<string | null>(null);
    const [joinLoading, setJoinLoading] = useState(false);
    const [games, setGames] = useState<any[]>([]);
    const [gamesLoading, setGamesLoading] = useState(true);
    const [gamesError, setGamesError] = useState<string | null>(null);
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

    useEffect(() => {
        async function fetchGames() {
            setGamesLoading(true);
            setGamesError(null);
            try {
                const supabase = (await import("@/lib/supabase/client")).createClient();
                const { data, error } = await supabase
                    .from("games")
                    .select("id, name, game_status, participants")
                    .in("game_status", ["pending", "started"])
                    .order("created_at", { ascending: false });
                if (error) setGamesError(error.message);
                else setGames(data || []);
            } catch (err) {
                setGamesError("Failed to load games.");
            }
            setGamesLoading(false);
        }
        fetchGames();
    }, []);

    if (loading) return <Loading />;

    const handleLogout = async () => {
        await SignOut();
        router.replace("/");
    };

    async function handleJoinGame(e: React.FormEvent) {
        e.preventDefault();
        setJoinError(null);
        setJoinLoading(true);
        try {
            const supabase = (await import("@/lib/supabase/client")).createClient();
            const { data: game, error: gameError } = await supabase
                .from("games")
                .select("*")
                .eq("id", joinGameId.trim())
                .single();
            if (gameError || !game) {
                setJoinError("Game not found.");
                setJoinLoading(false);
                return;
            }
            if (joinPassword !== game.password) {
                setJoinError("Incorrect password.");
                setJoinLoading(false);
                return;
            }
            const userData = await getUser();
            if (!userData || !userData.id) {
                setJoinError("User not found.");
                setJoinLoading(false);
                return;
            }
            const participants = Array.isArray(game.participants) ? game.participants : [];
            const alreadyJoined = participants.some((p: any) => p.id === userData.id);
            if (!alreadyJoined) {
                participants.push({ id: userData.id, name: userData.user_metadata?.name});
                const { error: updateError } = await supabase
                    .from("games")
                    .update({ participants })
                    .eq("id", game.id);
                if (updateError) {
                    setJoinError("Failed to join game.");
                    setJoinLoading(false);
                    return;
                }
            }
            router.replace(`/play/${game.id}`);
        } catch (err) {
            setJoinError("Failed to join game.");
        }
        setJoinLoading(false);
    }
    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-sm space-y-8">
                <div className="text-center space-y-4">
                    <img 
                        src={randomSticker} 
                        alt="Hack Club Sticker" 
                        className="w-16 h-16 mx-auto object-contain" 
                    />
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {name ? `Hi, ${name}` : "Welcome"}
                    </h1>
                </div>

                <div className="space-y-4">
                    <h2 className="text-lg font-medium text-gray-800 dark:text-white text-center">Available games</h2>
                    {gamesLoading ? (
                        <div className="text-center text-gray-500">Loading games...</div>
                    ) : gamesError ? (
                        <div className="text-center text-red-500">{gamesError}</div>
                    ) : games.length === 0 ? (
                        <div className="text-center text-gray-500">No games available.</div>
                    ) : (
                        <ul className="divide-y divide-zinc-800 rounded-lg border border-zinc-800 bg-zinc-900 overflow-hidden mt-4 mb-4">
                            {games.slice(0, 8).map(g => (
                                <li key={g.id} className="flex items-center justify-between px-3 py-3">
                                    <div>
                                        <div className="font-medium text-white truncate max-w-[10rem]">{g.name || g.id}</div>
                                        <div className="text-xs text-zinc-400">{g.game_status} • {(Array.isArray(g.participants) ? g.participants.length : 0)} players</div>
                                    </div>
                                    <button
                                        className="ml-2 px-3 py-1 rounded bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-colors whitespace-nowrap"
                                        onClick={() => setJoinGameId(g.id)}
                                    >Join game</button>
                                </li>
                            ))}
                            {games.length > 8 && (
                                <li className="text-xs text-center text-zinc-500 py-2">...and {games.length - 8} more</li>
                            )}
                        </ul>
                    )}
                </div>

                <div className="space-y-6">
                    <CreateGameModal />
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white dark:bg-gray-900 px-2 text-gray-500">or</span>
                        </div>
                    </div>
                    <form onSubmit={handleJoinGame} className="space-y-4">
                        <ShadcnInput
                            type="text"
                            value={joinGameId}
                            onChange={e => setJoinGameId(e.target.value)}
                            placeholder="Game ID"
                            required
                            className="w-full"
                        />
                        <ShadcnInput
                            type="password"
                            value={joinPassword}
                            onChange={e => setJoinPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="w-full"
                        />
                        <button
                            type="submit"
                            disabled={joinLoading}
                            className="w-full bg-black dark:bg-white text-white dark:text-black py-2.5 rounded-md font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {joinLoading ? "Joining..." : "Join game"}
                        </button>
                        {joinError && (
                            <p className="text-red-500 text-sm text-center">{joinError}</p>
                        )}
                    </form>
                </div>
            </div>
            <button
                onClick={handleLogout}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm font-medium"
            >
                Logout
            </button>
        </main>
    );
}