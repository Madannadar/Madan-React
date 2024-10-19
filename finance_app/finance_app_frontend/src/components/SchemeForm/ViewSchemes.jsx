import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewScheme.css";

const ViewSchemes = () => {
  const [schemes, setSchemes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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
    navigate(`/scheme/${schemeId}/add-member`); // Make sure this route matches what you set up in your router
  };

  return (
    <div className="table-container">
      <h2>Available Schemes</h2>
      <table>
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
    </div>
  );
};

export default ViewSchemes;
