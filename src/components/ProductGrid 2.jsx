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
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51QSgAiBNoAIrMHfdrqMMFCgqvBXCJ9ymEpmjB0u8QzZUfrkNRN3DU1FEtI5Pe63YEgz5T3FwmpOvHpuR9hzGn0op00jZoKkROE");

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);

      // Extrae categorías únicas
      const uniqueCategories = [...new Set(data.map((product) => product.category))];
      setCategories(uniqueCategories);
    };
    loadProducts();
  }, []);

  const handleFilterChange = ({ priceRange, selectedCategories }) => {
    setPriceRange(priceRange);
    setSelectedCategories(selectedCategories);

    const filtered = products.filter(
      (product) =>
        product.price >= priceRange[0] &&
        product.price <= priceRange[1] &&
        (selectedCategories.length === 0 || selectedCategories.includes(product.category))
    );

    setProducts(filtered);
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
      {/* Barra lateral con filtros */}
      <SidebarFilters onFilterChange={handleFilterChange} categories={categories} />

      {/* Contenedor de productos */}
      <Box sx={{ flex: 1, paddingLeft: "20px" }}>
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          Productos disponibles
        </Typography>

        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.imageURL}
                  alt={product.name}
                  sx={{
                    objectFit: "cover",
                  }}
                />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="h6" sx={{ marginTop: "10px" }}>
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
