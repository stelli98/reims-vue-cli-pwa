import DateFilter from "@/filters/date";

describe("Date Filter", () => {
  it("date should be Mon, May 06, 2019", () => {
    expect(DateFilter(1557144360000)).toEqual(
      "Mon, May 06, 2019"
    );
  });
});
