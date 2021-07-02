import React from 'react';
import './App.css';
import HomePage from './Pages/HomePage';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import MoviePage from './Pages/MoviePage';
import Navbar  from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';


function App() {


  return (
    <Router>
      <div className="App">
        <Navbar/>
        <div className="content-page" style={{
          background: 'rgba(29, 29, 35, 1)',
          height: '100vh'
        }}>
          <Switch>
            <Route exact path="/">
              <HomePage/>
            </Route>
            <Route exact path="/login">
              <LoginPage/>
            </Route>
            <Route exact path="/register">
              <RegisterPage/>
            </Route>
            <Route exact path="/movie/:movieId/:name" component={MoviePage}/>
            <Redirect to="/"/>
          </Switch>
        </div>
      </div>
    </Router>
    
  );
}

export default App;
