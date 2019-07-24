import getters from "@/store/modules/auth/getters";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.auth
const expectedValue = data.find(d => d.url == url.login && d.method == "POST")

describe("Auth getters", () => {
    test('Get id from auth module', () => {
        const state = {
            id: expectedValue.data.id
        }
        const id = getters.id(state);
        expect(id).toBe(state.id)
    })

    test('Get role from auth module', () => {
        const state = {
            role: expectedValue.data.role
        }
        const role = getters.role(state);
        expect(role).toBe(state.role)
    })

    test('Get token from auth module', () => {
        const state = {
            token: expectedValue.headers.authorization
        }
        const token = getters.token(state);
        expect(token).toBe(state.token)
    })

})