import { getUnconfirmedFriend } from '@/axios/GetAxios';
import { ConfirmedFriend } from '@/axios/PostAxios';
import { useAppSelector } from '@/hooks/redux';
import { unconfirmedFriend } from '@/types/types';
import { BellRing, User2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

export const Unconfirmed = () => {
    const user = useAppSelector((store) => store.user);
    const [unconfirmed, setUnconfirmed] = useState<unconfirmedFriend[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [onPressed, setOnPressed] = useState(false);

    const getUnconfirmed = async () => {
        const unconfirmed = await getUnconfirmedFriend();
        setUnconfirmed(unconfirmed);
    };

    const handleConfirmed = async (friendId: number) => {
        await ConfirmedFriend(friendId);
        setOnPressed(true);
    };

    useEffect(() => {
        getUnconfirmed();
    }, []);

    return (
        <>
            <div className="flex ml-10 items-center">
                <h2>{user.username}</h2>
                <Link href={`/profile/${user.username}`}>
                    <User2 />
                </Link>
                <button
                    className="ml-3 h-[10vh] z-1"
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    <BellRing />
                </button>
                {unconfirmed.length > 0 && (
                    <div className="bg-red-300 py-0.5 px-3 rounded-full mr-3">
                        {unconfirmed.length}
                    </div>
                )}
                <div
                    className={`${
                        isOpen
                            ? 'bg-white flex flex-col items-center absolute w-fit h-fit top-16 border-2 border-solid border-gray-200 right-0 p-3'
                            : 'hidden'
                    }`}
                >
                    <h1 className="text-lg mb-3">Unconfirmed applications: </h1>
                    {unconfirmed.map((user) => (
                        <div
                            key={user.friendId}
                            className="flex items-center border-2 border-solid border-gray-200 py-2 px-3 mb-2"
                        >
                            {user.userAvatar !== null ? (
                                <img
                                    src={`https://dumky-social-server-production.up.railway.app/${user.userAvatar}`}
                                    alt="Avatar"
                                    className="rounded-full object-cover size-20 mr-2"
                                />
                            ) : (
                                <FaUserCircle
                                    size={75}
                                    color="gray"
                                    className="rounded-full mr-2"
                                />
                            )}
                            <h1>{user.username}</h1>
                            {onPressed ? (
                                <div className="ml-5">
                                    Request was confirmed
                                </div>
                            ) : (
                                <button
                                    className="px-5 py-2 bg-green-300 shadow-md ml-aut
                    hover:bg-green-100 transition-colors duration-200 ease-in-out"
                                    onClick={() => handleConfirmed(user.userId)}
                                >
                                    confirmed
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
