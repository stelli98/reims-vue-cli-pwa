import store from "@/store"

describe('index', () => {
    test('index initial', () => {
        expect(typeof store).toEqual("object")
    })
})