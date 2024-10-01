import React, { useState } from "react";
import './SchemeForm.css'; // Import the CSS file

const SchemeForm = () => {
  const [formData, setFormData] = useState({
    schemeName: "",
    startDate: "",
    endDate: "",
    totalAmount: "",
    paymentFrequency: "",
    isRefundable: false,
    refundAmount: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // For now, we just log the form data to the console.
  };

  return (
    <div className="scheme-form-container">
      <h2>Scheme Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Scheme Name:</label>
          <input
            type="text"
            name="schemeName"
            value={formData.schemeName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Total Amount:</label>
          <input
            type="number"
            name="totalAmount"
            value={formData.totalAmount}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Payment Frequency:</label>
          <input
            type="text"
            name="paymentFrequency"
            value={formData.paymentFrequency}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Is Refundable:</label>
          <input
            type="checkbox"
            name="isRefundable"
            checked={formData.isRefundable}
            onChange={handleChange}
          />
        </div>

        {formData.isRefundable && (
          <div>
            <label>Refund Amount:</label>
            <input
              type="number"
              name="refundAmount"
              value={formData.refundAmount}
              onChange={handleChange}
            />
          </div>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SchemeForm;
