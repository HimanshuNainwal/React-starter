import React from "react";

import { Routes, Route } from "react-router-dom";
import Hompage from "./Pages/Hompage";
import CategoryPage from "./Pages/CategoryPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Product from "./Pages/Product";




function App() {
  return (
    <>
      <Header />

      <div className="min-h-screen mt-6">

      <Routes>
        <Route path="/" element={<Hompage />} />
        {/* <Route path="/category/new-arrivals.html" element={<CategoryPage />} /> */}
        <Route path="/category/:category" element={<CategoryPage />} />

        
        <Route path="/product" element={<Product/>} />

        {/* all */}
        <Route path="*" element={<p>Page Not Found</p>}  />
      </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
