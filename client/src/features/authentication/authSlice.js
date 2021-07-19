import { createSlice, current } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        user: {},
        userLikes: []
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
        setCreated: (state, action) => {
            state.user.created = action.payload;
        },
        setUser: (state, action) => {
            if (action.payload === null) {
               state.isLoggedIn = false;
            } else {
                state.isLoggedIn = true;
                state.user = action.payload;
            }
        },
        addUserLike: (state, action) => {
            state.userLikes.push(action.payload);
        },
        removeUserLike: (state, action) => {
            var delIndex = -1;
            const tempLikes = current(state).userLikes.map((like, indx) => {
                if (like.likerId === action.payload.likerId && like.reviewId === action.payload.reviewId) {
                    delIndex = indx;
                }
                return like;
            });
            if (delIndex > -1) {
                tempLikes.splice(delIndex, 1);
            }
            state.userLikes = tempLikes;
        }
    },
    extraReducers: {
    }
});

export const { setIsLoggedIn, setUser, setFirstName, setLastName, setPassword, setUsername, setEmail, addUserLike, removeUserLike } = authSlice.actions;




export default authSlice.reducer;