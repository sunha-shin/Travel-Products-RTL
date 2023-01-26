import React, { useEffect, useState } from "react";
import axios from "axios";
import Products from "./Products.js";

function Type({ orderType }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadItems(orderType);
  }, [orderType]);

  const loadItems = async (orderType) => {
    try {
      let response = await axios.get(`http://localhost:5000/${orderType}`);
      setItems(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  const ItemComponents = (orderType === "products" ? Products : null);

  const optionsItems = items.map((item) => (
    <ItemComponents
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <div>{optionsItems}</div>;
}

export default Type;
