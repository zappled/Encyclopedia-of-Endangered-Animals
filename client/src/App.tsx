import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Homepage from "./pages/Homepage";
import ConservationStatus from "./pages/ConservationStatus";
import SearchAnimals from "./pages/SearchAnimals";
import EditDatabase from "./pages/EditDatabase";
import AnimalData from "./pages/AnimalData";
import "@coreui/coreui/dist/css/coreui.min.css";
import SearchAnimalResults from "./pages/SearchAnimalResults";
import Settings from "./pages/Settings";
import Context from "./context/context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState("");
  return (
    <Context.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        username,
        setUsername,
        isAdmin,
        setIsAdmin,
        userId,
        setUserId,
      }}
    >
      <>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/search/animals" element={<SearchAnimals />} />
          {/* <Route path="/search/users" element={<SearchUsers />} /> */}
          <Route path="/conservation_status" element={<ConservationStatus />} />
          <Route path="/edit_database" element={<EditDatabase />} />
          <Route path="/edit_database/search" element={<AnimalData />} />
          <Route path="/search/animals/:id" element={<SearchAnimalResults />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </>
    </Context.Provider>
  );
}

export default App;
