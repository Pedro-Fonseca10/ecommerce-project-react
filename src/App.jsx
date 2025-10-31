import { Route, Routes } from "react-router-dom";

import "./App.css";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/orders" element={<div>Orders page coming soon</div>} />
      <Route path="/checkout" element={<div>Test Checkout Page</div>} />
    </Routes>
  );
}

export default App;
