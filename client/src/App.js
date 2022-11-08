import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Homepage from "./pages/Homepage";
import ConservationStatus from "./pages/ConservationStatus";
import "@coreui/coreui/dist/css/coreui.min.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/homepage" element={<Homepage />} />
        {/* <Route path="/search/animals" element={<SearchAnimals />} />
        <Route path="/search/users" element={<SearchUsers />} /> */}
        <Route path="/conservation_status" element={<ConservationStatus />} />
      </Routes>
    </>
  );
}

export default App;
