import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios';
import Container from '../Components/Container/Container';
import { useSelector, useDispatch } from 'react-redux';
import { 
    setUser
 } from './../features/authentication/authSlice';

const LoginPage = () => {
    const history = useHistory();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = () => {
        Axios.post("http://localhost:3001/login", {
            username: username,
            password: password,
        }).then((response) => {
            if (response.data.message) {
                console.log(response.data.message);
            } else {
                dispatch(setUser(response.data));
                history.push("/");
            }
        });
    };

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