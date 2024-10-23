import React, { useState } from "react";
import "./CustomerForm.css";

const CustomerForm = ({ schemeId }) => {
  const [customerData, setCustomerData] = useState({
    customer_name: "",
    address: "",
    bank_name: "",
    account_number: "",
    ifsc_code: "",
    branch: "",
    aadhar_number: "",
    mobile_number: "",
    start_date: "",
    total_amount: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({
      ...customerData,
      [name]: value,
    });

    // Clear the error for the corresponding field on change
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validate = () => {
    const newErrors = {};

    // Validate customer name (only alphabets)
    if (!/^[A-Za-z\s]+$/.test(customerData.customer_name)) {
      newErrors.customer_name = "Customer name should only contain alphabets.";
    }

    // Validate bank name (only alphabets)
    if (!/^[A-Za-z\s]+$/.test(customerData.bank_name)) {
      newErrors.bank_name = "Bank name should only contain alphabets.";
    }

    // Validate account number (must be an integer)
    if (!/^\d+$/.test(customerData.account_number)) {
      newErrors.account_number = "Account number should be an integer.";
    }

    // Validate mobile number (must be an integer)
    if (!/^\d+$/.test(customerData.mobile_number)) {
      newErrors.mobile_number = "Mobile number should be an integer.";
    }
  // Validate mobile number (exactly 10 digits, must be an integer)
  if (!/^\d{10}$/.test(customerData.mobile_number)) {
    newErrors.mobile_number = "Mobile number should be exactly 10 digits.";
  }

    // Validate total amount (minimum 1000)
    if (parseFloat(customerData.total_amount) < 1000) {
      newErrors.total_amount = "Total amount should be at least 1000.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return; // Stop submission if validation fails
    }

    try {
      const response = await fetch("http://localhost:5000/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...customerData,
          scheme_id: schemeId, // Include the scheme ID when submitting
        }),
      });

      if (!response.ok) {
        throw new Error("Error adding customer");
      }

      const result = await response.json();
      console.log("Customer added:", result);

      // Set success message
      setSuccessMessage("Customer added successfully!");

      // Clear the form after submission
      setCustomerData({
        customer_name: "",
        address: "",
        bank_name: "",
        account_number: "",
        ifsc_code: "",
        branch: "",
        aadhar_number: "",
        mobile_number: "",
        start_date: "",
        total_amount: "",
      });
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Customer Name:</label>
      <input
        type="text"
        name="customer_name"
        value={customerData.customer_name}
        onChange={handleChange}
        required
      />
      {errors.customer_name && <p className="error-message">{errors.customer_name}</p>}

      <label>Address:</label>
      <input
        type="text"
        name="address"
        value={customerData.address}
        onChange={handleChange}
        required
      />

      <label>Bank Name:</label>
      <input
        type="text"
        name="bank_name"
        value={customerData.bank_name}
        onChange={handleChange}
        required
      />
      {errors.bank_name && <p className="error-message">{errors.bank_name}</p>}

      <label>Account Number:</label>
      <input
        type="text"
        name="account_number"
        value={customerData.account_number}
        onChange={handleChange}
        required
      />
      {errors.account_number && <p className="error-message">{errors.account_number}</p>}

      <label>IFSC Code:</label>
      <input
        type="text"
        name="ifsc_code"
        value={customerData.ifsc_code}
        onChange={handleChange}
        required
      />

      <label>Branch:</label>
      <input
        type="text"
        name="branch"
        value={customerData.branch}
        onChange={handleChange}
        required
      />

      <label>Aadhar Number:</label>
      <input
        type="text"
        name="aadhar_number"
        value={customerData.aadhar_number}
        onChange={handleChange}
        required
      />
      {errors.aadhar_number && <p className="error-message">{errors.aadhar_number}</p>}

      <label>Mobile Number:</label>
      <input
        type="text"
        name="mobile_number"
        value={customerData.mobile_number}
        onChange={handleChange}
        required
      />
      {errors.mobile_number && <p className="error-message">{errors.mobile_number}</p>}

      {/* New Start Date Input */}
      <label>Start Date:</label>
      <input
        type="date"
        name="start_date"
        value={customerData.start_date}
        onChange={handleChange}
        required
      />

      {/* New Total Amount Input */}
      <label>Total Amount:</label>
      <input
        type="number"
        name="total_amount"
        value={customerData.total_amount}
        onChange={handleChange}
        required
      />
      {errors.total_amount && <p className="error-message">{errors.total_amount}</p>}

      <button type="submit">Add Customer</button>

      {/* Success message */}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </form>
  );
};

export default CustomerForm;
