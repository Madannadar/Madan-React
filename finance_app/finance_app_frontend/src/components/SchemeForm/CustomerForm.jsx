import React, { useState } from "react";
import "./CustomerForm.css"; // Import the CSS file

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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({
      ...customerData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      <label>Account Number:</label>
      <input
        type="text"
        name="account_number"
        value={customerData.account_number}
        onChange={handleChange}
        required
      />

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

      <label>Mobile Number:</label>
      <input
        type="text"
        name="mobile_number"
        value={customerData.mobile_number}
        onChange={handleChange}
        required
      />

      <button type="submit">Add Customer</button>
    </form>
  );
};

export default CustomerForm;
