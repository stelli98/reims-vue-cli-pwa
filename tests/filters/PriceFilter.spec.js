import PriceFilter from "@/filters/price"

describe("Price Filter", () => {
    it("Price should be Rp. 9.000", () => {
        expect(PriceFilter(9000)).toEqual("Rp. 9.000")
    })
    it("Price should be empty", () => {
        expect(PriceFilter()).toEqual("")
    })
}) 