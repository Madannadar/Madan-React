import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddScheme from "./components/SchemeForm/AddScheme";
import ViewSchemes from "./components/SchemeForm/ViewSchemes";
import ViewFunds from "./components/FundsForm/ViewFunds";
import SchemePage from "./components/SchemeForm/SchemePage";
import FundsForm from "./components/FundsForm/AddFunds";
import Home from "./components/HomePage/Home"; // Import Home component
import Payment from "./components/HomePage/Payment"; // Import Payment component
import CustomerDetails from "./components/HomePage/CustomerDetails"; // Import Customer Details component
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scheme" element={<SchemePage />} />
          <Route path="/scheme/add" element={<AddScheme />} />
          <Route path="/view-schemes" element={<ViewSchemes />} /> {/* Add this route */}
          {/* Add other routes as needed */}
          <Route path="/view-funds" element={<ViewFunds />} /> {/* Add route for ViewFunds */}
        {/* Other routes */}
          <Route path="/fund" element={<FundsForm />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/customer-details" element={<CustomerDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
