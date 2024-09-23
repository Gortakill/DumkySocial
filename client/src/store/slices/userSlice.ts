import { User } from '@/types/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: User = {
    id: 0,
    email: '',
    username: '',
    avatar: '',
    name: '',
    surname: '',
};

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        writeUser: (state, { payload }) => {
            state.id = payload.id;
            state.email = payload.email;
            state.name = payload.name;
            state.surname = payload.surname;
            state.username = payload.username;
            state.avatar = payload.avatar;
        },
        clearUser: (state) => {
            state.avatar = '';
            state.id = 0;
            state.email = '';
            state.name = '';
            state.surname = '';
            state.username = '';
        },
    },
});

export const { writeUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
