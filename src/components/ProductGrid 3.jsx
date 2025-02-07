import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import SidebarFilters from "./SidebarFilters"; 
import { fetchProducts } from "../services/productService";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: [0, 500],
    selectedCategories: [],
  });

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setFilteredProducts(data);

      // Extraer categorías únicas
      const uniqueCategories = [...new Set(data.map((product) => product.category))];
      setCategories(uniqueCategories);

      setLoading(false);
    };
    loadProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1] &&
        (filters.selectedCategories.length === 0 || filters.selectedCategories.includes(product.category))
    );
    setFilteredProducts(filtered);
  }, [filters, products]);

  const handleFilterChange = ({ priceRange, selectedCategories }) => {
    setFilters({ priceRange, selectedCategories });
  };

  if (loading) {
    return <Typography variant="h6">Cargando productos...</Typography>;
  }

  return (
    <Box sx={{ padding: "20px", display: "flex", flexDirection: { xs: "column", md: "row" } }}>
      <SidebarFilters onFilterChange={handleFilterChange} categories={categories} />

      <Box sx={{ flex: 1, paddingLeft: { md: "20px" } }}>
        <Typography variant="h4" sx={{ marginBottom: "20px", textAlign: "center" }}>
          Productos disponibles
        </Typography>
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia component="img" height="200" image={product.imageURL} alt={product.name} />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="h6" sx={{ marginTop: "10px" }}>
                    €{product.price}
                  </Typography>
                  <Button variant="contained" color="primary" sx={{ marginTop: "10px", width: "100%" }}>
                    Comprar ahora
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
