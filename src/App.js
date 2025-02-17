import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import ProductGrid from "./components/ProductGrid";
import Footer from "./components/Footer";
import ProductDetails from "./components/ProductDetails";
import Authentication from "./components/Authentication";
import { Box, CssBaseline } from "@mui/material";

const Success = () => <h1>Pagament completat!</h1>;
const Cancel = () => <h1>El pagament s'ha cancel·lat.</h1>;

const App = () => {
  // Estat per la barra de cerca
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Router>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* CssBaseline assegura un estil consistent */}
        <CssBaseline />

        {/* Navbar, passant la funció de cerca */}
        <Navbar onSearch={setSearchTerm} />

        {/* Configuració de rutes */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <ProductGrid searchTerm={searchTerm} />
              </>
            }
          />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/login" element={<Authentication />} />
        </Routes>

        {/* Peu de pàgina */}
        <Footer />
      </Box>
    </Router>
  );
};

export default App;