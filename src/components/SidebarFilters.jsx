import React, { useState } from "react";
import { Slider, Checkbox, FormControlLabel, FormGroup } from "@mui/material";

const SidebarFilters = ({ onFilterChange, categories }) => {
  // Estado para el rango de precios
  const [priceRange, setPriceRange] = useState([0, 3000]);

  // Estado para las categorías seleccionadas
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Manejar cambio en el slider de precio
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    onFilterChange({ priceRange: newValue, selectedCategories });
  };

  // Manejar cambio en los checkboxes
  const handleCategoryChange = (event) => {
    const category = event.target.name;
    let updatedCategories = [...selectedCategories];

    if (event.target.checked) {
      updatedCategories.push(category);
    } else {
      updatedCategories = updatedCategories.filter((cat) => cat !== category);
    }

    setSelectedCategories(updatedCategories);
    onFilterChange({ priceRange, selectedCategories: updatedCategories });
  };

  return (
    <div style={{ padding: "20px", width: "250px", borderRight: "1px solid #ccc" }}>
      <h3>Filtra per Preu</h3>
      <Slider
        value={priceRange}
        onChange={handlePriceChange}
        min={0}
        max={3000}
        valueLabelDisplay="auto"
      />
      <p>Rang seleccionat: {priceRange[0]}€ - {priceRange[1]}€</p>

      <h3>Filtra per Categoria</h3>
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
    </div>
  );
};

export default SidebarFilters;
