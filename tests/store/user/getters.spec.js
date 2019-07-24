import getters from "@/store/modules/user/getters";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.users
const expectedValue = data.find(d => d.url == url.user && d.method == "GET")

describe("user getters", () => {
    test('Get users from user module', () => {
        const state = {
            users: expectedValue.data
        }
        const users = getters.users(state);
        expect(users).toBe(state.users)
    })

    test('Get user from user module', () => {
        const expectedValue = data.find(d => d.url == url.user + '/1559058600')
        const state = {
            user: expectedValue.data
        }
        const user = getters.user(state);
        expect(user).toBe(state.user)
    })

    test('Get paginations from user module', () => {
        const state = {
            pagination: expectedValue.data.pagination
        }
        const pagination = getters.pagination(state);
        expect(pagination).toBe(state.pagination)
    })

})