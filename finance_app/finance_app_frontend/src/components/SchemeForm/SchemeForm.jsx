// http://localhost:5000/api/schemes

import React, { useState } from "react";
import "./SchemeForm.css"; // Assuming you have a CSS file for styles

const SchemeForm = () => {
  const [schemeData, setSchemeData] = useState({
    SchemeName: "",
    StartDate: "",
    EndDate: "",
    TotalAmount: "",
    PaymentFrequency: "",
    IsRefundable: false,
    RefundAmount: "",
  });

  // Handle input changes and update the state
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSchemeData({
      ...schemeData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Frontend (React)
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("http://localhost:5000/api/schemes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(schemeData), // Send form data
    });

    if (!response.ok) {
      const errorData = await response.json();  // Get detailed error from backend
      console.error("Error details:", errorData.details);  // Log backend error details
      throw new Error("Error adding scheme");
    }

    const result = await response.json();
    console.log("Scheme added:", result);

    // Clear the form after submission
    setSchemeData({
      SchemeName: "",
      StartDate: "",
      EndDate: "",
      TotalAmount: "",
      PaymentFrequency: "",
      IsRefundable: false,
      RefundAmount: "",
    });
  } catch (error) {
    console.error("Error adding scheme:", error);
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Scheme</h2>

      <label htmlFor="SchemeName">Scheme Name:</label>
      <input
        type="text"
        id="SchemeName"
        name="SchemeName"
        value={schemeData.SchemeName}
        onChange={handleChange}
        required
      />

      <label htmlFor="StartDate">Start Date:</label>
      <input
        type="date"
        id="StartDate"
        name="StartDate"
        value={schemeData.StartDate}
        onChange={handleChange}
        required
      />

      <label htmlFor="EndDate">End Date:</label>
      <input
        type="date"
        id="EndDate"
        name="EndDate"
        value={schemeData.EndDate}
        onChange={handleChange}
        required
      />

      <label htmlFor="TotalAmount">Total Amount:</label>
      <input
        type="number"
        id="TotalAmount"
        name="TotalAmount"
        value={schemeData.TotalAmount}
        onChange={handleChange}
        required
      />

      <label htmlFor="PaymentFrequency">Payment Frequency:</label>
      <input
        type="text"
        id="PaymentFrequency"
        name="PaymentFrequency"
        value={schemeData.PaymentFrequency}
        onChange={handleChange}
        required
      />

      <label htmlFor="RefundAmount">Refund Amount:</label>
      <input
        type="number"
        id="RefundAmount"
        name="RefundAmount"
        value={schemeData.RefundAmount}
        onChange={handleChange}
        disabled={!schemeData.IsRefundable}
        required={schemeData.IsRefundable}
      />

      <label htmlFor="IsRefundable">Is Refundable:</label>
      <input
        type="checkbox"
        id="IsRefundable"
        name="IsRefundable"
        checked={schemeData.IsRefundable}
        onChange={handleChange}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default SchemeForm;
