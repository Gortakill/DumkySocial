'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './auth.module.scss';
import { useForm } from 'react-hook-form';
import { Registr } from './Registr.Componets';
import { LoginForm } from '@/types/types';
import { Login } from '@/axios/PostAxios';
import { writeUser } from '@/store/slices/userSlice';
import { getUserById } from '@/axios/GetAxios';
import { useAppDispatch } from '@/hooks/redux';

export const Auth = () => {
    const dispatch = useAppDispatch();
    const pathname = usePathname();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<LoginForm>();
    const router = useRouter();

    const onSubmitLogin = async (data: LoginForm) => {
        const token = await Login(data);
        if (!token.data) {
            return;
        }
        localStorage.setItem('token', token.data.token);
        reset();
        const user = await getUserById();
        dispatch(writeUser(user.data));
        router.push('/');
    };

    return (
        <div className={styles.wrap}>
            {pathname === '/auth' ? (
                <form
                    className={styles.form}
                    onSubmit={handleSubmit(onSubmitLogin)}
                >
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
                        <p className="text-red-500 text-xs">
                            {errors.email.message}
                        </p>
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
                        <Link href="/auth/registration">Registration</Link>
                        <button type="submit">Login</button>
                    </div>
                </form>
            ) : (
                <Registr />
            )}
        </div>
    );
};
