import {createContext, useEffect, useMemo, useState} from "react";

export const OrderContext = createContext();

const pricePerItem = {
    products: 1000,
    options: 500
}

function calculateSubtotal(orderType, orderCounts) {
    let optionCount = 0;
    for (const count of orderCounts[orderType].values()) {
        console.log(orderCounts[orderType])
        optionCount += count;
    }

    return optionCount * pricePerItem[orderType];
}

export function OrderContextProvider(props) {

    // price for each order - products, options
    const [orderCounts, setOrderCounts] = useState({
        products: new Map(),
        options: new Map()
    });

    // total price
    const [totals, setTotals] = useState({
        products: 0,
        options: 0,
        total: 0
    })

    useEffect(() => {
        const productsTotal = calculateSubtotal('products', orderCounts);
        const optionsTotal = calculateSubtotal('options', orderCounts);
        const total = productsTotal + optionsTotal;
        setTotals({
            products: productsTotal,
            options: optionsTotal,
            total
        });
    }, [orderCounts])

    const value = useMemo(() => {
        function updateItemCount(itemName, newItemCount, orderType) {
            // copy state (orderCounts)
            const newOrderCounts = {...orderCounts};

            // select & update products or options
            const orderCountsMap = orderCounts[orderType];
            orderCountsMap.set(itemName, parseInt(newItemCount));

            setOrderCounts(newOrderCounts)
        }

        return [{...orderCounts, totals}, updateItemCount]
    }, [orderCounts, totals]) // only re-rendering when dependencies are changed

    return <OrderContext.Provider value={value} {...props}/>
}
