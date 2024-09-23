export type PostValue = {
    id: number;
    image: string;
    title: string;
    content: string;
    userId: string;
};

export type Comment = {
    id: number;
    text: string;
    userId: number;
    postId: number;
};

export type Answer = {
    id: number;
    text: string;
    commentId: number;
    userId: number;
};

export type RegistrForm = {
    email: string;
    username: string;
    name: string;
    surname: string;
    password: string;
};

export type LoginForm = {
    email: string;
    password: string;
};

export type User = {
    id: number;
    email: string;
    username: string;
    avatar: string;
    name: string;
    surname: string;
};

export type Friends = {
    id: number;
    username: string;
    avatar: string;
};

export type UserInfo = {
    id: number;
    username: string;
    avatar: string;
};

export type unconfirmedFriend = {
    userId: number;
    friendId: number;
    userAvatar: string;
    username: string;
    isConfirmed: boolean;
};

export type TypeRoom = {
    id: number;
    userId: number;
    friendId: number;
    username: string;
    avatar: string;
};

export type GetMessage = {
    dto: {
        message: string;
        id: number;
        username: string;
        avatar: string;
        roomId: string;
    };
};

export type UserUpdateDto = {
    username: string;
    name: string;
    surname: string;
};
