import TextFilter from "@/filters/text";

describe("Text Filter", () => {
  it("Text should be Parkir Tanggal 20", () => {
    expect(TextFilter("pArkir tanggal 20")).toEqual("Parkir Tanggal 20");
  });
  it("Text should be empty", () => {
    expect(TextFilter()).toEqual("");
  });
});
