import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Meme from "./Screens/Meme";

const App = () => {
  return (
    <React.StrictMode>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Meme />} />
        </Routes>
      </HashRouter>
    </React.StrictMode>
  );
};

export default App;