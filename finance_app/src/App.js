import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SchemeForm from "./components/SchemeForm/SchemeForm";
import FundsForm from "./components/FundsForm/FundsForm";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Finance Scheme & Funds Automation</h1>
        </header>

        <nav className="App-nav">
          <ul>
            <li>
              <Link to="/scheme">Add Scheme</Link>
            </li>
            <li>
              <Link to="/fund">Add Fund</Link>
            </li>
          </ul>
        </nav>

        <main className="App-content">
          <Routes>
            <Route path="/scheme" element={<SchemeForm/>} />
            <Route path="/fund" element={<FundsForm/>} />
          </Routes>
        </main>

        <footer className="App-footer">
          <p>&copy; 2024 Finance Automation | All Rights Reserved</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
