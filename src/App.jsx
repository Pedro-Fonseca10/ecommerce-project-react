import { Route, Routes } from "react-router-dom";

import "./App.css";
import { HomePage } from "./pages/HomePage";
import { CheckoutPage } from "./pages/ChecktouPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/orders" element={<div>Orders page coming soon</div>} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  );
}

export default App;
