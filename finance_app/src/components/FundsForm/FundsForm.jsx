import React, { useState } from "react";
import './FundsForm.css'; // Import the CSS file

const FundsForm = () => {
  const [formData, setFormData] = useState({
    fundName: "",
    totalAmount: "",
    fundManager: "",
    startDate: "",
    endDate: "",
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
    console.log(formData); // Log the form data for now
  };

  return (
    <div className="funds-form-container">
      <h2>Fund Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Fund Name:</label>
          <input
            type="text"
            name="fundName"
            value={formData.fundName}
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
          <label>Fund Manager:</label>
          <input
            type="text"
            name="fundManager"
            value={formData.fundManager}
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

export default FundsForm;
