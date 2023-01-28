import {render, screen} from '../../../test-utils.js'
import userEvent from "@testing-library/user-event";
import Type from "../Type.js";

test("update product's total when products change", async () => {
    render(<Type orderType={"products"}/>);

    const productsTotal = screen.getByText("Total", {exact: false});
    expect(productsTotal).toHaveTextContent('0');

    // Upload a America travel product
    const americaInput = await screen.findByRole('spinbutton', {
        name: "America"
    });

    userEvent.clear(americaInput);
    userEvent.type(americaInput, '1');
    expect(productsTotal).toHaveTextContent('1000');
})

test("Update option's total when options change", async () => {
    render(<Type orderType={'options'}/>);

    // Options price starts 0
    const optionsTotal = screen.getByText('Options Total:', {exact: false});
    expect(optionsTotal).toHaveTextContent('0');

    // Add an insurance option
    const insuranceCheckbox = await screen.findByRole('checkbox', {
        name: 'Insurance'
    });
    userEvent.click(insuranceCheckbox);
    expect(optionsTotal).toHaveTextContent('500');

    // Add a dinner option
    const dinnerCheckbox = await screen.findByRole('checkbox', {name: "Dinner"});
    userEvent.click(dinnerCheckbox);
    expect(optionsTotal).toHaveTextContent('1000');

    // Remove the dinner options
    userEvent.click(dinnerCheckbox);
    expect(optionsTotal).toHaveTextContent('500');
})