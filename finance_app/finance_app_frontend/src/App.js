import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddScheme from "./components/SchemeForm/AddScheme";
import ViewSchemes from "./components/SchemeForm/ViewSchemes";
import ViewFunds from "./components/FundsForm/ViewFunds";
import SchemePage from "./components/SchemeForm/SchemePage";
import FundsForm from "./components/FundsForm/AddFunds";
import Home from "./components/HomePage/Home"; // Import Home component
import "./App.css";
import CustomerForm from "./components/Customer/CustomerForm";
import ViewCustomers from "./components/Customer/ViewCustomers";
import AddMember from "./components/SchemeForm/AddMember";
import AddMemberForm from "./components/SchemeForm/AddMemberForm";
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
          <Route path="/customer-form" element={<CustomerForm />} />
          <Route path="/view-customers" element={<ViewCustomers />} />
          <Route path="/scheme/:schemeId/add-member" element={<AddMember />} /> {/* Add route for AddMember */}
          <Route path="/scheme/:schemeId/add-member" element={<AddMemberForm />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
