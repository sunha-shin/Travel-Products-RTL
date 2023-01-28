import {render, screen} from "@testing-library/react";
import App from "./App.js";
import userEvent from "@testing-library/user-event";

test('From order to oder completion', async () => {
    render(<App/>);

    // Order 2 America Products
    const americaInput = await screen.findByRole('spinbutton', {name: "America"})
    userEvent.clear(americaInput);
    userEvent.type(americaInput, "2");

    // Order 2 England Products
    const englandInput = await screen.findByRole('spinbutton', {name: "England"})
    userEvent.clear(englandInput);
    userEvent.type(englandInput, "3");

    // Order 1 Insurance option
    const insuranceCheckbox = await screen.findByRole('checkbox', {name: "Insurance"})
    userEvent.click(insuranceCheckbox);

    // Hit place an Order button
    const orderButton = await screen.findByRole('button', {name: "Place an Order"})
    userEvent.click(orderButton);

    ///// Order Confirm Page /////
    const summaryHeading = screen.getByRole('heading', {name: "Order Confirmation"});
    expect(summaryHeading).toBeInTheDocument();

    const productsHeading = screen.getByRole('heading', {name: "Travel Products: 5000"});
    expect(productsHeading).toBeInTheDocument();

    const optionsHeading = screen.getByRole('heading', {name: "Options: 500"})
    expect(optionsHeading).toBeInTheDocument();

    expect(screen.getByText("2 America")).toBeInTheDocument();
    expect(screen.getByText("3 England")).toBeInTheDocument();
    expect(screen.getByText("Insurance")).toBeInTheDocument();

    const confirmCheckbox = screen.getByRole('checkbox', {
        name: 'I want to confirm this order'
    })
    userEvent.click(confirmCheckbox);

    const confirmOrderButton = screen.getByRole('button', {
        name: "Confirm Order"
    })
    userEvent.click(confirmOrderButton);
})