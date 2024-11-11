import { capitalize } from "../helpers";

describe("camelize", () => {
  test.each([
    {
      str: "name",
      expected: "Name",
    },
    {
      str: "mock_id",
      expected: "Mock Id",
    },
    {
      str: "some-prop-name",
      expected: "Some Prop Name",
    },
    {
      str: "string with spaces",
      expected: "String With Spaces",
    },
  ])("should capitalize $str into $expected", ({ str, expected }) => {
    expect(capitalize(str)).toEqual(expected);
  });
});
