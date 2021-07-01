import React from 'react';
import MovieRow  from '../Components/MovieRow/MovieRow';
import requests from '../Constants/Requests';

const HomePage = () => {
    return (<>
        <div style={{
            background: 'rgba(29, 29, 35, 1)',
            
            }}>
          <MovieRow backdrop fetchUrl={requests.fetchPopular.url} category="Trending"/>
  
            <div className="movies-container" style={{
              position: 'relative',
              bottom: '20vw'
            }}>
  
              {
                Object.keys(requests).map((req, id) => {
                  return (
                    <div className={id !== 0 ? "movie-row" : "movie-row-1"}>
                      <MovieRow key={id} fetchUrl={requests[req].url} category={requests[req].name}/>
                    </div>
                  )
                })
              }
              
            </div>
  
          </div>
    </>)
}

export default HomePage;