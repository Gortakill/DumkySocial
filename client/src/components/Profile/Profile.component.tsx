'use client';
import { getPostsByUser } from '@/axios/GetAxios';
import styles from './profile.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useEffect, useState } from 'react';
import { PostValue } from '@/types/types';
import { Avatar } from './Avatar.component';
import { useRouter } from 'next/navigation';
import { UserFriends } from './UserFriends.component';
import Link from 'next/link';
import { clearUser } from '@/store/slices/userSlice';

export const Profile = () => {
    const user = useAppSelector((store) => store.user);
    const dispatch = useAppDispatch();
    const [posts, setPosts] = useState<PostValue[]>([]);

    const router = useRouter();

    const getPosts = async () => {
        const posts = await getPostsByUser();
        setPosts(posts.data);
    };

    const handleExit = () => {
        localStorage.removeItem('token');
        dispatch(clearUser());
        router.push('/');
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <>
            <Avatar avatar={user.avatar} />
            <section className={styles.User}>
                <h1>Username: {user.username}</h1>
                <h1>Email: {user.email}</h1>
                <h1>Name: {user.name}</h1>
                <h1>Surname: {user.surname}</h1>
                <div className="flex flex-col items-start mt-3">
                    <Link
                        href={'/updateuser'}
                        className="p-2 bg-green-400 w-full text-center shadow-md  
                        hover:bg-green-200 transition-colors duration-200 ease-in-out"
                    >
                        Change info about user
                    </Link>
                    <button
                        className="p-2 mt-3 w-full bg-red-400 shadow-md 
                    hover:bg-red-200 transition-colors duration-200 ease-in-out"
                        onClick={handleExit}
                    >
                        Exit
                    </button>
                </div>
            </section>
            <section className="ml-10 mt-5 w-1/3">
                <h1 className="text-xl text-center mb-5">My Posts:</h1>
                {posts.map((post) => (
                    <section
                        key={post.id}
                        className="flex w-full justify-center mx-auto p-5 mb-5 border-gray-200 border-solid border-2"
                    >
                        <img
                            src={`https://dumky-social-server-production.up.railway.app/${post.image}`}
                            alt="nature"
                            className="w-1/2 h-1/2"
                        />
                        <div className="w-1/2 content-center mx-5">
                            <h1 className="text-center">{post.title}</h1>
                            <p className="mt-5">{post.content}</p>
                        </div>
                    </section>
                ))}
            </section>
            <UserFriends />
        </>
    );
};
