import React, { useEffect, useState } from 'react';
import './Showfunds.css'; // Optional CSS for styling

const Showfunds = () => {
  const [funds, setfunds] = useState([]);

  useEffect(() => {
    const fetchfunds = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/funds");
        if (!response.ok) {
          throw new Error("Failed to fetch funds");
        }
        const data = await response.json();
        setfunds(data); // Assuming data is an array of funds
      } catch (error) {
        console.error("Error fetching funds:", error);
      }
    };

    fetchfunds();
  }, []);

  return (
    <div className="show-funds">
      <h2>Available funds</h2>
      {funds.length > 0 ? (
        <ul>
          {funds.map((fund) => (
            <li key={fund.id}> {/* Assuming fund has a unique id */}
              <strong>Fund Name:</strong> {fund.FundName} <br />
              <strong>Total Amount:</strong> {fund.TotalAmount} <br />
              <strong>Start Date:</strong> {new Date(fund.StartDate).toLocaleDateString()} <br />
              <strong>End Date:</strong> {new Date(fund.EndDate).toLocaleDateString()} <br />
              <strong>Payment Frequency:</strong> {fund.PaymentFrequency} <br />
              <strong>Is Refundable:</strong> {fund.IsRefundable ? 'Yes' : 'No'} <br />
              <strong>Refund Amount:</strong> {fund.RefundAmount}
            </li>
          ))}
        </ul>
      ) : (
        <p>No funds available.</p>
      )}
    </div>
  );
};

export default Showfunds;
