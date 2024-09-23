import { instance } from './axiosConfig';

export const getComments = async (id: number) => {
    const responce = await instance.get(`/comments/${id}`);
    return responce;
};

export const getPost = async (id: number) => {
    const responce = await instance.get(`/post/byId/${id}`);
    return responce;
};

export const getAllPosts = async () => {
    const responce = await instance.get('/post');
    return responce;
};

export const getPostsByUser = async () => {
    const token = localStorage.getItem('token');
    const responce = await instance.get('/post/byUser', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return responce;
};

export const getAnswers = async (commentId: number) => {
    const response = await instance.get(`/answer/${commentId}`);
    return response;
};

export const getUserById = async () => {
    const token = localStorage.getItem('token');
    const response = await instance.get('/user/byId', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
};

export const getUserFriends = async () => {
    const token = localStorage.getItem('token');
    const responce = await instance.get('/friends', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return responce;
};

export const getAllUsers = async () => {
    const users = await instance.get('/user');
    return users;
};

export const getUnconfirmedFriend = async () => {
    const token = localStorage.getItem('token');
    const response = await instance.get('/friends/unconfirmed', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const getAllUserRoom = async () => {
    const token = localStorage.getItem('token');
    const response = await instance.get('/room', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const getAnotherUserById = async (id: number) => {
    const responce = await instance.get(`/user/another/${id}`);
    return responce.data;
};
