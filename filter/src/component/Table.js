// src/Table.js
import React, { useState } from "react";

const Table = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCity, setFilterCity] = useState("");

  const data = [
    { id: 1, name: "Rahul Sharma", age: 28, city: "Mumbai" },
    { id: 2, name: "Priya Singh", age: 34, city: "Delhi" },
    { id: 3, name: "Amit Kumar", age: 45, city: "Bangalore" },
    { id: 4, name: "Sneha Roy", age: 22, city: "Kolkata" },
  ];

  // Extracting unique city names
  const uniqueCities = [...new Set(data.map((item) => item.city))];

  const filteredData = data.filter(
    (item) =>
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.city.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterCity === "" || item.city === filterCity)
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name or city"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        value={filterCity}
        onChange={(e) => setFilterCity(e.target.value)}
      >
        <option value="">All Cities</option>
        {uniqueCities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.city}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No results found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;