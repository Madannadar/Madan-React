// src/components/CustomerForm/ViewCustomers.jsx

import React, { useEffect, useState } from "react";

const ViewCustomers = () => {
  const [customers, setCustomers] = useState([]);

  // Fetch customers from the backend
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/customers");
        if (response.ok) {
          const data = await response.json();
          setCustomers(data); // Set the customers data
        } else {
          console.error("Failed to fetch customers");
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="customer-list">
      <h2>Customer List</h2>
      <table>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Bank Name</th>
            <th>Account Number</th>
            <th>IFSC Code</th>
            <th>Branch</th>
            <th>Aadhar Number</th>
            <th>Mobile Number</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.customer_id}>
              <td>{customer.customer_id}</td>
              <td>{customer.customer_name}</td>
              <td>{customer.address}</td>
              <td>{customer.bank_name}</td>
              <td>{customer.account_number}</td>
              <td>{customer.ifsc_code}</td>
              <td>{customer.branch}</td>
              <td>{customer.aadhar_number}</td>
              <td>{customer.mobile_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewCustomers;
