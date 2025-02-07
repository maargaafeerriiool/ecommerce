import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Badge,
  Button,
} from "@mui/material";
import { Search, ShoppingCart, Person, Logout } from "@mui/icons-material";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login"); // Redirigir a login después de cerrar sesión
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "#232f3e" }}>
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Typography variant="h6" style={{ fontWeight: "bold" }}>
          LA MEVA TENDA APPLE
        </Typography>

        {/* Search Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: "5px",
            padding: "0 10px",
            width: "40%",
          }}
        >
          <Search style={{ color: "#888" }} />
          <InputBase
            placeholder="Cercar productes"
            style={{
              marginLeft: "10px",
              flex: 1,
              fontSize: "14px",
            }}
          />
        </div>

        {/* Icons & Logout Button */}
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <IconButton color="inherit">
            <Badge badgeContent={2} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <Person />
          </IconButton>

          {/* Botón de Cerrar Sesión */}
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Logout />}
            onClick={handleLogout}
            style={{ backgroundColor: "#ff00ff", color: "white" }}
          >
            TANCAR SESSIÓ
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
