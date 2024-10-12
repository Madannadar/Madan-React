import React, { useEffect, useState } from "react";
import "./ViewSchemes.css"; // Optional CSS for styling

const ViewSchemes = () => {
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    // Fetch schemes from the server
    const fetchSchemes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/schemes");
        if (!response.ok) {
          throw new Error("Failed to fetch schemes");
        }
        const data = await response.json();
        setSchemes(data);
      } catch (error) {
        console.error("Error fetching schemes:", error);
      }
    };

    fetchSchemes();
  }, []);

  return (
    <div>
      <h2>Available scheme</h2>
      {schemes.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Scheme Name</th>
              <th>Total Amount</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {schemes.map((scheme) => (
              <tr key={scheme.id}>
                <td>{scheme.SchemeName}</td>
                <td>{scheme.TotalAmount}</td>
                <td>{new Date(scheme.StartDate).toLocaleDateString()}</td>
                <td>{new Date(scheme.EndDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No schemes available.</p>
      )}
    </div>
  );
};

export default ViewSchemes;
