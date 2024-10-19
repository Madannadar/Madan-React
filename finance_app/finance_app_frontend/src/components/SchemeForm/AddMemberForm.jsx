// src/components/MemberForm/AddMemberForm.jsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AddMemberForm = () => {
  const { schemeId } = useParams(); // Get the scheme ID from the URL
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [investmentData, setInvestmentData] = useState({
    startDate: "",
    endDate: "",
    totalAmount: ""
  });

  // Fetch customers from the database when the component mounts
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/customers");
        if (response.ok) {
          const data = await response.json();
          setCustomers(data);
        } else {
          console.error("Failed to fetch customers");
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/schemes/add-member", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          schemeId,
          customerId: selectedCustomer,
          ...investmentData
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error details:", errorData.details);
        throw new Error("Error adding member");
      }

      const result = await response.json();
      console.log("Member added:", result);
      navigate("/view-schemes"); // Navigate back to the schemes page after adding member
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Member to Scheme {schemeId}</h2>

      {/* Dropdown to select customer */}
      <label>Customer:</label>
      <select
        name="customer"
        value={selectedCustomer}
        onChange={(e) => setSelectedCustomer(e.target.value)}
        required
      >
        <option value="">Select a customer</option>
        {customers.map((customer) => (
          <option key={customer.customer_id} value={customer.customer_id}>
            {customer.customer_name}
          </option>
        ))}
      </select>

      {/* Input for start date */}
      <label>Start Date:</label>
      <input
        type="date"
        name="startDate"
        value={investmentData.startDate}
        onChange={(e) => setInvestmentData({ ...investmentData, startDate: e.target.value })}
        required
      />

      {/* Input for end date */}
      <label>End Date:</label>
      <input
        type="date"
        name="endDate"
        value={investmentData.endDate}
        onChange={(e) => setInvestmentData({ ...investmentData, endDate: e.target.value })}
        required
      />

      {/* Input for total amount to invest */}
      <label>Total Amount:</label>
      <input
        type="number"
        name="totalAmount"
        value={investmentData.totalAmount}
        onChange={(e) => setInvestmentData({ ...investmentData, totalAmount: e.target.value })}
        required
      />

      <button type="submit">Add Member</button>
    </form>
  );
};

export default AddMemberForm;
