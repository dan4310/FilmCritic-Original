import React, { useEffect, useState } from "react";
import { addLike, removeLike, incrimentLike, decrimentLike } from "../../features/movie/movieSlice";
import Container from "../Container/Container";

 import { 
    addUserLike,
    removeUserLike
 } from './../../features/authentication/authSlice';
 import { useDispatch, useSelector } from 'react-redux';

import './Reviews.css';
import { useMutation } from "@apollo/client";
import { CREATE_LIKE, DELETE_LIKE } from "../../Graphql/Mutations";

const Reviews = ({ className, children  , style, reviews}) => {
    const user = useSelector((state) => state.auth.user);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const [likePost, { error: likeError, loading: likeLoading, data: likeData }] = useMutation(CREATE_LIKE);
    const [unLikePost, { error: unLikeError, loading: unLikeLoading, data: unLikeData }] = useMutation(DELETE_LIKE);
    const [userLikes, setUserLikes] = useState([]);
    useEffect(() => {
        if (likeData) {
            //dispatch(getUserLikes({ userId: user.id })).then((res, err) => {
            //})
        }

    }, [likeData])

    useEffect(() => {
        if (user !== null && user.hasOwnProperty("likedReviews")) {
            setUserLikes(user.likedReviews)
            //console.log(userLikes)
        }
    }, [user])

    const onAddLike = async (review) => {
        var hasAlreadyReviewd = user.likedReviews.find(like => like.reviewId === review.id);
        if (hasAlreadyReviewd) {
            return;;
        }        
        await likePost({
            variables: {reviewId: review.id, userId: user.id}
        }).then((res) => {
            if (res.data?.likePost) {
                dispatch(incrimentLike({reviewId: review.id, like: res.data.likePost}));
            }
        });
    }

    const onUnLike = async (review) => {
        await unLikePost({
            variables: {reviewId: review.id, userId: user.id}
        }).then((result) => {
            if (result.data?.deleteLike) {
                dispatch(decrimentLike({reviewId: review.id, likeId: result.data.deleteLike.id}))
            }
        })
        
        // dispatch(removeLike({reviewId: review.id, userId: user.id})).then((res, err) => {
        //     if (res) {
        //         dispatch(removeUserLike(res.payload.result));
        //         dispatch(decrimentLike(review.id));
        //     }

        // });
    }

    if (reviews.length <=0) return;

    const createdDate = (mySqlDate) => {
        if (mySqlDate.length <= 0) return;
        var date = new Date(parseInt(mySqlDate));
        return (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getUTCFullYear();
    }

    const createdTime = (mySqlDate) => {
        if (mySqlDate.length <= 0) return;
        var date = new Date(parseInt(mySqlDate));
        return date.toLocaleTimeString();
    }

    const renderLikeButtons = (review) => {
        
        if (!(user.likedReviews)) {
            return (<>
                <div className="btn-small pe-2 like-button"
                ><i className="fa fa-thumbs-up" aria-hidden="true" style={{
                    fontSize: '20px',
                    color: 'rgba(29, 29, 35, 1)'
                }}
                ></i></div>
            </>)
        } else if (user.likedReviews.length > 0) {
            if (review) {
                var hasAlreadyReviewed = review.likes.find(like => like.user.id === user.id);
                if (hasAlreadyReviewed) {
                    return (<>
                        <button className="btn-small pe-2 like-button"
                        onClick={() => onUnLike(review)}
                        ><i className="fa fa-thumbs-up" aria-hidden="true" style={{
                            fontSize: '20px',
                            color: 'rgba(225, 202, 240, 1)'
                        }}
                        ></i></button>
                    </>)
                }
            }
           
        }

        return (<>
            <button className="btn-small draw meet pe-2 like-button"
                onClick={() => {onAddLike(review)}}
            ><i className="fa fa-thumbs-o-up" aria-hidden="true" style={{
                fontSize: '20px',
            }}
            ></i></button>
        </>)
    }

    const renderReview = (review, indx) => {
                    var stars = [];
                    var color = () => {
                        if (review.entertainment >= 4) {
                            return 'green';
                        } else if (review.entertainment >= 2) {
                            return 'orange';
                        } else {
                            return 'red';
                        }
                    }
                    for (let i = 0; i < review.rating; i++) {
                        stars.push(i);
                    }

                    return (<div className="py-2 pt-0" key={review.id}>
                        
                        <Container variant="shadow" key={indx} className='my-1' style={{
                            padding: '1rem'
                        }}>
                            <div className='d-flex'>
                                <div className="me-auto my-1">
                                    <button type="button" className="btn-login draw meet me-2">{review.author.firstName || review.author.username}</button>
                                    <span style={{
                                        fontSize: '12px',
                                        color: 'black'
                                    }}>{review.author.firstName && '@'+review.author.username}</span>
                                </div>
                                
                                <div className="d-flex">
                                    {
                                        stars.map((star) => {
                                            return (
                                                <i className="fa fa-star px-1 d-flex align-items-center" aria-hidden="true" style={{
                                                    color:  color(),
                                                    textShadow: '2px 2px black',
                                                    transition: 'all 0.1s',
                                                    fontSize: '20px'
                                                }}></i>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            
                            <Container style={{
                                padding: '0rem',
                                color: 'white'
                            }}>
                                {review.description}
                            </Container>

                            <div className="d-flex gap-2">
                                <div className="d-flex align-items-center gap-1" style={{
                                    color: 'white',
                                    fontSize: '12px',
                                }}>
                                    <span>{review.likes.length}</span>
                                    <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                                </div>
                            </div>

                            

                            <hr style={{
                                marginTop: '0.5rem',
                                marginBottom: '0.5rem'
                            }}/>

                            <div className="d-flex align-items-center">
                                {renderLikeButtons(review)}

                                <div className="d-flex flex-column ms-auto" style={{
                                        fontSize: '12px',
                                        color: 'black',
                                    }}>
                                    <span className="ms-auto">{createdTime(review.created)}</span>
                                    <span className="ms-auto">{createdDate(review.created)}</span>
                                </div>
                            </div>

                            
                        </Container>
                    </div>)
    }


    return (<div className={className}>
        <span className="py-0" style={{
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            fontSize: '25px',
            fontWeight: '500',
            textShadow: '2px 2px rgba(80, 80, 100, 1)',
        }}>
            Lets hear from the Critics
        </span>
        <Container style={{
            padding: '0rem',
            backgroundColor: 'none'
        }}>
            
            {
                reviews.map((review, indx) => {
                    return renderReview(review, indx); 
                })
            }
        </Container>
   </div> )

}

export default Reviews;