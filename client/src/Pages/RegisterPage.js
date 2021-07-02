import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './RegisterPage.css'

const RegisterPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const register = () => {
        if (password === confirmPassword) {
            Axios.post('http://localhost:3001/register', {
                username: username,
                password: password,
                firstName: firstName,
                lastName: lastName,
                email: email
            }).then((response) => {
                console.log(response);
            });
        }
        
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
                }}>Create an account</h1>
                <form className="container-fluid py-3" style={{
                    backgroundColor: 'rgba(80, 80, 100, 1)',
                    borderTop: '4px solid rgba(225, 202, 240, 1)',
                    boxShadow: '10px 10px 20px black',
                    borderRadius: '3px',
                }}>
                <div className="row">
                    <div className="mb-3 col-12 col-md-6">
                        <label htmlFor="exampleInputFirstName1" className="form-label">First name</label>
                        <input type="firstName" className="form-control" id="exampleInputFirstName1" aria-describedby="firstNameHelp"
                            onChange={(e) => {
                                setFirstName(e.target.value);
                            }}
                        />
                    </div>
                    <div className="mb-3 col-12 col-md-6">
                        <label htmlFor="exampleInputLastName1" className="form-label">Last name</label>
                        <input type="lastName" className="form-control" id="exampleInputLastName1" aria-describedby="firstNameHelp"
                            onChange={(e) => {
                                setLastName(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputUsername1" className="form-label d-flex">Username *</label>
                    <input type="username" className="form-control" id="exampleInputUsername1" aria-describedby="usernameHelp"
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                </div>
                
                <div className="mb-2">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <div id="emailHelp" className="form-text" style={{
                        color: 'rgba(29, 29, 35, 1)'
                    }}>We'll never share your email with anyone else.</div>
                </div>

                <div className="row">
                    <div className="mb-3 col-12 col-md-6">
                        <label htmlFor="exampleInputPassword1" className="form-label d-flex">Password *</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                    <div className="mb-3 col-12 col-md-6">
                        <label htmlFor="exampleInputConfirmPassword1" className="form-label">Confirm Password *</label>
                        <input type="password" className="form-control" id="exampleInputConfirmPassword1"
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                            }}
                        />
                        <div id="confirmPasswordHelp" className="form-text" style={{
                            color: 'rgba(29, 29, 35, 1)'
                        }}>Re-enter your password to confirm it was entered correctly.</div>
                    </div>
                </div>
                
                <button type="submit" className="btn-login draw meet"
                    onClick={register}
                >Register</button>
                </form>
                
            </div>
        </div>
    )
}

export default RegisterPage;