import getIdFromUrl from "./utils";

describe("getIdFromUrl", () => {
  it("should extract and return the ID from a valid URL", () => {
    const url = "https://example.com/api/pokemon/25/";
    expect(getIdFromUrl(url)).toBe("25");
  });

  it("should return an empty string for an invalid URL", () => {
    const url = "https://example.com/api/pokemon/";
    expect(getIdFromUrl(url)).toBe("");
  });

  it("should return an empty string for an empty URL", () => {
    const url = "";
    expect(getIdFromUrl(url)).toBe("");
  });

  it("should return an empty string for a URL with no ID", () => {
    const url = "https://example.com/api/pokemon/";
    expect(getIdFromUrl(url)).toBe("");
  });
});
