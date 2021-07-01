import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const LoginPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = () => {
        Axios.post("http://localhost:3001/login", {
            username: username,
            password: password,
        }).then((response) => {
            console.log(response);
        });
    };

    return (
        <div className="container-fluid px-0" style={{
            background: 'rgba(29, 29, 35, 1)',
            paddingBottom: '5rem',
            paddingTop: '5rem',
            height: '100vh'
        }}>
            <div className="container-fluid px-4">
                <h1 className="py-2" style={{
                    fontSize: '48px',
                    textShadow: '4px 4px rgba(80, 80, 100, 1)',
                }}>Login</h1>
                <form className="container-fluid py-3" style={{
                    backgroundColor: 'rgba(80, 80, 100, 1)',
                    borderTop: '4px solid rgba(225, 202, 240, 1)',
                    boxShadow: '10px 10px 20px black',
                    borderRadius: '3px',
                }}>
                <div className="mb-3">
                    <label htmlFor="exampleInputUsername1" className="form-label d-flex">Username *</label>
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
                
                <button type="button" className="btn-login me-auto"
                    onClick={login}
                >Login</button>
                </form>
                
            </div>
        </div>
    )
}

export default LoginPage;