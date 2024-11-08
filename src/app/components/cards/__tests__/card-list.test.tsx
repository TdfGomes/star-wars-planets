import { render, screen } from "test-utils";
import CardsList from "../card-list";

test("should display a list item and should render a given children", () => {
  render(
    <CardsList>
      <li>Test list item</li>
    </CardsList>,
  );

  expect(screen.getByRole("list")).toBeInTheDocument();

  expect(screen.getByRole("list").children).toHaveLength(1);

  expect(screen.getByRole("listitem")).toHaveTextContent("Test list item");
});
