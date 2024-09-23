'use client';
import { getUserById } from '@/axios/GetAxios';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { LogIn } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { writeUser } from '@/store/slices/userSlice';
import { Unconfirmed } from './Unconfirmed.component';

export const NavProfile = () => {
    const user = useAppSelector((store) => store.user);
    const dispatch = useAppDispatch();

    const getUser = async () => {
        const user = await getUserById();
        dispatch(writeUser(user.data));
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            {user.email !== '' ? (
                <Unconfirmed />
            ) : (
                <Link href={'/auth'}>
                    <LogIn />
                </Link>
            )}
        </>
    );
};
