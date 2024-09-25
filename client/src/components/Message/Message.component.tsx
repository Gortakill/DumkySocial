import { SocketApi } from '@/api/socket.api';
import { useAppSelector } from '@/hooks/redux';
import { SendHorizontal } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MessageRoom } from './MessageRoom.component';
import { FaUserCircle } from 'react-icons/fa';
import { GetMessage, TypeRoom } from '@/types/types';
import { Unautorize } from '../Unauthorize/Unautorize.component';

type MessageForm = {
    message: string;
};

export const Message = () => {
    const [room, setRoom] = useState<TypeRoom>();
    const [messages, setMessages] = useState<GetMessage[]>([]);
    const [roomId, setRoomId] = useState(0);
    const messageEndRef = useRef<HTMLDivElement | null>(null);
    const { register, handleSubmit, reset } = useForm<MessageForm>();
    const user = useAppSelector((store) => store.user);

    const scrollToBottom = () => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        SocketApi.createConnection();

        SocketApi.socket?.emit('join-room', room?.id);

        const handleClientPath = (data: GetMessage) => {
            setMessages((prev) => [...prev, data]);
        };

        SocketApi.socket?.on('client-path', handleClientPath);
        return () => {
            SocketApi.socket?.off('client-path', handleClientPath);
        };
    }, [room]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    const sendMessage = (data: MessageForm) => {
        SocketApi.socket?.emit('server-path', {
            id: Date.now(),
            message: data.message,
            username: user.username,
            avatar: user.avatar,
            roomId: room?.id,
        });
        reset();
    };
    if (user.email === '') {
        return <Unautorize />;
    }
    return (
        <>
            <MessageRoom
                setRoom={setRoom}
                setMessages={setMessages}
                setRoomId={setRoomId}
                roomId={roomId}
            />
            {roomId === 0 ? (
                <section className="flex w-5/6 h-full justify-center items-center border-l-2 border-gray-100 border-solid ">
                    <h1 className="text-xl font-bold">Select room</h1>
                </section>
            ) : (
                <section className="flex-grow flex-col w-5/6 h-full justify-end border-l-2 border-gray-100 border-solid overflow-y-auto">
                    {messages.map((message) => {
                        if (message.dto.username === user.username) {
                            return (
                                <div className="flex flex-col ml-3 items-start mb-5 justify-center">
                                    <div
                                        key={message.dto.id}
                                        className="flex items-center bg-blue-200 p-3 mt-3 rounded-full"
                                    >
                                        {message.dto.avatar ? (
                                            <img
                                                src={`https://dumky-social-server-production.up.railway.app/${message.dto.avatar}`}
                                                alt="user"
                                                className="mr-3 rounded-full object-cover size-10"
                                            />
                                        ) : (
                                            <div className="mr-3">
                                                <FaUserCircle size={30} />
                                            </div>
                                        )}
                                        {message.dto.username}:{' '}
                                        {message.dto.message}
                                    </div>
                                </div>
                            );
                        }
                        return (
                            <div className="flex flex-col items-end mr-3 mb-5 justify-center">
                                <div
                                    key={message.dto.id}
                                    className="flex items-center bg-yellow-200 p-3 mt-3 rounded-full"
                                >
                                    {message.dto.avatar ? (
                                        <img
                                            src={`https://dumky-social-server-production.up.railway.app/${message.dto.avatar}`}
                                            alt="user"
                                            className="mr-3 rounded-full object-cover size-10"
                                        />
                                    ) : (
                                        <div className="mr-3">
                                            <FaUserCircle size={30} />
                                        </div>
                                    )}
                                    {message.dto.username}:{' '}
                                    {message.dto.message}
                                </div>
                            </div>
                        );
                    })}
                    <div ref={messageEndRef} className="h-20" />
                    <form
                        action=""
                        className="fixed bottom-0 left-100 right-44 flex items-center mb-3 w-1/2 justify-center"
                        onSubmit={handleSubmit(sendMessage)}
                    >
                        <input
                            type="text"
                            className="w-3/4 rounded-xl border-solid border-2 border-blue-200 focus:border-blue-400 outline-none transition-colors duration-200 ease-linear"
                            {...register('message', { required: true })}
                        />
                        <button className="ml-3 bg-blue-400 p-2 rounded-full hover:bg-blue-200 transition-colors duration-200 ease-in-out">
                            <SendHorizontal />
                        </button>
                    </form>
                </section>
            )}
        </>
    );
};
