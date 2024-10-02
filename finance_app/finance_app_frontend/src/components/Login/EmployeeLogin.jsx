// src/components/EmployeeLogin.js

import React, { useState } from 'react';

const EmployeeLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if email ends with @gmail.com
        if (!email.endsWith('@gmail.com')) {
            setError('Email must be a Gmail address (e.g., user@gmail.com)');
        } else {
            setError('');
            // Handle successful login here
            alert('Employee login successful');
        }
    };

    return (
        <div className="login-form">
            <h2>Employee Login</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input 
                        type="text" 
                        name="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </label>
                <label>
                    Password:
                    <input 
                        type="password" 
                        name="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </label>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default EmployeeLogin;
