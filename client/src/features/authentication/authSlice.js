import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        user: {id: -1,
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            email: ''}

    },
    reducers: {
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setFirstName: (state, action) => {
            state.user.firstName = action.payload;
        },
        setLastName: (state, action) => {
            state.user.lastName = action.payload;
        },
        setUsername: (state, action) => {
            state.user.username = action.payload;
        },
        setEmail: (state, action) => {
            state.user.email = action.payload;
        },
        setUser: (state, action) => {
            if (action.payload === null) {
               state.isLoggedIn = false;
            } else {
                state.isLoggedIn = true;
                state.user = action.payload;
            }
        },
    }
});

export const { setIsLoggedIn, setUser, setFirstName, setLastName, setPassword, setUsername, setEmail } = authSlice.actions;

export default authSlice.reducer;