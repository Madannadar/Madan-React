// src/components/Home.jsx

import React from "react";
import { Link } from "react-router-dom";
import './Home.css';


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
              <Link to="/scheme">Add Scheme</Link>
            </li>
            <li>
              <Link to="/fund">Add Funds</Link>
            </li>
            <li>
              <Link to="/view-schemes">View Schemes</Link> {/* Link to the new page */}
            </li>
            <li>
              <Link to="/view-funds">View Funds</Link>
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
