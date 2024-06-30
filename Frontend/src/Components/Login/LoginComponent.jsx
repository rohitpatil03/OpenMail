import { useState, useEffect, Fragment, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css'

import { useSelector, useDispatch } from 'react-redux';
import { setUsername, setData, setLoading, setIsInbox } from '../../redux/reducers/reducers';

const LoginComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const postData = async (postdata) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, postdata, { withCredentials: true });
            if (response.status === 200) {
                dispatch(setUsername(postdata.username));
                navigate('/dashboard', { replace: true });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        const data = { 'username': username, 'password': password };
        postData(data);
    };

    const handleSignUp = (e) =>{
        navigate('/register', {replace:true})
    }

    const handleForgetPassword = (e) =>{
        navigate('/forgot', {replace:true})
    }

    return (
        <>
            <div className="loginContainer">
                <form className="loginItem" onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <input type="text" placeholder="Username" name="username" required />
                    <input type="password" placeholder="Password" name="password" required />
                    {/* <div className='signUp'>
                        <p onClick={handleSignUp} style={{cursor:'pointer'}}>Sign Up</p>
                        <p onClick={handleForgetPassword} style={{cursor:'pointer'}}>Forget Password</p>
                    </div> */}
                    <button type="submit">Submit</button>
                    <br />
                    <button type="submit" onClick={handleSignUp}>Sign Up</button>
                    
                </form>
            </div>
        </>
    );
}

export default LoginComponent;
