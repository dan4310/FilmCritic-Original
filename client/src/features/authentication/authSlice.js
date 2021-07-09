import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getLogin = createAsyncThunk('user/getLogin', async ({ username, password}) => {
    return await axios.post("http://localhost:3001/login", {
              username: username,
              password: password,
          }).then((response) => {
              if (response.data.message) {
                  console.log(response.data.message);
                  return null;
              } else {
                  return response.data;
              }
          });
  })

export const authSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        user: {
            id: -1,
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            email: '',
            created: '',
        }

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
        }
    },
    extraReducers: {
        [getLogin.fulfilled]: (state, action) => {
            if (action.payload) {
                state.user = action.payload;
                state.isLoggedIn = true;
            }
        }
    }
});

export const { setIsLoggedIn, setUser, setFirstName, setLastName, setPassword, setUsername, setEmail } = authSlice.actions;




export default authSlice.reducer;