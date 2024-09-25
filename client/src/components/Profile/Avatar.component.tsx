import { updateAvatar } from '@/axios/PostAxios';
import { FaUserCircle } from 'react-icons/fa';

export const Avatar = ({ avatar }: { avatar: string | null }) => {
    const handleAvatarChange = async (e: any) => {
        const formData = new FormData();
        formData.append('avatar', e.target.files[0]);
        await updateAvatar(formData);
        Location;
    };

    return (
        <div className="text-center mt-5 mr-5">
            <label htmlFor="avatar-input">
                {avatar !== null ? (
                    <img
                        src={`https://dumky-social-server-production.up.railway.app/${avatar}`}
                        alt="Avatar"
                        className="rounded-full object-cover size-60"
                    />
                ) : (
                    <FaUserCircle
                        size={200}
                        color="gray"
                        className="rounded-full hover:bg-blue-200 transition-colors duration-300 ease-in-out"
                    />
                )}
            </label>
            <input
                id="avatar-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
            />
        </div>
    );
};
