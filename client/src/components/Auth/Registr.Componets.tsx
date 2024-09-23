import Link from 'next/link';
import styles from './auth.module.scss';
import { useForm } from 'react-hook-form';
import { RegistrForm } from '@/types/types';
import { Registration } from '@/axios/PostAxios';
import { useRouter } from 'next/navigation';

export const Registr = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<RegistrForm>();
    const router = useRouter();

    const onSubmitRegister = async (data: RegistrForm) => {
        const token = await Registration(data);
        localStorage.setItem('token', token.data.token);
        reset();
        router.push('/');
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmitRegister)}>
            <label htmlFor="email">Enter your email</label>
            <input
                type="text"
                id="email"
                {...register('email', {
                    required: 'Field requiered to enter',
                    pattern: {
                        value: /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@([a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*/,
                        message: 'Wrong enter email',
                    },
                })}
            />
            {errors.email?.message && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
            <label htmlFor="username">Enter your username</label>
            <input
                type="text"
                id="username"
                {...register('username', {
                    required: 'Field requiered to enter',
                })}
            />
            {errors.username?.message && (
                <p className="text-red-500 text-xs">
                    {errors.username.message}
                </p>
            )}
            <label htmlFor="name">Enter your name</label>
            <input
                type="text"
                id="name"
                {...register('name', { required: 'Field requiered to enter' })}
            />
            {errors.name?.message && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
            <label htmlFor="surname">Enter your surname</label>
            <input
                type="text"
                id="surname"
                {...register('surname', {
                    required: 'Field requiered to enter',
                })}
            />
            {errors.surname?.message && (
                <p className="text-red-500 text-xs">{errors.surname.message}</p>
            )}
            <label htmlFor="password">Enter your password</label>
            <input
                type="password"
                id="password"
                {...register('password', {
                    required: 'Field requiered to enter',
                })}
            />
            {errors.password?.message && (
                <p className="text-red-500 text-xs">
                    {errors.password.message}
                </p>
            )}
            <div className={styles.nav}>
                <Link href="/auth">Login</Link>
                <button type="submit">Registration</button>
            </div>
        </form>
    );
};
