import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Container from '../Components/Container/Container';
import { useDispatch } from 'react-redux';
import { 
    setUser,
 } from './../features/authentication/authSlice';
import { useLazyQuery } from '@apollo/client';
import { GET_USER_LOGIN } from '../Graphql/Queries';

const LoginPage = (props) => {
    const [getLogin, {loading: loginLoading, error: loginError, data: loginData }] = useLazyQuery(GET_USER_LOGIN);
    const history = useHistory();
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const showErrorMessage = (message) => {
        setErrorMessage(message);

        setTimeout(() => {
            setErrorMessage('');
        }, 3000);
    }
     
    const renderErrorMessage = (message) => {
        return(
            <span style={{
                color: 'white',
                textTransform: 'initial'
            }}>{message}</span>
        )
    }


    
    const login = () => {
        if (username.length > 0 && password.length > 0) {
            getLogin({
                variables: {
                    username: username,
                    password: password,
                }
            });
        } else {
            showErrorMessage("Must enter a username and password");
        }
    }

    useEffect(() => {
        if (loginLoading) showErrorMessage("Loading...");
    }, [loginLoading]);
    useEffect(() => {
        if (loginError) showErrorMessage(loginError.message);
    }, [loginError]);

    useEffect(() => {
        if (loginData?.login) {
            showErrorMessage("Welcome "+loginData.login.username);
            dispatch(setUser(loginData.login));
            history.push("/");
        }
    }, [loginData, dispatch, history]);
    
    return (
        <div className="container-fluid px-0" style={{
            background: 'rgba(29, 29, 35, 1)',
            paddingBottom: '5rem',
            paddingTop: '5rem',
        }}>
            <div className="container-fluid px-4">
                <h1 className="py-2 form-title" style={{
                    fontSize: '48px',
                    textShadow: '4px 4px rgba(80, 80, 100, 1)',
                }}>Login</h1>

                <div>
                    {renderErrorMessage(errorMessage)}
                </div>
                

                <form>
                <Container topBorder variant="shadow">
                <div className="mb-3">
                    <label htmlFor="exampleInputUsername1" className="form-label">Username *</label>
                    <input type="username" className="form-control" id="exampleInputUsername1" aria-describedby="usernameHelp"
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label d-flex">Password *</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                
                <button type="button" className="btn-login draw meet"
                    onClick={login}
                >Login</button>
                </Container>
                </form>

                <label className="form-label mt-4">Don't have an account? Become a critic <Link to="/register"
                    style={{
                        textDecoration: 'none',
                        color: "rgba(225, 202, 240, 1)",
                        borderBottom: '2px solid rgba(80, 80, 100, 1)'
                    }}
                >here.</Link></label>

            </div> 
        </div>
    )
}

export default LoginPage;