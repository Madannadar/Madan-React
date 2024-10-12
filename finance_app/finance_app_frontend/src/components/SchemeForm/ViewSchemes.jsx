import React, { useEffect, useState } from "react";
import "./ViewScheme.css"; // CSS file for styling

const ViewSchemes = () => {
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    // Fetch schemes from the server
    const fetchSchemes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/schemes");
        const data = await response.json();
        setSchemes(data);
      } catch (error) {
        console.error("Error fetching schemes:", error);
      }
    };

    fetchSchemes();
  }, []);

  return (
    <div className="table-container">
      <h2>Available Schemes</h2>
      <table>
        <thead>
          <tr>
            <th>Scheme Name</th>
            <th>Total Amount</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Payment Frequency</th>
            <th>Refundable</th>
            <th>Refund Amount</th>
          </tr>
        </thead>
        <tbody>
          {schemes.map((scheme) => (
            <tr key={scheme.id}>
              <td>{scheme.schemename}</td>
              <td>{scheme.totalamount}</td>
              <td>{new Date(scheme.startdate).toLocaleDateString()}</td>
              <td>{new Date(scheme.enddate).toLocaleDateString()}</td>
              <td>{scheme.paymentfrequency === "monthly" ? "Monthly" : "Yearly"}</td>
              <td>{scheme.isrefundable ? "Yes" : "No"}</td>
              <td>{scheme.refundamount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewSchemes;
