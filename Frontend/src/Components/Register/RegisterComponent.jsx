import { useState, useEffect, Fragment, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.css';

import { useDispatch } from 'react-redux';

const RegisterComponent = () => {
    const navigate = useNavigate();

    const postData = async (postdata) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/register`, postdata, { withCredentials: true });
            if (response.status === 200) {
                navigate('/login', { replace: true });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const firstName = e.target.firstName.value;
        const lastName = e.target.lastName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const data = { firstName, lastName, email, password, confirmPassword };
        postData(data);
    };

    const handleSignIn = (e) =>{
        navigate('/login', {replace:true})
    }

    return (
        <>
            <div className="registerContainer">
                <form className="registerItem" onSubmit={handleSubmit}>
                    <h1>Register</h1>
                    <input type="text" placeholder="First Name" name="firstName" required />
                    <input type="text" placeholder="Last Name" name="lastName" required />
                    <input type="email" placeholder="Email" name="email" required />
                    <input type="password" placeholder="Password" name="password" required />
                    <input type="password" placeholder="Confirm Password" name="confirmPassword" required />
                    
                    <button type="submit">Register</button>
                    <br />
                    <button type="submit" onClick={handleSignIn}>Sign In</button>
                </form>
            </div>
        </>
    );
}

export default RegisterComponent;
