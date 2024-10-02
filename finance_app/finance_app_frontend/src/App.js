import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SchemeForm from "./components/SchemeForm/SchemeForm";
import FundsForm from "./components/FundsForm/FundsForm";
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
          <Route path="/scheme" element={<SchemeForm />} />
          <Route path="/fund" element={<FundsForm />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/customer-details" element={<CustomerDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
