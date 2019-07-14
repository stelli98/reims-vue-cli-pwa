import transaction from "@/store/modules/transaction"

const state = {
    image: "",
    OCRResultType: "",
    parking: {
        in: "",
        out: "",
        price: 0,
        title: "",
        vehicle: "",
        license: "",
        location: ""
    },
    fuel: {
        date: "",
        type: "",
        volume: 0,
        unitPrice: 0,
        title: ""
    },
    transactions: [],
    transaction: {},
    pagination: {}
};


describe('transaction store', () => {
    test('transaction initial state', () => {
        expect(transaction.state).toEqual(state)
    })
})