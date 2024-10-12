import React, { useState } from "react";
import "./AddFunds.css"; // Assuming you have a CSS file for styles

const AddFunds = () => {
  const [fundData, setFundData] = useState({
    FundName: "",
    TotalAmount: "",
    StartDate: "",
    EndDate: "",
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
    setFundData({
      ...fundData,
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
    if (fundData.TotalAmount.length > 5) {
      setSubmitStatus("Error: Total amount exceeds allowed 5 digits.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/funds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fundData),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Get detailed error from backend
        console.error("Error details:", errorData.details);
        throw new Error("Error adding fund");
      }

      const result = await response.json();
      console.log("Fund added:", result);

      setSubmitStatus("Success! Fund added.");
      // Clear the form after successful submission
      setFundData({
        FundName: "",
        TotalAmount: "",
        StartDate: "",
        EndDate: "",
        PaymentFrequency: "",
        IsRefundable: false,
        RefundAmount: "",
      });
    } catch (error) {
      setSubmitStatus(`Error: ${error.message}`);
      console.error("Error adding fund:", error);
    }
  };

  return (
    <div className="fund-form-container">
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
          placeholder="Enter up to 5 digits"
          value={fundData.TotalAmount}
          onChange={handleChange}
          required
        />
        {formErrors.totalAmountError && (
          <p className="error-message">{formErrors.totalAmountError}</p>
        )}

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

      {/* Status message */}
      {submitStatus && <p className="submit-status">{submitStatus}</p>}
    </div>
  );
};

export default AddFunds;
