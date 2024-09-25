import { getPost } from '@/axios/GetAxios';
import { Comments } from './Comments.component';
import { SendComment } from './SendComment.component';

interface Props {
    id: number;
}

export const CurrentPost = async ({ id }: Props) => {
    const post = await getPost(id);

    return (
        <div className="flex-col mt-5 items-center">
            <section className="flex items-center w-1/2 mx-auto justify-center mt-5 pt-5 pb-5 border-solid border-2 ">
                <img
                    src={`https://dumky-social-server-production.up.railway.app/${post.data.image}`}
                    alt="nature"
                    width={300}
                />
                <div className="w-1/2 content-center mx-5">
                    <h1 className="text-center">{post.data.title}</h1>
                    <p className="">{post.data.content}</p>
                    <h3 className="mt-4">Author: {post.data.userId}</h3>
                </div>
            </section>
            <h1 className="text-center mt-5 text-xl">Comments:</h1>
            <Comments id={id} />
            <SendComment id={id} />
        </div>
    );
};
