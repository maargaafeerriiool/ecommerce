import React, { useState } from "react";
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

const Navbar = ({ onSearch, cartItemCount }) => { // Recibe cartItemCount como prop
  const auth = getAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    if (onSearch) {
      onSearch(event.target.value);
    }
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "#232f3e" }}>
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" style={{ fontWeight: "bold", color: "#ff1493" }}>
          LA MEVA TENDA APPLE
        </Typography>

        <div style={{ display: "flex", alignItems: "center", backgroundColor: "#fff", borderRadius: "5px", padding: "0 10px", width: "40%" }}>
          <Search style={{ color: "#888" }} />
          <InputBase
            placeholder="Cercar productes"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ marginLeft: "10px", flex: 1, fontSize: "14px" }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <IconButton color="inherit" onClick={() => navigate("/cart")}>
            <Badge badgeContent={cartItemCount} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <Person />
          </IconButton>

          <Button
            variant="contained"
            color="secondary"
            startIcon={<Logout />}
            onClick={handleLogout}
            style={{ backgroundColor: "#ff1493", color: "white" }}
          >
            INICIAR SESSIÓ
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;