import { render, screen } from "test-utils";
import Card from "../card";

test("should display an title and small description", () => {
  const props = {
    title: "Planet Name",
  };

  render(<Card {...props}>Mocked planet description</Card>);

  expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Planet Name");
  expect(screen.getByText(/description/i)).toHaveTextContent("Mocked planet description");
  expect(screen.getByRole("link")).toHaveAttribute("href", "/planets/Planet%20Name");
});
