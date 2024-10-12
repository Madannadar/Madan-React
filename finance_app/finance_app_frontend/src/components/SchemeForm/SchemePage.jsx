import React, { useState } from "react";
import "./AddScheme.css"; // Assuming you have a CSS file for styles

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

  const [submitStatus, setSubmitStatus] = useState("");
  const [formErrors, setFormErrors] = useState({
    totalAmountError: "",
  });

  // Handle input changes and update the state
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSchemeData({
      ...schemeData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Handle validation for total amount (only 5 digits allowed)
    if (name === "TotalAmount") {
      if (value.length > 5) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          totalAmountError: "Total amount should only be 5 digits",
        }));
      } else {
        setFormErrors((prevErrors) => ({ ...prevErrors, totalAmountError: "" }));
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("");

    // Simple frontend validation
    if (schemeData.TotalAmount.length > 5) {
      setSubmitStatus("Error: Total amount exceeds allowed 5 digits.");
      return;
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
        console.error("Error details:", errorData.details);
        throw new Error("Error adding scheme");
      }

      const result = await response.json();
      console.log("Scheme added:", result);

      setSubmitStatus("Success! Scheme added.");
      // Clear the form after successful submission
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
      setSubmitStatus(`Error: ${error.message}`);
      console.error("Error adding scheme:", error);
    }
  };

  return (
    <div className="scheme-form-container">
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
          placeholder="Enter up to 5 digits"
          value={schemeData.TotalAmount}
          onChange={handleChange}
          required
        />
        {formErrors.totalAmountError && (
          <p className="error-message">{formErrors.totalAmountError}</p>
        )}

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

      {/* Status message */}
      {submitStatus && <p className="submit-status">{submitStatus}</p>}
    </div>
  );
};

export default SchemeForm;
