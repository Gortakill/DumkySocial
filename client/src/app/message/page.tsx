'use client';

import { Message } from '@/components/Message/Message.component';
import { Unautorize } from '@/components/Unauthorize/Unautorize.component';
import { useAppSelector } from '@/hooks/redux';

export default function () {
    const user = useAppSelector((store) => store.user);

    if (user.email === '') {
        return <Unautorize />;
    }
    return (
        <main className="flex h-[90.5vh] min-h-0 justify-end items-center">
            <Message />
        </main>
    );
}
