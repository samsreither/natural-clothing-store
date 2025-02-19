import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/navbar";
import { AuthPage } from "./pages/auth";
import { ShopPage } from "./pages/shop";
import { CheckoutPage } from "./pages/checkout";
import { ShopContextProvider } from "./context/shop-context";

function App() {
  return (
    <div className="App">
      <Router>
        <ShopContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<ShopPage />}></Route>
            <Route path="/auth" element={<AuthPage />}></Route>
            <Route path="/checkout" element={<CheckoutPage />}></Route>
            <Route path="/purchased-items"></Route>
          </Routes>
        </ShopContextProvider>
      </Router>
    </div>
  );
}

export default App;
