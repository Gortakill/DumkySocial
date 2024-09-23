'use client';

import { getAllUsers, getUserFriends } from '@/axios/GetAxios';
import { UserInfo } from '@/types/types';
import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FriendButton } from './FriendButton.component';
import { useAppSelector } from '@/hooks/redux';
import { Search } from 'lucide-react';
import { findUser } from './findUser';

export const AddFriends = () => {
    const user = useAppSelector((state) => state.user);
    const [users, setUsers] = useState<UserInfo[]>([]);
    const [friends, setFriends] = useState<UserInfo[]>([]);
    const [userFound, setUserFound] = useState<UserInfo[]>([]);
    const [name, setName] = useState('');

    const getFriends = async () => {
        const friends = await getUserFriends();
        setFriends(friends.data);
    };

    const getUsers = async () => {
        const users = await getAllUsers();
        setUsers(users.data);
        setUserFound(users.data);
    };

    useEffect(() => {
        getUsers();
        if (user.email !== '') getFriends();
    }, []);
    useEffect(() => {
        setUserFound(findUser(name, users));
    }, [name]);

    return (
        <>
            <div className="flex w-full justify-center items-center mt-3">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter user whom you want find"
                    className="mb-4 w-1/4 px-2 rounded-xl border-solid border-2 border-blue-200 
                focus:border-blue-400 outline-none transition-colors duration-200 ease-linear"
                />
            </div>
            {userFound.map((user: UserInfo) => (
                <div
                    key={user.id}
                    className="w-[90vw] flex sm:w-[50vw] items-center border-2 border-solid border-gray-100 p-3 mt-1"
                >
                    {user.avatar ? (
                        <img
                            src={`http://localhost:5002/${user.avatar}`}
                            alt="user"
                            className="mr-3 rounded-full object-cover size-20"
                        />
                    ) : (
                        <div className="mr-3">
                            <FaUserCircle size={80} />
                        </div>
                    )}
                    <p>{user.username}</p>
                    <FriendButton friends={friends} user={user} />
                </div>
            ))}
        </>
    );
};
