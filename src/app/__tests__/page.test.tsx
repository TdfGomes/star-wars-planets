import { render, screen, waitFor } from "test-utils";
import Planets from "../page";
import { mockPlanets } from "@/utils/tests/mocks/fixtures/planets";

test("should display a list of planets", async () => {
  render(<Planets />);

  await waitFor(() => {
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(mockPlanets.results.length);
  });
});
