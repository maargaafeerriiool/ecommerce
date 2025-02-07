import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Badge,
  Button,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { Search, ShoppingCart, Person, Logout, Menu as MenuIcon } from "@mui/icons-material";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#232f3e" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        {/* Logo */}
        <Typography variant="h6" sx={{ fontWeight: "bold", flexGrow: 1 }}>
          MiTienda
        </Typography>

        {/* Search Bar (solo visible en pantallas grandes) */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: "5px",
            padding: "0 10px",
            width: "40%",
          }}
        >
          <Search sx={{ color: "#888" }} />
          <InputBase placeholder="Buscar productos" sx={{ marginLeft: "10px", flex: 1, fontSize: "14px" }} />
        </Box>

        {/* Iconos y Botón de Menú en móviles */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Menú hamburguesa para móviles */}
          <IconButton sx={{ display: { xs: "block", md: "none" } }} onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>

          {/* Carrito */}
          <IconButton color="inherit">
            <Badge badgeContent={2} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>

          {/* Perfil */}
          <IconButton color="inherit">
            <Person />
          </IconButton>

          {/* Botón de Cerrar Sesión (solo visible en pantallas grandes) */}
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Logout />}
            onClick={handleLogout}
            sx={{
              backgroundColor: "#f44336",
              color: "#fff",
              display: { xs: "none", md: "flex" },
            }}
          >
            Salir
          </Button>
        </Box>

        {/* Menú desplegable en móviles */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleLogout}>
            <Logout sx={{ marginRight: "10px" }} />
            Cerrar sesión
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
