import React, { useEffect, useState } from "react";
import axios from "axios";
import Products from "./Products.js";
import Options from "./Options.js";
import ErrorBanner from "../../components/ErrorBanner.js";

function Type({ orderType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadItems(orderType);
  }, [orderType]);

  const loadItems = async (orderType) => {
    try {
      let response = await axios.get(`http://localhost:5000/${orderType}`);
      setItems(response.data)
    } catch (error) {
      setError(true);
    }
  };

  if(error) {
    return <ErrorBanner message='Error'/>
  }

  const ItemComponents = (orderType === "products" ? Products : Options);

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
