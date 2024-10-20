import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ViewSchemes from "./components/SchemeForm/ViewSchemes";
import ViewFunds from "./components/FundsForm/ViewFunds";
import FundsForm from "./components/FundsForm/AddFunds";
import Home from "./components/HomePage/Home";
import CustomerForm from "./components/Customer/CustomerForm";
import ViewCustomers from "./components/Customer/ViewCustomers";
import SchemeForm from "./components/SchemeForm/SchemeForm";
// import SchemePage from "./components/SchemeForm/SchemeForm";
// import AddScheme from "./components/SchemeForm/AddScheme";
// import AddMember from "./components/SchemeForm/AddMember";
// import AddMemberForm from "./components/SchemeForm/AddMemberForm";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scheme" element={<SchemeForm />} />
          <Route path="/fund" element={<FundsForm />} />
          <Route path="/customer-form" element={<CustomerForm />} />
          <Route path="/view-schemes" element={<ViewSchemes />} /> 
          <Route path="/view-funds" element={<ViewFunds />} /> 
          <Route path="/view-customers" element={<ViewCustomers />} />
          {/* <Route path="/scheme/add" element={<AddScheme />} /> */}
          {/* <Route path="/scheme/:schemeId/add-member" element={<AddMember />} /> Add route for AddMember */}
          {/* <Route path="/scheme/:schemeId/add-member" element={<AddMemberForm />} /> */}
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
