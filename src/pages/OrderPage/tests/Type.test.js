import {render, screen} from "@testing-library/react";
import Type from "../Type.js";
import {server} from "../../../mocks/server.js";
import {rest} from "msw";

test('display product images from server', async () => {
    render(<Type orderType={"products"}/>)

    const productImages = await screen.findAllByRole("img", {
        name: /product$/i,
    })
    expect(productImages).toHaveLength(2);

    const altText = productImages.map((element) => element.alt);
    expect(altText).toEqual(['America product', 'England product']);
})

test('when fetching product data, face an error', async () => {
    server.resetHandlers(
        rest.get('http://localhost:5000/products', (req, res, ctx) => {
            return res(ctx.status(500));
        })
    )

    render(<Type orderType="products"/>)

    const errorBanner = await screen.findByTestId('error-banner');
    expect(errorBanner).toHaveTextContent('Error')

})

test("fetch option information from server", async () => {
    render(<Type orderType={"options"}/>)

    const optionCheckboxes = await screen.findAllByRole('checkbox')
    expect(optionCheckboxes).toHaveLength(3)
})