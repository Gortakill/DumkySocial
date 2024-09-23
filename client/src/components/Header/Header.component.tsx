import Link from 'next/link';
import styles from './header.module.scss';
import { NavProfile } from './NavProfile.components';

export const Header = () => {
    return (
        <header className={styles.head}>
            <section className="flex justify-center sm:justify-start w-1/3">
                <div className="ml-0 mb-2 mt-2 w-fit text-center sm:ml-5 bg-blue-200 p-3 rounded-xl ">
                    Dumky Social
                </div>
            </section>
            <section className="w-1/3">
                <nav className="flex flex-col items-center sm:flex-row w-full justify-center">
                    <Link href={'/'}>Home</Link>
                    <Link href={'/addfriends'}>Users</Link>
                    <Link href={'/message'}>Message</Link>
                    <Link href={'/createpost'}>Post</Link>
                </nav>
            </section>
            <section className="w-1/3">
                <nav className="justify-center sm:justify-end flex ml-auto mr-5 w-full">
                    <NavProfile />
                </nav>
            </section>
        </header>
    );
};
