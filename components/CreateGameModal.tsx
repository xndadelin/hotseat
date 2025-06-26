'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from 'react'

export const CreateGameModal = () => {
    const [gameName, setNameGame] = useState<string>("");
    const [gamePassword, setGamePassword] = useState<string>("");
    const [userCount, setUserCount] = useState<number>(1);
    const [questionCount, setQuestionCount] = useState<number>(1)
    const [time, setTime] = useState<number>(1);

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline" className='w-full px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-colors text-xl font-bold'>Create game</Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                    <DialogHeader>
                        <DialogTitle>Create a new game</DialogTitle>
                    </DialogHeader>
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
                            <Button variant={"outline"}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Submit</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}