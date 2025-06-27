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
    const [questionCount, setQuestionCount] = useState<number>(1)
    const [timePerQuestion, setTimePerQuestion] = useState<number>(10);
    const [category, setCategory] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
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
        setFormError(null);
        if (!gameName.trim() || !category || !questionCount || !timePerQuestion) {
            setFormError('All fields are required.');
            setLoading(false);
            return;
        }
        setLoading(true);
        const supabase = createClient();
        const { data: userData } = await supabase.auth.getUser();
        const userId = userData?.user?.id;
        const userName = userData?.user?.user_metadata?.name
        if (!userId) {
            setFormError('You must be logged in to create a game.');
            setLoading(false);
            return;
        }
        const { data, error } = await supabase.from('games').insert([
            {
                name: gameName,
                password: gamePassword ? gamePassword : null,
                question_count: questionCount,
                time_minutes: timePerQuestion,
                created_by: userId,
                participants: [{ id: userId, name: userName }],
                category: category,
            }
        ]).select('id');
        if (error) {
            setFormError('Error creating game: ' + error.message);
        } else if (data && data[0]?.id) {
            router.push(`/play/${data[0].id}`);
        }
        setLoading(false);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full bg-black dark:bg-white text-white dark:text-black py-2.5 rounded-md font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                    Create game
                </Button>
            </DialogTrigger>
            <DialogContent className='max-w-md'>
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Create Game</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {formError && <div className="text-red-500 text-sm text-center">{formError}</div>}
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor='gameName' className="text-sm font-medium">Game name</Label>
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
                            <div>
                                <Label htmlFor='timePerQuestion' className="text-sm font-medium">Time per question (sec)</Label>
                                <Input
                                    id="timePerQuestion"
                                    type="number"
                                    min={1}
                                    placeholder="10"
                                    value={timePerQuestion}
                                    onChange={(e) => setTimePerQuestion(Number(e.target.value))}
                                    className="mt-1"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
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
                        <Button type="submit" className="flex-1 bg-black dark:bg-white text-white dark:text-black font-medium hover:bg-gray-800 dark:hover:bg-gray-100" disabled={loading}>
                            {loading ? 'Creating...' : 'Create'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}