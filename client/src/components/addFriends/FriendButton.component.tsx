import { addFriend, deleteFriend } from '@/axios/PostAxios';
import { useAppSelector } from '@/hooks/redux';
import { Friends, UserInfo } from '@/types/types';

interface Props {
    friends: Friends[];
    user: UserInfo;
}

export const FriendButton = ({ friends, user }: Props) => {
    const currentUser = useAppSelector((state) => state.user);

    const handleAddFriend = async (friendId: number) => {
        await addFriend(friendId);
        alert('request for friend is send');
    };

    const handleDeleteFriend = async (friendId: number) => {
        await deleteFriend(friendId);
        alert('friend is delete');
    };

    return (
        <>
            {friends.some(
                (friend: Friends) => friend.username === user.username,
            ) ? (
                <button
                    onClick={() => handleDeleteFriend(user.id)}
                    className="px-5 py-2 bg-red-300 shadow-md ml-auto 
                hover:bg-red-100 transition-colors duration-200 ease-in-out"
                >
                    Delete friend
                </button>
            ) : currentUser.email === '' ? (
                <button
                    disabled
                    className="px-5 py-2 bg-green-100 shadow-md ml-auto"
                >
                    Add friend
                </button>
            ) : (
                currentUser.username !== user.username && (
                    <button
                        onClick={() => handleAddFriend(user.id)}
                        className="px-5 py-2 bg-green-300 shadow-md ml-auto 
                            hover:bg-green-100 transition-colors duration-200 ease-in-out"
                    >
                        Add friend
                    </button>
                )
            )}
        </>
    );
};
