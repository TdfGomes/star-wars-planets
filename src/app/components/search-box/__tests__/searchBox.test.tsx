import { render, screen, waitFor } from "test-utils";
import SearchBox from "..";

const mockSetSearch = vi.fn();
const mockGetSearch = vi.fn();

vi.mock("@/app/hooks", async () => ({
  ...(await vi.importActual("@/app/hooks")),
  useSearch: () => ({
    getSearch: mockGetSearch,
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

test("should populate field with default value from search query", () => {
  mockGetSearch.mockReturnValueOnce("Default planet value");

  render(<SearchBox />);

  expect(screen.getByRole("searchbox", { name: /search a planet/i })).toHaveValue(
    "Default planet value",
  );
});
