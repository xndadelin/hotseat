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

export const CreateGameModal = () => {
    const [gameName, setNameGame] = useState<string>("");
    const [gamePassword, setGamePassword] = useState<string>("");
    const [userCount, setUserCount] = useState<number>(1);
    const [questionCount, setQuestionCount] = useState<number>(1)
    const [time, setTime] = useState<number>(1);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const supabase = createClient();
        const { data: userData } = await supabase.auth.getUser();
        const userId = userData?.user?.id;
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
                <Button variant="outline" className="bg-green-600 text-white hover:bg-green-700">Create game</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Create a new game</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className='grid gap-4 grid-cols-2'>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='gameName'>Game name</Label>
                            <Input
                                id="gameName"
                                name="gameName"
                                placeholder="Enter game name..."
                                onChange={(e) => setNameGame(e.target.value)}
                                value={gameName}
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='gamePassword'>Game password</Label>
                            <Input
                                id="gamePassword"
                                name="gamePassword"
                                type="password"
                                placeholder="Enter game password..."
                                onChange={(e) => setGamePassword(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='userCount'>Number of users</Label>
                            <Input
                                id="userCount"
                                name="userCount"
                                type="number"
                                min={1}
                                placeholder="e.g. 10"
                                onChange={(e) => setUserCount(Number(e.target.value))}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='questionCount'>Number of questions</Label>
                            <Input
                                id="questionCount"
                                name="questionCount"
                                type="number"
                                min={1}
                                placeholder="e.g. 20"
                                onChange={(e) => setQuestionCount(Number(e.target.value))}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='time'>Time (minutes)</Label>
                            <Input
                                id="time"
                                name="time"
                                type="number"
                                min={1}
                                placeholder="e.g. 2"
                                onChange={(e) => setTime(Number(e.target.value))}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">
                            Submit
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}