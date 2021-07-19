import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/authentication/authSlice';
import movieReducer from '../features/movie/movieSlice';

export default configureStore({
  reducer: {
      auth: authReducer,
      movie: movieReducer,
  },
});



