import { render, screen, waitFor } from "test-utils";
import SearchBox from "..";

const mockSetSearch = vi.fn();

vi.mock("@/app/hooks", async () => ({
  ...(await vi.importActual("@/app/hooks")),
  useSearch: () => ({
    getSearch: vi.fn().mockReturnValue("planet name"),
    setSearch: mockSetSearch,
  }),
}));

afterAll(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();
});

test("should be able to type in the input", async () => {
  const { user } = render(<SearchBox />);

  const searchBox = screen.getByRole("searchbox", { name: /search a planet/i });
  await user.type(searchBox, "planet name");

  expect(searchBox).toHaveValue("planet name");

  await waitFor(() => {
    expect(mockSetSearch).toHaveBeenCalledWith("planet name");
  });
});
