import { useForm } from 'react-hook-form';
import styles from './createpost.module.scss';
import { createPost } from '@/axios/PostAxios';

type PostForm = {
    title: string;
    content: string;
    image: any;
};

export const CreatePost = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<PostForm>();

    const submitPost = async (data: PostForm) => {
        const form = new FormData();
        form.append('title', data.title);
        form.append('content', data.content);
        form.append('image', data.image[0]);
        await createPost(form);
        reset();
    };
    return (
        <form className={styles.PostForm} onSubmit={handleSubmit(submitPost)}>
            <div className="flex flex-col w-full">
                <label htmlFor="title" className="mt-10">
                    Enter title for post
                </label>
                <input
                    type="text"
                    id="title"
                    {...register('title', {
                        required: 'Field is require to enter',
                    })}
                />
                {errors.title?.message && (
                    <p className="text-red-500 text-xs">
                        {errors.title.message}
                    </p>
                )}

                <label htmlFor="content">Enter content for post</label>
                <textarea
                    id="content"
                    {...register('content', {
                        required: 'Field is require to enter',
                    })}
                />
                {errors.content?.message && (
                    <p className="text-red-500 text-xs">
                        {errors.content.message}
                    </p>
                )}

                <input type="file" id="image" {...register('image')} />
            </div>
            <button
                type="submit"
                className="bg-blue-200 w-1/2 p-2 shadow-md mt-3 hover:bg-blue-100 transition-colors duration-200 ease-in-out"
            >
                Create Post
            </button>
        </form>
    );
};
