import React, { useState } from "react";
import "./AddScheme.css"; // Assuming you have similar styles as FundsForm.css

const SchemeForm = () => {
  const [schemeData, setSchemeData] = useState({
    SchemeName: "",
    TotalAmount: "",
    StartDate: "",
    EndDate: "",
    PaymentFrequency: "",
    IsRefundable: false,
    RefundAmount: 0,
  });

  const [errors, setErrors] = useState({}); // State to hold error messages
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  // Handle input changes and update the state
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "TotalAmount") {
      if (value.length > 12) {
        alert("Total amount cannot exceed 12 digits.");
        return; // Prevent further input
      }
    }
    setSchemeData({
      ...schemeData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission to send data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset errors and success message before validation
    setErrors({});
    setSuccessMessage("");

    // Validate Payment Frequency
    if (schemeData.PaymentFrequency.toLowerCase() !== "monthly" && schemeData.PaymentFrequency.toLowerCase() !== "yearly") {
      setErrors((prev) => ({ ...prev, PaymentFrequency: "Payment frequency must be either 'monthly' or 'yearly'." }));
      return; // Prevent form submission if validation fails
    }

    try {
      const response = await fetch("http://localhost:5000/api/schemes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(schemeData),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Get detailed error from backend
        console.error("Error details:", errorData.details); // Log backend error details
        throw new Error("Error adding scheme");
      }

      const result = await response.json();
      console.log("Scheme added:", result);

      // Set success message after successful submission
      setSuccessMessage("Scheme added successfully!");

      // Clear form after successful submission
      setSchemeData({
        SchemeName: "",
        TotalAmount: "",
        StartDate: "",
        EndDate: "",
        PaymentFrequency: "",
        IsRefundable: false,
        RefundAmount: 0,
      });
    } catch (error) {
      console.error("Error adding scheme:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="scheme-form">
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

      <label htmlFor="TotalAmount">Minimum Amount:</label>
      <input
        type="number"
        id="TotalAmount"
        name="TotalAmount"
        placeholder="more than 500rs"
        value={schemeData.TotalAmount}
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

      <label htmlFor="PaymentFrequency">Payment Frequency:</label>
      <input
        type="text"
        id="PaymentFrequency"
        name="PaymentFrequency"
        value={schemeData.PaymentFrequency}
        onChange={handleChange}
        placeholder="monthly or yearly"
        required
      />
      {/* Error message for Payment Frequency */}
      {errors.PaymentFrequency && <p className="error-message">{errors.PaymentFrequency}</p>}

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
      {/* Success message */}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </form>
  );
};

export default SchemeForm;
