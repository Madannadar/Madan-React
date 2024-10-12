import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Optional CSS for styling

const Home = () => {
  const [schemes, setSchemes] = useState([]);
  const [showSchemes, setShowSchemes] = useState(false);

  const fetchSchemes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/schemes'); // Fetch from your backend
      const data = await response.json();
      setSchemes(data); // Update state with fetched data
      setShowSchemes(true); // Show schemes when data is fetched
    } catch (error) {
      console.error('Error fetching schemes:', error);
    }
  };

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
            <li>
              <Link to="/show-funds">Show Funds</Link> 
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <h2>Welcome to the Finance Management System</h2>
        <p>Select an option from the menu to get started.</p>

        {/* Button to show schemes */}
        <button onClick={fetchSchemes}>Show Schemes</button>

        {/* Conditionally render the fetched schemes */}
        {showSchemes && (
          <div className="schemes-list">
            <h2>Available Schemes</h2>
            <ul>
              {schemes.map((scheme) => (
                <li key={scheme.id}> {/* Add key prop here */}
                  <strong>Scheme Name:</strong> {scheme.schemename} <br />
                  <strong>Total Amount:</strong> {scheme.totalamount} <br />
                  <strong>Start Date:</strong> {scheme.startdate} <br />
                  <strong>End Date:</strong> {scheme.enddate}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
