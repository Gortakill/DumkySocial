import { getAllUserRoom, getUserFriends } from '@/axios/GetAxios';
import { createRoom } from '@/axios/PostAxios';
import { Friends, TypeRoom } from '@/types/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

export const UserFriends = () => {
    const [friends, setFriends] = useState<Friends[]>([]);

    const route = useRouter();

    const getFriends = async () => {
        const friends = await getUserFriends();
        setFriends(friends.data);
    };
    const handleRoom = async (friendId: number) => {
        await createRoom(friendId);
        route.push('/message');
    };

    useEffect(() => {
        getFriends();
    }, []);

    return (
        <section className="ml-10 mt-5">
            <h1 className="text-xl text-center mb-5">Friends:</h1>
            {friends.map((friend: Friends) => (
                <div
                    key={friend.avatar}
                    className="flex items-center border-2 border-solid border-gray-100 p-3 mb-2"
                >
                    {friend.avatar !== null ? (
                        <img
                            src={`http://localhost:5002/${friend.avatar}`}
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
                    <p className="mr-3">{friend.username}</p>
                    <button
                        onClick={() => handleRoom(friend.id)}
                        className="px-5 py-2 ml-auto bg-green-300 shadow-md 
                hover:bg-green-100 transition-colors duration-200 ease-in-out"
                    >
                        send message
                    </button>
                </div>
            ))}
        </section>
    );
};
