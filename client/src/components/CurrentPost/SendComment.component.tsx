'use client';

import { createComment } from '@/axios/PostAxios';
import { SendHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';

export const SendComment = ({ id }: { id: number }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [value, setValue] = useState('');

    const sendComment = async () => {
        await createComment(value, id);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuth(true);
        }
    }, []);
    return (
        <>
            <form action="" className="flex items-center mx-auto w-1/2 mt-5">
                <input
                    type="text"
                    placeholder="Enter your comment"
                    className="w-full border-solid border-2 border-blue-200 focus:border-blue-400 outline-none transition-colors duration-200 ease-linear"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button
                    onClick={sendComment}
                    disabled={!isAuth}
                    className="disabled:text-gray-500 hover:text-blue-400 transition-colors duration-200 ease-in-out"
                >
                    <SendHorizontal />
                </button>
            </form>
        </>
    );
};
