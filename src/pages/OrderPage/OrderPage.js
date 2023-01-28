import React, {useContext} from 'react';
import Type from "./Type.js";
import {OrderContext} from "../../contexts/OrderContext.js";

const OrderPage = () => {
    const [orderDatas] = useContext(OrderContext);
    return (
        <div>
            <h1>Travel Products</h1>
            <div>
                <Type orderType={"products"}/>
            </div>
            <div style={{display: "flex", marginTop: 20}}>
                <div style={{width: "50%"}}>
                    <Type orderType={"options"}/>
                </div>
                <div>
                    <h2>Total Price: {orderDatas.totals.total}</h2><br/>
                    <button>Order</button>
                </div>

            </div>
        </div>
    );
};

export default OrderPage;