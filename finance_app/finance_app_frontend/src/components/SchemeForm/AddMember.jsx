// src/components/MemberForm/AddMember.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AddMember = () => {
  const { schemeId } = useParams(); // Get the schemeId from the URL
  const [customers, setCustomers] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState({});
  const [newTable, setNewTable] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch customers from the server
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

  const handleCheckboxChange = (customerId) => {
    setSelectedCustomers((prevSelected) => ({
      ...prevSelected,
      [customerId]: !prevSelected[customerId],
    }));
  };

  const handleAddMembers = () => {
    const membersToAdd = customers.filter((customer) =>
      selectedCustomers[customer.customer_id]
    );

    // Create new members table by adding selected customers
    setNewTable((prevTable) => [
      ...prevTable,
      ...membersToAdd.map((customer) => ({
        ...customer,
        schemeId,
      })),
    ]);

    // Reset the selected customers
    setSelectedCustomers({});
  };

  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="add-member-form">
      <h2>Add Member to Scheme {schemeId}</h2>
      <h3>Select Customers to Add</h3>
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
            <th>Select</th>
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
              <td>
                <input
                  type="checkbox"
                  checked={selectedCustomers[customer.customer_id] || false}
                  onChange={() => handleCheckboxChange(customer.customer_id)}
                />
              </td>
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
      <button onClick={handleAddMembers}>Add Selected Members</button>

      {newTable.length > 0 && (
        <div>
          <h3>Members Added to Scheme {schemeId}</h3>
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
                <th>Scheme ID</th>
              </tr>
            </thead>
            <tbody>
              {newTable.map((member, index) => (
                <tr key={index}>
                  <td>{member.customer_id}</td>
                  <td>{member.customer_name}</td>
                  <td>{member.address}</td>
                  <td>{member.bank_name}</td>
                  <td>{member.account_number}</td>
                  <td>{member.ifsc_code}</td>
                  <td>{member.branch}</td>
                  <td>{member.aadhar_number}</td>
                  <td>{member.mobile_number}</td>
                  <td>{member.schemeId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AddMember;
