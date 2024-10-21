import React, { useEffect, useState } from "react";

const ViewCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Single search input
  const [sortOrder, setSortOrder] = useState("asc"); // Sorting state (asc or desc)

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

  // Handle sorting change between ascending and descending order
  const handleSort = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  // Filter customers based on the single search term for all fields
  const filteredCustomers = customers
    .filter(
      (customer) =>
        customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.bank_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.aadhar_number.includes(searchTerm) || // No need to convert to lowercase for numbers
        customer.mobile_number.includes(searchTerm) // No need to convert to lowercase for numbers
    )
    // Sort customers based on the customer_name and sortOrder
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.customer_name.toLowerCase() > b.customer_name.toLowerCase() ? 1 : -1;
      } else {
        return a.customer_name.toLowerCase() < b.customer_name.toLowerCase() ? 1 : -1;
      }
    });

  return (
    <div className="customers-container">
      <h2>Customer List</h2>

      {/* Single search box */}
      <input
        type="text"
        placeholder="Search by any field (name, bank, branch, Aadhar, mobile)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* Sort button */}
      <button onClick={handleSort}>
        Sort {sortOrder === "asc" ? "A to Z" : "Z to A"}
      </button>

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
