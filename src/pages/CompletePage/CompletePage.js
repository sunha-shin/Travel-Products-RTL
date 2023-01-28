import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {OrderContext} from "../../contexts/OrderContext.js";
import ErrorBanner from "../../components/ErrorBanner.js";

const CompletePage = ({setStep}) => {
        const [orderDatas] = useContext(OrderContext);
        const [orderHistory, setOrderHistory] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(false);

        useEffect(() => {
            orderCompleted(orderDatas);
        }, [])

        const orderCompleted = async (orderDatas) => {
            try {
                let response = await axios.post(
                    'http://localhost:5000/order', orderDatas);
                setOrderHistory(response.data);
                setLoading(false);
            } catch (error) {
                setError(true);
            }
        };

        if (error) {
            return <ErrorBanner message={"Error!"}/>
        }

        const orderTable = orderHistory.map((item) => (
            <tr key={item.orderNumber}>
                <td>{item.orderNumber}</td>
                <td>{item.price}</td>
            </tr>
        ));

        if (loading) {
            return <div>loading</div>;
        } else {
            return (
                <div style={{textAlign: "center"}}>
                    <h2>Order Completed</h2>
                    <h3>My Order</h3><br/>
                    <table style={{margin: "auto"}}>
                        <tbody>
                        <tr>
                            <th>Order#</th>
                            <th>Price</th>
                        </tr>
                        {orderTable}
                        </tbody>
                    </table>
                    <button>Go to Products</button>
                    <br/>
                    <button onClick={() => setStep(0)}>Go to Products page</button>
                </div>
            )
        }
    }
;

export default CompletePage;