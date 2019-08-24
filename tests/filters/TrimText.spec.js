import trimTextFilter from "@/filters/trimText";

describe("Trim text Filter", () => {
  it("Trim text should be Munawan Sa...", () => {
    expect(trimTextFilter("Munawan Sadakh", 10)).toEqual("Munawan Sa...");
  });
  it("Trim text should be Herri Y", () => {
    expect(trimTextFilter("Herri Y", 10)).toEqual("Herri Y");
  });
});
