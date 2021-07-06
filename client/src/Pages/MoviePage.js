import React, { useEffect, useState } from 'react';
import requests from '../Constants/Requests';
import Container from '../Components/Container/Container';
import Rating from '../Components/Rating/Rating';
import Badge from '../Components/Badge/Badge';
import ReviewForm from '../Components/ReviewForm/ReviewForm';
const IMG_API = "https://image.tmdb.org/t/p/w1280";

const MoviePage = (props) => {
    const [movie, setMovie] = useState({});
    var tempUrl = props.location.pathname;
    tempUrl = tempUrl.slice(7,tempUrl.length);

    const movieId = tempUrl.slice(0, tempUrl.indexOf('/'));

    useEffect(() => {
        const movieUrl = requests.moviepageRequests.fetchMovie(movieId).url;
        fetch(movieUrl).then(res => res.json())
        .then(data => {
            if (data.status_message) {
                return;
            }
            setMovie(data);
        });
      }, [])

      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      
      });

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
                    <div className="img-container col-3 d-flex flex-column">
                        <div className="mb-4">
                            <img key={movie.id} src={IMG_API + movie.poster_path} alt={movie.title} 
                                style={{
                                    width: '100%',
                                    boxShadow: '10px 10px 20px black'
                                }}
                            />
                        </div>
                        <h1 style={{
                                color: 'rgba(80, 80, 100, 1)',
                                fontSize: '25px',
                                fontWeight: '500',
                                textShadow: '2px 2px black',
                            }}>Production Companies</h1>
                        <Container>
                            {
                                movie.production_companies.map((company, id) => {
                                    return (
                                        <span className="" style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            color: 'rgba(29, 29, 35, 1)',
                                            fontSize: '16px',
                                            fontWeight: '500',
                                        }}>{company.name}</span>
                                    )
                                })
                            }
                        </Container>
                    
                    </div>

                    <div className="col">
                        <div className="pb-3 row">
                            <div className="col-12 d-flex flex-column">
                                <h1 style={{
                                    fontSize: '60px',
                                    textShadow: '4px 4px rgba(80, 80, 100, 1)',
                                }}>{movie.title}</h1>
                                {
                                    movie.tagline && <h1 style={{
                                        color: 'rgba(80, 80, 100, 1)',
                                        fontSize: '25px',
                                        fontWeight: '500',
                                        textShadow: '2px 2px black',
                                    }}>{movie.tagline}</h1>
                                }
                            </div>

                            <div className="col-12 d-flex flex-row py-2">
                                {
                                    movie.genres.map((genre, id) => {
                                        return (
                                            <Badge className="me-3" key={id}>{genre.name}</Badge>
                                        )
                                    })
                                }
                            </div>
                            
                            <div className="col my-3">
                                <Container className="d-flex align-items-center justify-content-between">
                                    <Rating className="" size="large" score={movie.vote_average}
                                        style={{
                                            backgroundColor: 'rgba(225, 202, 240, 1)',
                                            boxShadow: '4px 4px rgba(29, 29, 35, 1)',
                                            border: '2px solid white',
                                        }}
                                    />
                                    <span className="" style={{
                                            color: 'rgba(29, 29, 35, 1)',
                                            fontSize: '16px',
                                            fontWeight: '500',
                                            width: 'auto'
                                        }}>{movie.runtime+" mins"}</span>

                                    <div className="d-flex flex-column">
                                        <span style={{
                                            color: 'rgba(29, 29, 35, 1)',
                                            fontSize: '16px',
                                            fontWeight: '500',
                                        }}>{'Budget: '+formatter.format(movie.budget)}</span>
                                        <span style={{
                                            color: 'rgba(29, 29, 35, 1)',
                                            fontSize: '16px',
                                            fontWeight: '500',
                                        }}>{'Revenue: '+formatter.format(movie.revenue)}</span>
                                    </div>
                                    <div>

                                    </div>
                                    
                                </Container>
                            </div>
                            
                        </div>
                        { movie.overview &&
                             <Container>
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
                        }

                        <ReviewForm className="mt-4"></ReviewForm>
                                               
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