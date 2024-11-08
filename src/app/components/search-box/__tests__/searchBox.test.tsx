import { render, screen, waitFor } from "test-utils";
import SearchBox from "..";

const mockOnChange = vi.fn();
const mockSubmit = vi.fn();

const props = {
  onChange: mockOnChange,
  onSubmit: mockSubmit,
};

test("should be able to type in the input", async () => {
  const { user } = render(<SearchBox {...props} />);

  const searchBox = screen.getByRole("searchbox", { name: /search a planet/i });
  await user.type(searchBox, "planet name");

  expect(searchBox).toHaveValue("planet name");

  await waitFor(() => {
    expect(mockOnChange).toHaveBeenCalledWith("planet name");
  });
});

test("should be able to submit a typed value", async () => {
  const { user } = render(<SearchBox {...props} />);

  const searchBox = screen.getByRole("searchbox", { name: /search a planet/i });

  await user.type(searchBox, "planet name");

  await user.click(screen.getByRole("button"));

  await waitFor(() => {
    expect(mockSubmit).toHaveBeenCalledWith("planet name");
  });
});
