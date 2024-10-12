import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddScheme from "./components/SchemeForm/AddScheme";
import ViewSchemes from "./components/SchemeForm/ViewSchemes";
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
          <Route path="/scheme/view" element={<ViewSchemes />} />
          <Route path="/fund" element={<FundsForm />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/customer-details" element={<CustomerDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
