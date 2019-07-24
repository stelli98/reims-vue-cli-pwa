import actions from "@/store/modules/transaction/actions"
import api from "@/api/transaction"
import data from "@/api-mock/mock-data"
import config from "@/config"

const url = config.api.transactions
const image = "image.jpg"
const id = 1
jest.mock("@/api/transaction")

describe('Actions for Transactions Module', () => {
    test('set image for transaction', () => {
        const commit = jest.fn()
        actions.setImage({ commit }, image)
        expect(commit).toHaveBeenCalledWith('SET_IMAGE', image)
    })

    test('set OCR Result Type for transaction', () => {
        const type = "FUEL"
        const commit = jest.fn()
        actions.setOCRResultType({ commit }, type)
        expect(commit).toHaveBeenCalledWith('SET_OCR_RESULT_TYPE', type)
    })

    test('set form to be empty', () => {
        const data = {
            in: "",
            out: "",
            price: 0,
            title: "",
            vehicle: "",
            license: "",
            location: "",
            category: "PARKING"
        }
        const commit = jest.fn()
        actions.setFormEmpty({ commit }, data)
        expect(commit).toHaveBeenCalledWith('SET_OCR_RESULT', data)
    })

    test('create Transaction for image, set ocr result and its type', async () => {
        api.createTransaction = jest.fn();
        const expectedValue = data.find(d => d.url === url.transaction && d.method == "POST")
        api.createTransaction.mockResolvedValue(
            {
                data: expectedValue
            }
        )
        const commit = jest.fn()
        const rootState = {
            auth: {
                token: 'Bearer 123'
            }
        }
        console.log('test', expectedValue)
        await actions.createTransaction({ commit, rootState }, image)
        expect(commit).toHaveBeenCalledWith('SET_OCR_RESULT', expectedValue)
        expect(commit).toHaveBeenCalledWith('SET_OCR_RESULT_IMAGE', expectedValue.data.image)
        expect(commit).toHaveBeenCalledWith('SET_OCR_RESULT_TYPE', expectedValue.data.category)
    })

    test('get a transaction', async () => {
        api.getTransaction = jest.fn();
        const expectedValue = data.find(d => d.url === url.transaction + "/1" && d.method == "GET")
        api.getTransaction.mockResolvedValue(expectedValue)
        const commit = jest.fn()
        const rootState = {
            auth: {
                token: 'Bearer 123'
            }
        }
        await actions.getTransaction({ commit, rootState }, id)
        expect(commit).toHaveBeenCalledWith('SET_TRANSACTION', expectedValue.data)
    })

    test('get list of transactions', async () => {
        api.getTransactions = jest.fn();
        const options = {
            "page": 1,
            "size": 5,
            "sortBy": "createdAt"
        }
        const expectedValue = data.find(d => d.url === url.transaction && d.method == "GET" && d.params.page === options.page)
        api.getTransactions.mockResolvedValue(expectedValue)
        const commit = jest.fn()
        const rootState = {
            auth: {
                token: 'Bearer 123'
            }
        }
        await actions.getTransactions({ commit, rootState }, options)
        expect(commit).toHaveBeenCalledWith('SET_TRANSACTIONS', expectedValue.data)
        expect(commit).toHaveBeenCalledWith('SET_PAGINATION', expectedValue.data)
    })

    test('save transaction form', () => {
        api.saveTransaction = jest.fn();
        const rootState = {
            auth: {
                token: 'Bearer 123'
            }
        }
        const transaction = {
            "id": 500000026,
            "image":
                "https://blogiin.files.wordpress.com/2016/03/struk-spbu.png?w=259&h=379",
            "category": "FUEL",
            "date": "2018-05-12T17:19:06.151Z",
            "type": "Premium",
            "volume": 5.0,
            "unitPrice": 9000,
            "created_at": "2018-05-12T17:19:06.151Z",
            "modified_at": ""
        }
        actions.saveTransaction({ rootState }, transaction)
        expect(api.saveTransaction).toHaveBeenCalledWith(transaction, rootState.auth.token)
    })

    test('delete transaction', () => {
        api.deleteTransaction = jest.fn();
        const rootState = {
            auth: {
                token: 'Bearer 123'
            }
        }
        actions.deleteTransaction({ rootState }, id)
        expect(api.deleteTransaction).toHaveBeenCalledWith(id, rootState.auth.token)
    })
})