import DateFilter from "@/filters/date"

describe("Date Filter", () => {
    it("date should be Mon, May 06, 2019, 7:06 PM", () => {
        expect(DateFilter("2019-05-06T12:06:00.000Z")).toEqual("Mon, May 06, 2019, 7:06 PM")
    })
}) 