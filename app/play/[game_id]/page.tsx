"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from '@/lib/supabase/client';
import Loading from "@/components/Loading";

const Game = () => {
    const params = useParams();
    const gameId = params.game_id as string;
    const [game, setGame] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const supabase = createClient();
        let subscription: any;
        async function fetchGame() {
            const { data, error } = await supabase.from('games').select('*').eq('id', gameId).single();
            if (error) {
                setError(error.message);
            } else {
                setGame(data);
            }
            setLoading(false);
        }
        fetchGame();
        subscription = supabase
            .channel('public:games')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'games', filter: `id=eq.${gameId}` }, (payload: any) => {
                if (payload.new) setGame(payload.new);
            })
            .subscribe();
        return () => {
            if (subscription) supabase.removeChannel(subscription);
        };
    }, [gameId]);

    if (loading) return <Loading />;
    if (error) return <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-red-400">{error}</div>;
    if (!game) return <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">Game not found</div>;
    
    const handleStartGame = async () => {
        const supabase = createClient();
        const { error } = await supabase
            .from('games')
            .update({ game_status: 'started' })
            .eq('id', game.id);
        if (!error) {
            setGame({ ...game, game_status: 'started' });
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-zinc-900 rounded-lg border border-zinc-800 p-8">
                <h1 className="text-2xl font-bold text-white mb-8 text-center">{game.name}</h1>
                
                <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center py-2 border-b border-zinc-800">
                        <span className="text-zinc-400">Game id</span>
                        <span className="text-white font-mono text-sm">{game.id}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-zinc-800">
                        <span className="text-zinc-400">Status</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                            game.game_status === 'started' 
                                ? 'bg-green-900 text-green-300' 
                                : 'bg-zinc-800 text-zinc-300'
                        }`}>
                            {game.game_status}
                        </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-zinc-800">
                        <span className="text-zinc-400">Questions</span>
                        <span className="text-white">{game.question_count}</span>
                    </div>vr
                    <div className="flex justify-between items-center py-2">
                        <span className="text-zinc-400">Time per question</span>
                        <span className="text-white">{game.time_minutes} sec</span>
                    </div>
                </div>

                {Array.isArray(game.participants) && game.participants.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-sm font-medium text-zinc-400 mb-3">Participants</h3>
                        <div className="space-y-2">
                            {game.participants.map((p: any, idx: number) => (
                                <div key={idx} className="flex items-center gap-2 text-white">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span>{typeof p === 'string' ? p : p.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <button
                    onClick={handleStartGame}
                    disabled={game.game_status === 'started'}
                    className={`w-full py-3 rounded-lg font-medium transition-colors ${
                        game.game_status === 'started'
                            ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                            : 'bg-white text-black hover:bg-zinc-200'
                    }`}
                >
                    {game.game_status === 'started' ? 'Game started' : 'Start game'}
                </button>
            </div>
        </div>
    );
};

export default Game;