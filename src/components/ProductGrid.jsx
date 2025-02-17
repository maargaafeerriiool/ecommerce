import SidebarFilters from "./SidebarFilters";
import React, { useEffect, useState } from "react";
import { fetchProducts } from "../services/productService";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";

const ProductGrid = () => {
  const [allProducts, setAllProducts] = useState([]); // Tots els productes originals
  const [filteredProducts, setFilteredProducts] = useState([]); // Productes filtrats
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 3000]); // Valors inicials per defecte

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setAllProducts(data); // Desa tots els productes
      setFilteredProducts(data); // Inicialitza amb tots els productes visibles
      setLoading(false);

      // Calcula el rang de preus
      const prices = data.map((product) => product.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      setPriceRange([minPrice, maxPrice]);

      // Extrae categories úniques
      const uniqueCategories = [...new Set(data.map((product) => product.category))];
      setCategories(uniqueCategories);
    };

    loadProducts();
  }, []);

  const handleFilterChange = ({ priceRange, selectedCategories }) => {
    setPriceRange(priceRange);

    const filtered = allProducts.filter(
      (product) =>
        product.price >= priceRange[0] &&
        product.price <= priceRange[1] &&
        (selectedCategories.length === 0 || selectedCategories.includes(product.category))
    );

    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", padding: "20px" }}>
      {/* Barra lateral amb filtres */}
      <SidebarFilters
        onFilterChange={handleFilterChange}
        categories={categories}
        initialPriceRange={priceRange} // Passa el rang inicial calculat
      />

      {/* Contenidor de productes */}
      <Box sx={{ flex: 1, paddingLeft: "20px" }}>
        <Typography variant="h4" sx={{ marginBottom: "20px", fontWeight: "bold" }}>
          PRODUCTES DISPONIBLES
        </Typography>

        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
             <Card>
            <Box
              sx={{
                height: "200px", // Altura fija para mantener consistencia
                overflow: "hidden", // Asegura que las imágenes no se salgan del contenedor
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f5f5f5", // Fondo para las imágenes que no llenan el espacio
              }}
            >
              <CardMedia
                component="img"
                image={product.imageURL || "/placeholder.jpg"} // Asegúrate de tener un placeholder si la imagen falta
                alt={product.name}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain", // Ajusta la imagen al espacio sin recortarla
                  backgroundColor: "#fff", // Fondo blanco para resaltar la imagen
                }}
              />
            </Box>
            <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    marginTop: "10px",
                    color: "#ff0000", // Color rojo para el precio
                    fontWeight: "bold", // Opción para que el precio resalte más
                  }}
                >
                  €{product.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: "10px", width: "100%" }}
                >
                  Comprar ara
                </Button>
              </CardContent>
          </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductGrid;