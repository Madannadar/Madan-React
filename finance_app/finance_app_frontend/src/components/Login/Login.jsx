// src/components/Login.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    return (
        <div className="login-container">
            <h1>Welcome</h1>
            <p>Please select your access level:</p>
            <button onClick={() => navigate('/employee-login')}>Employee</button>
            <button onClick={() => navigate('/admin-login')}>Admin</button>
        </div>
    );
};

export default Login;
