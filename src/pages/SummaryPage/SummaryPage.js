import React, {useContext, useState} from 'react'
import {OrderContext} from "../../contexts/OrderContext.js";

const SummaryPage = ({setStep}) => {
    const [orderDatas] = useContext(OrderContext);
    const [checked, setChecked] = useState(false);

    const productsArray = Array.from(orderDatas.products);
    const productList = productsArray.map(([key, value]) => (
        <li key={key}>
            {value} {key}
        </li>
    ));

    const hasOptions = orderDatas.options.size > 0;
    let optionsRender = null;

    if (hasOptions) {
        const optionsArray = Array.from(orderDatas.options.keys());
        const optionList = optionsArray.map((key) => <li key={key}>{key}</li>);
        optionsRender = (
            <>
                <h2>Options: {orderDatas.totals.options}</h2>
                <ul>{optionList}</ul>
            </>
        )}

    const handleSubmit = (event) => {
        event.preventDefault();
        setStep(2)
    }

    return (
        <div>
            <h1>Order Confirmation</h1>
            <h2>Travel Products: {orderDatas.totals.products}</h2>
            <ul>{productList}</ul>
            {optionsRender}
            <form onSubmit={handleSubmit}>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                    id='confirm-checkbox'
                />
                <label htmlFor='confirm-checkbox'>I want to confirm this order</label>
                <br/>
                <button disabled={!checked} type='submit'>
                    Confirm Order
                </button>
            </form>
        </div>
    )
}

export default SummaryPage;