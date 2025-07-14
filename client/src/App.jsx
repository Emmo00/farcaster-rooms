import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { pages } from "./routes";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {pages.map((page) => (
          <Route path={page.path} Component={page.component} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
