import { render, screen } from "@testing-library/react";
import SummaryPage from "../SummaryPage";

test("checkbox and button", () => {
  render(<SummaryPage />);
  const checkbox = screen.getByRole("checkbox", {
    name: 'I want to confirm this order',
  });
  expect(checkbox.checked).toEqual(false);

  const confirmButton = screen.getByRole("button", { name: "Confirm Order" })
  expect(confirmButton.disabled).toBeTruthy();
});
