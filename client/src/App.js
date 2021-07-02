import React from 'react';
import './App.css';
import HomePage from './Pages/HomePage';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import Navbar  from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';


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
            <Route path="/login">
              <LoginPage/>
            </Route>
            <Route path="/register">
              <RegisterPage/>
            </Route>
            <Route path="/login">
              <LoginPage/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
    
  );
}

export default App;
