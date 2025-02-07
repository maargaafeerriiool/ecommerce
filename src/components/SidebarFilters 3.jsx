import React, { useState } from "react";
import { Box, Typography, Slider, FormGroup, FormControlLabel, Checkbox } from "@mui/material";

const SidebarFilters = ({ onFilterChange, categories }) => {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    onFilterChange({ priceRange: newValue, selectedCategories });
  };

  const handleCategoryChange = (event) => {
    const category = event.target.name;
    const isChecked = event.target.checked;
    let updatedCategories = [];

    if (isChecked) {
      updatedCategories = [...selectedCategories, category];
    } else {
      updatedCategories = selectedCategories.filter((cat) => cat !== category);
    }

    setSelectedCategories(updatedCategories);
    onFilterChange({ priceRange, selectedCategories: updatedCategories });
  };

  return (
    <Box sx={{ width: { xs: "100%", md: "250px" }, padding: "10px" }}>
      <Typography variant="h6" sx={{ marginBottom: "10px" }}>
        Filtra per Preu
      </Typography>
      <Slider
        value={priceRange}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        min={0}
        max={500}
        sx={{ width: "100%" }}
      />

      <Typography variant="h6" sx={{ marginTop: "20px", marginBottom: "10px" }}>
        Filtra per Categoria
      </Typography>
      <FormGroup>
        {categories.map((category) => (
          <FormControlLabel
            key={category}
            control={
              <Checkbox
                name={category}
                checked={selectedCategories.includes(category)}
                onChange={handleCategoryChange}
              />
            }
            label={category}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default SidebarFilters;
