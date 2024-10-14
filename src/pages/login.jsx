import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        const email = `${username}@website.local`;
        e.preventDefault();
        try {
        setError('');
        setLoading(true);
        await login(email, password);
        navigate('/login');
        } catch {
        setError('Failed to log in');
        }
        setLoading(false);
    }

    return (
        <div style={styles.container}>
            {currentUser ? (
                <div>
                    <h1 style={styles.header}>Welcome, {currentUser.email.split("@website.local")}!</h1>
                    <div style={styles.homeButton}>
                        <button onClick={() => navigate('/')}>Got to Home</button>
                    </div>
                </div>
            ) : (
                <div>
                    <h2 style={styles.header}>Log In</h2>
                        {error && <p>{error}</p>}
                        <div style={styles.card}>
                            <form onSubmit={handleSubmit} style={styles.form}>
                                <div>
                                    <input style={styles.username} type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                                </div>
                                <div>
                                    <input style={styles.password} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                <div>
                                    <button style={styles.loginButton} type="submit" disabled={loading}>Log In</button>
                                </div>
                                {/*<div style={styles.passwordReset}>
                                    <a href="">Forgot Password?</a>
                                </div>*/}
                            </form>
                        </div>
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    homeButton: {
        textAlign: 'center',
        padding: '20px',
    },
    loginButton: {
        margin: '10px',
        textAlign: 'center',
    },
    header: {
        textAlign: 'center',
        fontSize: '36px',
        margin: '10px 0 20px',
    },
    card: {
        background: '#b69c8b',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '300px',
        margin: 'auto',
        height: 'auto',
    },
    form: {
        textAlign: 'center',
        margin: 'auto',
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
    image: {
        width: '100%',
        height: '150px',
        objectFit: 'cover',
    },
    username: {
        margin: '5px',
        height: '20px',
        width: '225px',
    },
    password: {
        margin: '5px',
        height: '20px',
        width: '225px',
    },
    passwordReset: {
        margin: '10px',
        textDecoration: 'underline',
    }
};