import { LoginForm, RegistrForm, UserUpdateDto } from '@/types/types';
import { instance } from './axiosConfig';

export const Registration = async (data: RegistrForm) => {
    const responce = await instance.post('/auth', { ...data });
    return responce;
};

export const Login = async (data: LoginForm) => {
    const responce = await instance.post('/auth/login', { ...data });
    return responce;
};

export const createComment = async (text: string, postId: number) => {
    const token = localStorage.getItem('token');
    await instance.post(
        `/comments/${postId}`,
        { text },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
};

export const createAnswer = async (text: string, commentId: number) => {
    const token = localStorage.getItem('token');
    await instance.post(
        `/answer/${commentId}`,
        { text },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
};

export const createPost = async (formData: any) => {
    const token = localStorage.getItem('token');
    await instance.post(`/post`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const updateAvatar = async (formData: any) => {
    const token = localStorage.getItem('token');
    const response = await instance.put(`/user`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
};

export const addFriend = async (friendId: number) => {
    const token = localStorage.getItem('token');
    await instance.post(
        `/friends/${friendId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
};

export const deleteFriend = async (friendId: number) => {
    const token = localStorage.getItem('token');
    await instance.delete(`/friends/delete/${friendId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const ConfirmedFriend = async (friendId: number) => {
    const token = localStorage.getItem('token');
    await instance.patch(
        `/friends/${friendId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
};

export const createRoom = async (friendId: number) => {
    const token = localStorage.getItem('token');
    await instance.post(
        `/room/${friendId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
};

export const updateUserInfo = async (dto: UserUpdateDto) => {
    const token = localStorage.getItem('token');
    await instance.put(
        '/user/update',
        {
            username: dto.username,
            name: dto.name,
            surname: dto.surname,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
};
