import { updateUserInfo } from '@/axios/PostAxios';
import { UserUpdateDto } from '@/types/types';
import { useForm } from 'react-hook-form';
import styles from './updateUser.module.scss';

export const UpdateUser = () => {
    const { register, handleSubmit, reset } = useForm<UserUpdateDto>();

    const handleChange = async (data: UserUpdateDto) => {
        await updateUserInfo(data);
        reset();
    };

    return (
        <main className={styles.ChangeForm}>
            <form
                action=""
                className="flex flex-col w-1/4"
                onSubmit={handleSubmit(handleChange)}
            >
                <label htmlFor="username">Change username</label>
                <input type="text" id="username" {...register('username')} />
                <label htmlFor="name">Change name</label>
                <input type="text" id="name" {...register('name')} />
                <label htmlFor="surname">Change surname</label>
                <input type="text" id="surname" {...register('surname')} />
                <button
                    className="p-2 bg-green-400 w-1/2 mt-2 ml-auto text-center shadow-md outline-none 
                hover:bg-green-200 transition-colors duration-200 ease-in-out"
                >
                    Confirm change
                </button>
            </form>
        </main>
    );
};
