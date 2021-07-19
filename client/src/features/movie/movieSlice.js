import { createSlice, current } from '@reduxjs/toolkit';

export const movieSlice = createSlice({
    name: 'movie',
    initialState: {
        isLoading: true,
        movieInfo: {
            
        },
        reviews: []
    },
    reducers: {
        addReview: (state, action) => {
            var temp = current(state).reviews;
            temp = [...temp, action.payload];
            state.reviews = temp;
        },
        setReviews: (state, action) => {
            state.reviews = action.payload;
        },
        incrimentLike: (state, action) => {
            var reviewId = action.payload.reviewId;
            var like = action.payload.like;

            var temp = current(state)
            var index = temp.reviews.findIndex(review => review.id === reviewId)
            temp = temp.reviews[index].likes;
            temp = [...temp,{...like}];
            state.reviews[index].likes = temp;
        },
        decrimentLike: (state, action) => {
            var reviewId = action.payload.reviewId;
            var likeId = action.payload.likeId;

            var temp = current(state).reviews;
            var reviewIndex = temp.findIndex(review => review.id === reviewId);
            
            temp = current(state).reviews[reviewIndex].likes;
            var tempLikes = [];
            for (var i = 0; i < temp.length; i++) {
                if (temp[i].id !== likeId) {
                    tempLikes.push(temp[i]);
                }
            }
            state.reviews[reviewIndex].likes = tempLikes;
        },
    },
    extraReducers: {

    }
});

export const { addReview, setReviews, incrimentLike, decrimentLike } = movieSlice.actions;




export default movieSlice.reducer;