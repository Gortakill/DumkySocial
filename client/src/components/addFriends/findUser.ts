import { Friends, UserInfo } from '@/types/types';

export const findUser = (name: string, users: UserInfo[]) => {
    if (!name) {
        return users;
    }
    return users.filter(({ username }) =>
        username.toLowerCase().includes(name.toLowerCase()),
    );
};
