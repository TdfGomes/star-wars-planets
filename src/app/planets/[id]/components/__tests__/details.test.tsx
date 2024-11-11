import { render, screen, waitFor } from "test-utils";
import Details from "../details";

const mockOnClick = vi.fn();

const props = {
  title: "Title",
  onClick: mockOnClick,
  details: {
    prop1: "prop1 value",
    prop2: "prop2 value",
  },
  icons: {
    prop1: {
      src: "http://mock-url-to-img.png",
      width: 2,
      height: 2,
    },
    prop2: {
      src: "http://mock-url-to-img2.png",
      width: 2,
      height: 2,
    },
  },
};

test("should display a given title, details and icon images", () => {
  render(<Details {...props} />);

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Title");

  expect(screen.getByRole("list")).toBeInTheDocument();

  Object.entries(props.details).forEach(([key, value]) => {
    expect(screen.getByRole("listitem", { name: key })).toHaveTextContent(value);
  });

  expect(screen.getAllByRole("img", { hidden: true })).toHaveLength(2);

  Object.keys(props.icons).forEach((key) => {
    expect(screen.getByAltText(`${key} icon`)).toBeInTheDocument();
  });
});

test("should be able to click a button and onClick should be called", async () => {
  const { user } = render(<Details {...props} />);

  await user.click(screen.getByRole("button", { name: /planet list/i }));

  await waitFor(() => {
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
