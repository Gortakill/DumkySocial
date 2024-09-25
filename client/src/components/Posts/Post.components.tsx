'use client';

import { getAllPosts } from '@/axios/GetAxios';
import { PostValue } from '@/types/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const Post = () => {
    const [posts, setPosts] = useState<PostValue[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [over, setOver] = useState(false);

    const getPosts = async () => {
        const { data } = await getAllPosts(currentPage);
        if (data.length === 0) {
            console.log('over');
            setOver(true);
            return;
        }
        setPosts([...posts, ...data]);
    };

    useEffect(() => {
        getPosts();
    }, [currentPage]);

    return (
        <>
            {posts.map((post: PostValue) => (
                <Link href={`/${post.id}`} key={post.id} className="container">
                    <section className="flex flex-col items-center mx-auto p-5 mb-2 hover:border-blue-500 border-solid border-2 transition-colors duration-300 ease-in-out sm:flex-row w-fit md:w-1/2">
                        <img
                            src={`https://dumky-social-server-production.up.railway.app/${post.image}`}
                            alt="nature"
                            width={200}
                        />
                        <div className="flex flex-col w-full items-center mx-5">
                            <h1 className="text-center">{post.title}</h1>
                            <p className="">{post.content}</p>
                            <h3 className="mt-4">Author: {post.userId}</h3>
                        </div>
                    </section>
                </Link>
            ))}
            {over ? (
                <div className="bg-blue-100 p-2 mb-2">This is all posts</div>
            ) : (
                <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className="bg-blue-200 shadow-md p-3 mb-2 hover:bg-blue-100 transition-colors duration-200 ease-in-out"
                >
                    Show more
                </button>
            )}
        </>
    );
};
