import { getHref } from "../helpers";

describe("getHref", () => {
  test("sould get the correct href from a given url", () => {
    const url = "https://swapi.dev/api/planets/2/";

    expect(getHref(url)).toEqual("/planets/2/");
  });
});
