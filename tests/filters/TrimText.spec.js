import TrimTextFilter from "@/filters/trimText"

describe("Trim text Filter", () => {
    it("Trim text should be Munawan Sa...", () => {
        expect(TrimTextFilter("Munawan Sadakh", 10)).toEqual("Munawan Sa...")
    })
    it("Trim text should be Herri Y", () => {
        expect(TrimTextFilter("Herri Y", 10)).toEqual("Herri Y")
    })
}) 