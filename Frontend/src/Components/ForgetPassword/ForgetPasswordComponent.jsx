import { useState } from 'react';
import axios from 'axios';
import './forgotPassword.css';

const ForgotPasswordComponent = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/forgot-password`, { email });
            if (response.status === 200) {
                setMessage('Password reset instructions have been sent to your email.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
            console.error(error);
        }
    };

    return (
        <div className="forgotPasswordContainer">
            <form className="forgotPasswordItem" onSubmit={handleSubmit}>
                <h1>Forgot Password</h1>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Submit</button>
                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
};

export default ForgotPasswordComponent;
