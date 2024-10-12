import React, { useEffect, useState } from "react";
import "./ViewFunds.css"; // CSS for styling

const ViewFunds = () => {
  const [funds, setFunds] = useState([]);

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/funds");
        const data = await response.json();
        setFunds(data);
      } catch (error) {
        console.error("Error fetching funds:", error);
      }
    };

    fetchFunds();
  }, []);

  const formatPaymentFrequency = (frequency) => {
    // Assuming the backend sends '1' for monthly and '2' for yearly
    if (frequency === '1') {
      return "Monthly";
    } else if (frequency === '2') {
      return "Yearly";
    } else {
      return "Unknown";
    }
  };

  return (
    <div className="table-container">
      <h2>Available Funds</h2>
      <table>
        <thead>
          <tr>
            <th>Fund Name</th>
            <th>Total Amount</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Payment Frequency</th>
            <th>Refundable</th>
            <th>Refund Amount</th>
          </tr>
        </thead>
        <tbody>
          {funds.map((fund, index) => (
            <tr key={index}>
              <td>{fund.fundname}</td>
              <td>{fund.totalamount}</td>
              {/* Formatting the start and end dates */}
              <td>{fund.startdate ? new Date(fund.startdate).toLocaleDateString() : 'N/A'}</td>
              <td>{fund.enddate ? new Date(fund.enddate).toLocaleDateString() : 'N/A'}</td>
              <td>{formatPaymentFrequency(fund.paymentfrequency)}</td>
              <td>{fund.isrefundable ? "Yes" : "No"}</td>
              <td>{fund.refundamount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewFunds;
