import React, { useState } from "react";
import "./FundsForm.css"; // Assuming you have the same styles

const FundsForm = () => {
  const [fundData, setFundData] = useState({
    FundName: "",
    TotalAmount: "",
    FundManager: "",
    StartDate: "",
    EndDate: "",
    PaymentFrequency: "",
    IsRefundable: false,
    RefundAmount: "",
  });

  // Handle input changes and update the state
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFundData({
      ...fundData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission to send data to the backend
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("http://localhost:5000/api/funds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fundData),
    });

    if (!response.ok) {
      throw new Error("Failed to add fund");
    }

    const result = await response.json();
    console.log("Fund added:", result);

    // Clear form after successful submission
    setFundData({
      FundName: "",
      TotalAmount: "",
      FundManager: "",
      StartDate: "",
      EndDate: "",
      PaymentFrequency: "",
      IsRefundable: false,
      RefundAmount: "",
    });
  } catch (error) {
    console.error("Error adding fund:", error);
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Fund</h2>

      <label htmlFor="FundName">Fund Name:</label>
      <input
        type="text"
        id="FundName"
        name="FundName"
        value={fundData.FundName}
        onChange={handleChange}
        required
      />

      <label htmlFor="TotalAmount">Total Amount:</label>
      <input
        type="number"
        id="TotalAmount"
        name="TotalAmount"
        value={fundData.TotalAmount}
        onChange={handleChange}
        required
      />

      <label htmlFor="FundManager">Fund Manager:</label>
      <input
        type="text"
        id="FundManager"
        name="FundManager"
        value={fundData.FundManager}
        onChange={handleChange}
        required
      />

      <label htmlFor="StartDate">Start Date:</label>
      <input
        type="date"
        id="StartDate"
        name="StartDate"
        value={fundData.StartDate}
        onChange={handleChange}
        required
      />

      <label htmlFor="EndDate">End Date:</label>
      <input
        type="date"
        id="EndDate"
        name="EndDate"
        value={fundData.EndDate}
        onChange={handleChange}
        required
      />

      <label htmlFor="PaymentFrequency">Payment Frequency:</label>
      <input
        type="text"
        id="PaymentFrequency"
        name="PaymentFrequency"
        value={fundData.PaymentFrequency}
        onChange={handleChange}
        required
      />

      <label htmlFor="RefundAmount">Refund Amount:</label>
      <input
        type="number"
        id="RefundAmount"
        name="RefundAmount"
        value={fundData.RefundAmount}
        onChange={handleChange}
        disabled={!fundData.IsRefundable}
        required={fundData.IsRefundable}
      />

      <label htmlFor="IsRefundable">Is Refundable:</label>
      <input
        type="checkbox"
        id="IsRefundable"
        name="IsRefundable"
        checked={fundData.IsRefundable}
        onChange={handleChange}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default FundsForm;
