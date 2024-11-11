import { render, screen, waitFor } from "test-utils";
import { Button } from "../chevrons";

const mockedOnClick = vi.fn();

const props = {
  onClick: mockedOnClick,
  title: "Button title",
};

test("button should render a given children", () => {
  render(
    <Button {...props}>
      <span>Button Children</span>
    </Button>,
  );

  expect(screen.getByRole("button")).toBeInTheDocument();
  expect(screen.getByText(/button children/i)).toBeInTheDocument();
});

test("button should display a given title", () => {
  render(
    <Button {...props}>
      <span>Button Children</span>
    </Button>,
  );

  expect(screen.getByRole("button")).toHaveAttribute("title", props.title);
});

test("onClick should be called when click at button", async () => {
  const { user } = render(
    <Button {...props}>
      <span>Button Children</span>
    </Button>,
  );

  await user.click(screen.getByRole("button"));

  await waitFor(() => {
    expect(mockedOnClick).toHaveBeenCalledTimes(1);
  });
});
