import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './RegisterPage.css'
import { 
    setUser,
 } from './../features/authentication/authSlice';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../Graphql/Mutations';
import { useHistory } from 'react-router-dom';


const RegisterPage = () => {
    const [getRegister, { error: userError, loading: userLoading, data: userData }] = useMutation(CREATE_USER);
    const history = useHistory();
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const validUserSetUp = () => {
        if (username.length <= 0) {
            return {success: false, message: "Must enter a username"};
        } else if (password.length <= 0) {
            return {success: false, message: "Must enter a password"};
        } else if (password !== confirmPassword) {
            return {success: false, message: "Passwords must match"};
        }

        return {success: true, message: "Welcome to the Critics Club!"};
    }

    const register = async () => {
        var temp = validUserSetUp();
        if (temp.success === true) {
            await getRegister({ variables: {
                username: username,
                password: password,
                email: email,
                firstName: firstName,
                lastName: lastName
            }});
            
        }
        showError(temp.message);
    };

    useEffect(() => {
        if (userLoading) showError("Loading...");
    }, [userLoading]);

    useEffect(() => {
        if (userError) showError(userError.message);
    }, [userError]);

    useEffect(() => {
        if (userData?.register) {
            dispatch(setUser(userData.register));
            history.push("/");
        }
    }, [userData, dispatch, history]);

    function showError(message) {
        setErrorMessage(message);

        setTimeout(() => {
            setErrorMessage('');
        }, 3000);
    }

    const renderErrorMesage = (message) => {
        if (message.length <= 0) return;

        return (
            <span className="mt-0" style={{
                color: 'white'
            }}>{message}</span>
        )
    }

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

                <div>
                    {renderErrorMesage(errorMessage)}
                </div>

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
                
                <button type="button" className="btn-login draw meet"
                    onClick={register}
                >Register</button>
                </form>
                
            </div>
        </div>
    )
}

export default RegisterPage;