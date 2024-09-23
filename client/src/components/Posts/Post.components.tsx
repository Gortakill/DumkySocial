import { getAllPosts } from '@/axios/GetAxios';
import { PostValue } from '@/types/types';
import Link from 'next/link';

export const Post = async () => {
    const { data } = await getAllPosts();

    return (
        <>
            {data.map((post: PostValue) => (
                <Link href={`/${post.id}`} key={post.id} className="container">
                    <section className="flex flex-col items-center mx-auto mt-5 p-5 hover:border-blue-500 border-solid border-2 transition-colors duration-300 ease-in-out sm:flex-row w-fit md:w-1/2">
                        <img
                            src={`http://localhost:5002/${post.image}`}
                            alt="nature"
                            width={200}
                        />
                        <div className="flex flex-col w-1/2 items-center mx-5">
                            <h1 className="text-center">{post.title}</h1>
                            <p className="">{post.content}</p>
                            <h3 className="mt-4">Author: {post.userId}</h3>
                        </div>
                    </section>
                </Link>
            ))}
        </>
    );
};
