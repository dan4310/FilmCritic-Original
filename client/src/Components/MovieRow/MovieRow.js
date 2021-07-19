import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Rating from '../Rating/Rating';

import './MovieRow.css';

const IMG_API = "https://image.tmdb.org/t/p/w1280";

const MovieRow = ({ category, fetchUrl, backdrop, style }) => {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch(fetchUrl).then(res => res.json())
        .then(data => {
          setMovies(data.results);
        });
      }, [fetchUrl])

      const path = backdrop ? "backdrop_path" : "poster_path";

    if (path === "poster_path") {
        return (
            <div className="category-row ms-4 mt-2 pe-2" style={style}>
                <h2 className="category-text">{category}</h2>
                <div className="poster-row">
                    
                {movies.length > 0 &&
                    movies.map((movie, id) => {
                        if (movie[path]){
                            return (<Link key={movie.id} to={{
                                pathname: '/movie/'+movie.id+'/'+movie.title,
                            }}>
                            <div className="poster">
                                <Rating score={movie.vote_average} style={{
                                    position: 'absolute',
                                    right: 0,
                                    bottom: 0,
                                }}></Rating>
                                <img key={id} className="poster-img m-2" src={IMG_API + movie[path]} alt={movie.title} />
                            </div>
                            </Link>)
                        }
                        return (<div key={movie.id}></div>);
                    })
                }</div>
            </div> 
        )
    }


    return (
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{ zIndex: "0", ...style}}>
            <div className="carousel-inner">
                {
                    movies.map((movie, id) => {
                        if (movie[path]){
                            return (
                                <div key={movie.id} className={(id === 0) ? "carousel-item active" : "carousel-item"} alt={movie.title}>
                                   <div className="poster-lg">
                                       <div className="movie-info-container">
                                            <div className="movie-title-container">
                                                <h1 className="movie-title">{movie.title}</h1>
                                            </div>
                                            <div className="movie-desc-container pt-3">
                                                <p className="movie-desc">{movie.overview}</p>
                                            </div>
                                        </div>
                                        <div className="movie-blur">
                                            
                                        </div>
                                        <img key={id} className="poster-img-lg" src={IMG_API + movie[path]} alt={movie.title} />
                                    </div>
                                </div>
                            )
                        }
                        return <div key={movie.id}></div>
                    })
                }
            </div>
            
            <div className="d-flex flex-direction-row justify-space-between">
                <button className="carousel-control-prev " type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            

        </div>
    )
    
}

export default MovieRow;