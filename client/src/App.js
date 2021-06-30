import React, { useEffect, useState } from 'react';
import './App.css';
import MovieRow  from './Components/MovieRow/MovieRow';
import requests from './Constants/Requests';
import Navbar  from './Components/Navbar/Navbar';


function App() {

  return (
    <div className="App">
      <Navbar/>

        <div style={{
          background: 'rgba(29, 29, 35, 1)',
          }}>
        <MovieRow backdrop fetchUrl={requests.fetchPopular.url} category="Trending"/>

          <div style={{
            
          }}>

            {
              Object.keys(requests).map((req, id) => {
                return (
                  <div className={id !== 0 ? "movie-row" : "movie-row-1"} style={{
                    position: "relative",
                    bottom: '10rem',
                  }}>
                    <MovieRow key={id} fetchUrl={requests[req].url} category={requests[req].name}/>
                  </div>
                )
              })
            }
            
          </div>

         
          

        </div>
        
    </div>
  );
}

export default App;
