import React, { useState, useEffect } from "react";
import { Slider, FormControlLabel, Checkbox, Box, Typography } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Assegura't que la ruta sigui correcta

const SidebarFilters = ({ setFilteredProducts }) => {
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList = querySnapshot.docs.map(doc => doc.data());
      setProducts(productList);

      // Obtenir categories úniques
      const uniqueCategories = [...new Set(productList.map(product => product.category))];
      setCategories(uniqueCategories);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product => 
      product.price >= priceRange[0] && 
      product.price <= priceRange[1] &&
      (selectedCategories.length === 0 || selectedCategories.includes(product.category))
    );
    setFilteredProducts(filtered);
  }, [priceRange, selectedCategories, products, setFilteredProducts]);

  return (
    <Box sx={{ padding: 2, width: 250 }}>
      <Typography variant="h6">Filtrar per preu</Typography>
      <Slider
        value={priceRange}
        onChange={(event, newValue) => setPriceRange(newValue)}
        valueLabelDisplay="auto"
        min={0}
        max={1000}
      />

      <Typography variant="h6">Filtrar per categoria</Typography>
      {categories.map(category => (
        <FormControlLabel
          key={category}
          control={<Checkbox 
            checked={selectedCategories.includes(category)} 
            onChange={() => setSelectedCategories(prev =>
              prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
            )}
          />}
          label={category}
        />
      ))}
    </Box>
  );
};

export default SidebarFilters;