import React, { useEffect, useState } from 'react';
import requests from '../Constants/Requests';
import Container from '../Components/Container/Container';
import Rating from '../Components/Rating/Rating';
const IMG_API = "https://image.tmdb.org/t/p/w1280";

const MoviePage = (props) => {
    const [movie, setMovie] = useState({});
    var tempUrl = props.location.pathname;
    tempUrl = tempUrl.slice(7,tempUrl.length);

    const movieId = tempUrl.slice(0, tempUrl.indexOf('/'));

    useEffect(() => {
        const movieUrl = requests.fetchMovie(movieId).url;
        fetch(movieUrl).then(res => res.json())
        .then(data => {
            if (data.status_message) {
                return;
            }
            setMovie(data);
        });
      }, [])

    const movieNotFound = () => {
        return (
            <h1 className="text-white text-center" style={{
                paddingTop: '10rem'
            }}>Movie not found!</h1>
        )
    }

    const movieInfo = () => {
        console.log(movie);
        return (
            <div className="container-fluid px-0" style={{
            background: 'rgba(29, 29, 35, 1)',
            paddingBottom: '5rem',
            paddingTop: '5rem',
        }}>
            <div className="container-fluid px-4">
                <div className="row">
                    <div className="img-container col-4">
                    <img key={movie.id} src={IMG_API + movie.poster_path} alt={movie.title} 
                        style={{
                            width: '100%',
                            boxShadow: '10px 10px 20px black'
                        }}
                    />
                    </div>

                    <div className="col">
                        <div className="container-fluid pb-3 row">
                            <div className="col-12 py-2">
                                <h1 style={{
                                    fontSize: '60px',
                                    textShadow: '4px 4px rgba(80, 80, 100, 1)',
                                }}>{movie.title}</h1>
                            </div>
                            
                            <div className="col py-2">
                                <Rating size="large" score={movie.vote_average}/>
                            </div>
                            
                        </div>

                        <Container variant='primary' outline="white">
                            <span className="py-1" style={{
                                display: 'flex',
                                alignItems: 'center',
                                color: 'white',
                                color: 'white',
                                fontSize: '25px',
                                fontWeight: '500',
                                textShadow: '2px 2px rgba(29, 29, 35, 1)',
                            }}>
                                Overview
                            </span>
                            <span className="py-1" style={{
                                display: 'flex',
                                alignItems: 'center',
                                color: 'rgba(29, 29, 35, 1)',
                                fontSize: '16px',
                                fontWeight: '500',
                            }}>{movie.overview}</span>
                        </Container>                        
                    </div>
                    
                </div>
            </div> 
        </div>
        )
    }
    
    return (
        <div className="container-fluid" style={{
            backgroundColor: "rgba(29, 29, 35, 1)",
        }}>
            {movie.hasOwnProperty('title') ?
                movieInfo()
            :
                movieNotFound()
            }
        </div>
    )
}

export default MoviePage;