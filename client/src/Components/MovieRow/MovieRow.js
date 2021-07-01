import React, { useEffect, useState } from 'react';

import './MovieRow.css';

const IMG_API = "https://image.tmdb.org/t/p/w1280";

const MovieRow = ({category, fetchUrl, backdrop, style }) => {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch(fetchUrl).then(res => res.json())
        .then(data => {
          console.log(data.results);
          setMovies(data.results);
        });
      }, [fetchUrl])

    const ratingColor = (rating) => {
        if (rating <= 0) {
            return "white";
        } else if (rating <= 5) {
            return "red";
        } else if (rating <= 8) {
            return "orange";
        } else {
            return "lightgreen";
        }
    }

      const path = backdrop ? "backdrop_path" : "poster_path";

    if (path === "poster_path") {
        return (
            <div className="category-row ms-4 mt-2">
                <h2 className="m-2 category-text">{category}</h2>
                <div className="poster-row">
                    
                {movies.length > 0 &&
                    movies.map((movie, id) => {
                        if (movie[path]){
                            return (<div className="poster">
                                <div className="rating-container" style={{
                                    color: ratingColor(movie.vote_average)
                                }}>
                                    {movie.vote_average === 0 ? "NA" : movie.vote_average}
                                </div>
                                <img key={id} className="poster-img m-2" src={IMG_API + movie[path]} alt={movie.title} />
                            </div>)
                        }
                        
                    })
                }</div>
            </div> 
        )
    }


    return (
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                {
                    movies.map((movie, id) => {
                        if (movie[path]){
                            return (
                                <div className={(id == 0) ? "carousel-item active" : "carousel-item"} alt={movie.title}>
                                   <div className="poster-lg">
                                       <div class="movie-info-container">
                                            <div class="movie-title-container">
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
                        
                    })
                }
            </div>
            
            <div className="d-flex flex-direction-row justify-space-between">
                <button class="carousel-control-prev " type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
            

        </div>
    )
    
}

export default MovieRow;

/*
<div className="category-row-lg">

                <div className="poster-row-lg">
                    
                {movies.length > 0 &&
                    movies.map((movie, id) => {
                        if (movie[path]){
                            return (<div className="poster-lg">
                                <h1 className="movie-title">{movie.title}</h1>
                                <img key={id} className="poster-img-lg" src={IMG_API + movie[path]} alt={movie.title} />
                            </div>)
                        }
                        
                    })
                }</div>
        </div> 

*/