import {render, screen} from "@testing-library/react";
import Type from "../Type.js";
import userEvent from "@testing-library/user-event";

test("update product's total when products change", async () => {
    render(<Type orderType={"products"}/>)

    const productsTotal = screen.getByText("Products Total", {exact: false});
    expect(productsTotal).toHaveTextContent('0');

    // Upload a America travel product
    const americaInput = await screen.findByRole('spinbutton', {
        name: "America"
    });

    userEvent.clear(americaInput);
    userEvent.type(americaInput, '1');
    expect(productsTotal).toHaveTextContent('1000');
})