'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';

export const CreateGameModal = () => {
    const [gameName, setNameGame] = useState<string>("");
    const [gamePassword, setGamePassword] = useState<string>("");
    const [userCount, setUserCount] = useState<number>(1);
    const [questionCount, setQuestionCount] = useState<number>(1)
    const [time, setTime] = useState<number>(1);
    const [category, setCategory] = useState<string>("");
    const router = useRouter();

    const categories = [
        'General',
        'Science',
        'History',
        'Technology',
        'Geography',
        'Pop Culture',
        'Sports',
        'Math',
        'Programming',
        'Art',
        'Music',
        'Movies',
        'Other',
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const supabase = createClient();
        const { data: userData } = await supabase.auth.getUser();
        const userId = userData?.user?.id;
        const userName = userData?.user?.user_metadata?.name
        if (!userId) {
            alert('you must be logged in to create a game.');
            return;
        }
        const { data, error } = await supabase.from('games').insert([
            {
                name: gameName,
                password: gamePassword ? gamePassword : null,
                user_count: userCount,
                question_count: questionCount,
                time_minutes: time,
                created_by: userId,
                participants: [{ id: userId, name: userName }],
                category: category,
            }
        ]).select('id');
        if (error) {
            alert('error creating game: ' + error.message);
        } else if (data && data[0]?.id) {
            router.push(`/play/${data[0].id}`);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full bg-black dark:bg-white text-white dark:text-black py-2.5 rounded-md font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                    Create Game
                </Button>
            </DialogTrigger>
            <DialogContent className='max-w-md'>
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Create Game</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor='gameName' className="text-sm font-medium">Game Name</Label>
                            <Input
                                id="gameName"
                                placeholder="Enter game name"
                                onChange={(e) => setNameGame(e.target.value)}
                                value={gameName}
                                required
                                className="mt-1"
                            />
                        </div>
                        
                        <div>
                            <Label htmlFor='gamePassword' className="text-sm font-medium">Password (optional)</Label>
                            <Input
                                id="gamePassword"
                                type="password"
                                placeholder="Enter password"
                                onChange={(e) => setGamePassword(e.target.value)}
                                className="mt-1"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor='userCount' className="text-sm font-medium">Players</Label>
                                <Input
                                    id="userCount"
                                    type="number"
                                    min={1}
                                    placeholder="10"
                                    onChange={(e) => setUserCount(Number(e.target.value))}
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor='questionCount' className="text-sm font-medium">Questions</Label>
                                <Input
                                    id="questionCount"
                                    type="number"
                                    min={1}
                                    placeholder="20"
                                    onChange={(e) => setQuestionCount(Number(e.target.value))}
                                    className="mt-1"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor='time' className="text-sm font-medium">Time (min)</Label>
                                <Input
                                    id="time"
                                    type="number"
                                    min={1}
                                    placeholder="2"
                                    onChange={(e) => setTime(Number(e.target.value))}
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor='category' className="text-sm font-medium">Category</Label>
                                <Select value={category} onValueChange={setCategory} required>
                                    <SelectTrigger className="mt-1">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map(cat => (
                                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="flex gap-2 pt-4">
                        <DialogClose asChild>
                            <Button variant="outline" type="button" className="flex-1">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" className="flex-1 bg-black dark:bg-white text-white dark:text-black font-medium hover:bg-gray-800 dark:hover:bg-gray-100">
                            Create
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}