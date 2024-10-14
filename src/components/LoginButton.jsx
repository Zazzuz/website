import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/logbuttons.css';

const LoginButton = () => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate('/login')
    }

    return (
        <button id="loginButton" onClick={handleNavigation} className='login-button'>
        Login
        </button>
    );
};

export default LoginButton;