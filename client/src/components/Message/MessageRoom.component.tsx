import { getAllUserRoom, getAnotherUserById } from '@/axios/GetAxios';
import { useAppSelector } from '@/hooks/redux';
import { GetMessage, TypeRoom } from '@/types/types';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

interface Props {
    setRoom: Dispatch<SetStateAction<TypeRoom | undefined>>;
    setMessages: Dispatch<SetStateAction<GetMessage[]>>;
    setRoomId: Dispatch<SetStateAction<number>>;
    roomId: number;
}

export const MessageRoom = ({
    setRoom,
    setMessages,
    setRoomId,
    roomId,
}: Props) => {
    const [rooms, setRooms] = useState<TypeRoom[]>([]);
    const currentUser = useAppSelector((state) => state.user);

    const getRoom = async () => {
        const rooms = await getAllUserRoom();
        const roomInfo = await Promise.all(
            rooms.map(async (room: TypeRoom) => {
                if (currentUser.id === room.userId) {
                    const user = await getAnotherUserById(room.friendId);
                    return {
                        id: room.id,
                        userId: room.userId,
                        friendId: room.friendId,
                        username: user.username,
                        avatar: user.avatar,
                    };
                }
                const user = await getAnotherUserById(room.userId);
                return {
                    id: room.id,
                    userId: room.userId,
                    friendId: room.friendId,
                    username: user.username,
                    avatar: user.avatar,
                };
            }),
        );
        setRooms(roomInfo);
    };

    const handleRoom = (room: TypeRoom) => {
        setRoom(room);
        setMessages([]);
        setRoomId(room.id);
    };

    useEffect(() => {
        getRoom();
    }, []);

    return (
        <section className="flex flex-col w-fit h-full items-center justify-start">
            {rooms.length < 1 ? (
                <h1>Your future rooms</h1>
            ) : (
                rooms.map((room: TypeRoom) => (
                    <button
                        onClick={() => handleRoom(room)}
                        key={room.id}
                        className={`flex items-center mt-3 mx-2
                            border-2 border-solid border-blue-400 p-2
                            w-fit sm:w-[20vw] rounded-2xl hover:shadow-lg transition-shadow duration-200 ease-in-out
                            ${roomId === room.id ? 'bg-blue-100' : ''}`}
                    >
                        {room.avatar ? (
                            <img
                                src={`https://dumky-social-server-production.up.railway.app/${room.avatar}`}
                                alt="user"
                                className="mr-3 rounded-full object-cover size-16"
                            />
                        ) : (
                            <div className="mr-3 w-fit">
                                <FaUserCircle size={60} />
                            </div>
                        )}
                        <h1>{room.username}</h1>
                    </button>
                ))
            )}
        </section>
    );
};
