import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth"; // Detectar cambios de sesión
import { auth } from "./firebaseConfig"; // Importamos la autenticación de Firebase
import Navbar from "./components/Navbar";
import ProductGrid from "./components/ProductGrid";
import Footer from "./components/Footer";
import ProductDetails from "./components/ProductDetails";
import Authentication from "./components/Authentication"; // Importa la pantalla de Login
import { Box, CssBaseline } from "@mui/material";

const Success = () => <h1>Pagament completat!</h1>;
const Cancel = () => <h1>El pagament s'ha cancel·lat.</h1>;

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un usuario autenticado en Firebase
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup para evitar fugas de memoria
  }, []);

  if (loading) {
    return <h2>Cargando...</h2>; // Evita el parpadeo cuando Firebase carga la sesión
  }

  return (
    <Router>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <CssBaseline />
        <Navbar />

        <Routes>
          {/* Protegemos las rutas: si no hay usuario, lo redirige a /login */}
          <Route path="/" element={user ? <ProductGrid /> : <Navigate to="/login" />} />
          <Route path="/product/:id" element={user ? <ProductDetails /> : <Navigate to="/login" />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/login" element={<Authentication />} />
        </Routes>

        <Footer />
      </Box>
    </Router>
  );
};

export default App;
