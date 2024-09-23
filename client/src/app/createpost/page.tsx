'use client';
import { CreatePost } from '@/components/CreatePost/CreatePost.component';
import { Unautorize } from '@/components/Unauthorize/Unautorize.component';
import { useAppSelector } from '@/hooks/redux';

export default function () {
    const user = useAppSelector((store) => store.user);

    if (user.email === '') {
        return <Unautorize />;
    }
    return (
        <main className="flex w-screen justify-center">
            <CreatePost />
        </main>
    );
}
