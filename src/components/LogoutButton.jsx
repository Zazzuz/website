import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { signOut } from 'firebase/auth';
import '../styles/logbuttons.css';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth)
        .then(() => {
            navigate('/login');
        })
        .catch((error) => {
            console.error('Error logging out:', error);
        });
    };

    return (
        <button id="logoutButton"  onClick={handleLogout} className='logout-button'>
        Logout
        </button>
    );
};

export default LogoutButton;