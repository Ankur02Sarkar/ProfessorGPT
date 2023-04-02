import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./LandingPage";
import Professor from "./Professor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/ask" element={<Professor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
