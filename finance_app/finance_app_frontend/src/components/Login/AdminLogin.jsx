// src/components/AdminLogin.js

import React from 'react';

const AdminLogin = () => {
    return (
        <div className="login-form">
            <h2>Admin Login</h2>
            <form>
                <label>
                    Username:
                    <input type="text" name="username" />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" />
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;
