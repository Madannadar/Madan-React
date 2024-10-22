import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./ViewScheme.css";
import CustomerForm from "./CustomerForm"; // Import the form here

const ViewSchemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [selectedSchemeId, setSelectedSchemeId] = useState(null); // State to track clicked "Add Member" button
  const [showForm, setShowForm] = useState(false); // Toggle form visibility

  useEffect(() => {
    // Fetch schemes from the server
    const fetchSchemes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/schemes");
        const data = await response.json();
        setSchemes(data);
      } catch (error) {
        console.error("Error fetching schemes:", error);
      }
    };

    fetchSchemes();
  }, []);

  const handleAddMember = (schemeId) => {
    setSelectedSchemeId(schemeId); // Set the selected scheme ID
    setShowForm(true); // Show the customer form when "Add Member" is clicked
  };

  return (
    <div className="table-container">
      <h2>Available Schemes</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Scheme Name</th>
            <th>Total Amount</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Payment Frequency</th>
            <th>Refundable</th>
            <th>Refund Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {schemes.map((scheme) => (
            <tr key={scheme.scheme_id}>
              <td>{scheme.schemename}</td>
              <td>{scheme.totalamount}</td>
              <td>{new Date(scheme.startdate).toLocaleDateString()}</td>
              <td>{new Date(scheme.enddate).toLocaleDateString()}</td>
              <td>{scheme.paymentfrequency === "monthly" ? "Monthly" : "Yearly"}</td>
              <td>{scheme.isrefundable ? "Yes" : "No"}</td>
              <td>{scheme.refundamount}</td>
              <td>
                <button
                  onClick={() => handleAddMember(scheme.scheme_id)}
                  className="add-member-btn"
                >
                  Add Member
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="form-container">
          <h3>Add Customer to Scheme {selectedSchemeId}</h3>
          {/* Render the CustomerForm and pass the schemeId */}
          <CustomerForm schemeId={selectedSchemeId} />
        </div>
      )}
    </div>
  );
};

export default ViewSchemes;
