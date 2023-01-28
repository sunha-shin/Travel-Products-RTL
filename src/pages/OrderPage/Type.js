import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import Products from "./Products.js";
import Options from "./Options.js";
import ErrorBanner from "../../components/ErrorBanner.js";
import {OrderContext} from '../../contexts/OrderContext.js'

function Type({orderType}) {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(false);

    const [orderDatas, updateItemCount] = useContext(OrderContext)

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

    if (error) {
        return <ErrorBanner message='Error'/>
    }

    const ItemComponents = (orderType === "products" ? Products : Options);

    const optionsItems = items.map((item) => (
        <ItemComponents
            key={item.name}
            name={item.name}
            imagePath={item.imagePath}
            updateItemCount={(itemName, newItemCount) =>
                updateItemCount(itemName, newItemCount, orderType)}
        />
    ));

    let orderTypeTitle = orderType === 'products' ? 'Products' : 'Options'

    return (
        <>
            <h2>Travel Products</h2>
            <p>Price</p>
            <p>{orderTypeTitle} Total: {orderDatas.totals[orderType]}</p>
            <div
                style={{
                    display: 'flex',
                    flexDirection: orderType === "options" && "column"
                }}
            >
                {optionsItems}
            </div>
        </>
    );
}

export default Type;
