import React, { useEffect, useState } from 'react';
import Container from '../Container/Container';
import { useSelector, useDispatch } from 'react-redux';
import { 
    addReview
 } from '../../features/movie/movieSlice';
import IconRating from '../IconRating/IconRating';

import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../../Graphql/Mutations';

const ReviewForm = ({ children, className, style, movieId }) => {
    const [createReview, { data: reviewData, error: reviewError, loading: reviewLoading }] = useMutation(CREATE_REVIEW);

    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const user = useSelector((state) => state.auth.user);
    const [message, setMessage] = useState('');

    const [rating, setRating] = useState(0.0);
    const [review, setReview] = useState('');

    const onSubmitReview = async () => {
        if (review.length === 0) {
            return showMessage("Must leave a review to post");
        }
        if (rating === 0) {
            return showMessage("Must leave a rating");
        }
        await createReview({ variables: {
            authorId: user.id,
            description: review,
            movieId: movieId,
            rating: rating,
        }});
    }

    const showMessage = (message) => {
        setMessage(message);
        setTimeout(() => {
            setMessage('');
        }, 3000);
    }

    useEffect(() => {
        if (reviewLoading) showMessage("Loading...");
    }, [reviewLoading]);
    useEffect(() => {
        if (reviewError) showMessage(reviewError.message);
    }, [reviewError]);

    useEffect(() => {
        if (reviewData?.createReview) {
            showMessage("Posted");
            console.log(reviewData.createReview)
            dispatch(addReview(reviewData.createReview));
        }
    }, [reviewData, dispatch]);

    const ratingGrade = (ratingData) => {
        var count = 0;
        ratingData.map(item => {
            if (item.isHovered === true) {
                count += 1;
            }
            return item;
        });
        setRating(count);
        return count;
    }

    const renderMessage = (message) => {
        return(
            <span style={{
                color: 'white',
                textTransform: 'initial'
            }}>{message}</span>
        )
    }

    if (!isLoggedIn) {
        return (
            <Container topBorder variant='shadow' className={className} style={{
                ...style
            }}>
                <label htmlFor="reviewInput" className="form-label">Sign in to leave a review!</label>
            </Container>
        )
    }

    return (
        <form className={className}>
        <div>
            {renderMessage(message)}
        </div>
        <Container topBorder variant='shadow' className="mt-0" style={{
            ...style
        }}>
            <div className="my-3">
                    <label htmlFor="reviewInput" className="form-label py-1">Leave a review!</label>
                    <textarea type="text" className="form-control" id="reviewInput" aria-describedby="reviewHelp"
                        value={review}
                        placeholder="What was your favorite part?"
                        onChange={(e) => {
                            setReview(e.target.value);
                        }}
                        style={{
                            height: '200px',
                            display: 'inline',
                        }}
                    />
            
                <div className="d-flex my-2">
                    <button type="button" className="btn-login draw meet me-2"
                        onClick={onSubmitReview}
                    >Submit</button>
                    <IconRating handleChange={ratingGrade}></IconRating>
                </div>
            </div>
        </Container>
        </form>
    )
}

export default ReviewForm;