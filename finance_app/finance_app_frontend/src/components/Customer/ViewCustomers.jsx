// src/components/ViewCustomers.jsx

import React, { useEffect, useState } from "react";

const ViewCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/customers");
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="customers-container">
      <h2>Customer List</h2>
      <input
        type="text"
        placeholder="Search by customer name"
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />
      <table>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Customer Name</th>
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
          {filteredCustomers.map((customer) => (
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
