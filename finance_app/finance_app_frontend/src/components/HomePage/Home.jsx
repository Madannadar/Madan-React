// src/components/Home.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Optional CSS for styling

const Home = () => {
  return (
    <div className="home">
      <header className="home-header">
        <h1>Finance Management System</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/scheme">Scheme</Link>
            </li>
            <li>
              <Link to="/fund">Funds</Link>
            </li>
            <li>
              <Link to="/payment">Payment</Link>
            </li>
            <li>
              <Link to="/customer-details">Customer Details</Link>
            </li>
          </ul>
        </nav>
      </header>
      
      <main>
        <h2>Welcome to the Finance Management System</h2>
        <p>Select an option from the menu to get started.</p>
      </main>
    </div>
  );
};

export default Home;
