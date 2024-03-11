import { filterByText } from "./filterByText";

import { mockCardSets } from "../test/testData";

describe("filterByText", () => {
  it("should return all sets when input is empty", () => {
    const filtered = filterByText(mockCardSets, "");
    expect(filtered).toHaveLength(mockCardSets.length);
  });

  it("should filter by title", () => {
    const filtered = filterByText(mockCardSets, "React");
    expect(filtered).toHaveLength(1);
    expect(filtered[0].title).toBe("React Basics");
  });

  it("should filter by description", () => {
    const filtered = filterByText(mockCardSets, "Vue");
    expect(filtered).toHaveLength(1);
    expect(filtered[0].title).toBe("Vue Basics");
  });

  it("should be case insensitive", () => {
    const filtered = filterByText(mockCardSets, "react");
    expect(filtered).toHaveLength(1);
    expect(filtered[0].title).toBe("React Basics");
  });

  it("should return an empty array if no matches are found", () => {
    const filtered = filterByText(mockCardSets, "Angular");
    expect(filtered).toHaveLength(0);
  });
});
