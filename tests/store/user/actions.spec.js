import actions from "@/store/modules/user/actions"
import api from "@/api/user"
import data from "@/api-mock/mock-data"
import config from "@/config"

const url = config.api.users
jest.mock("@/api/user")

describe('Actions for User Module', () => {
    test('Create user actions', () => {
        api.createUser = jest.fn()
        const user = {
            username: "admin",
            password: "admin",
            role: "ADMIN"
        };
        actions.createUser({}, user)
        expect(api.createUser).toHaveBeenCalledWith(user)
    })

    test('Empty user actions', () => {
        api.emptyUser = jest.fn()
        const user = {
            username: "",
            password: "",
            role: ""
        };
        const commit = jest.fn()
        actions.emptyUser({ commit }, user)
        expect(commit).toHaveBeenCalledWith("SET_USER_EMPTY", user)
    })

    test('Get a user', async () => {
        api.getUser = jest.fn()
        const expectedValue = data.find(d => d.url === url.user + "/1559058600" && d.method == "GET")
        api.getUser.mockResolvedValue(expectedValue)
        const commit = jest.fn()
        const id = 1559058600
        await actions.getUser({ commit }, id)
        expect(commit).toHaveBeenCalledWith("SET_USER", expectedValue.data)
    })

    test('Get list of user', async () => {
        api.getUsers = jest.fn()
        const options = {
            page: 1,
            size: 10,
            sort_by: "created_at",
            search: ""
        }
        const expectedValue = data.find(d => d.url === url.user && d.method === "GET" && d.params.page == options.page)
        api.getUsers.mockResolvedValue(expectedValue)
        const commit = jest.fn()
        await actions.getUsers({ commit }, options)
        expect(commit).toHaveBeenCalledWith("SET_USERS", expectedValue.data)
        expect(commit).toHaveBeenCalledWith("SET_PAGINATION", expectedValue.data)
    })

    test('Update user actions', () => {
        api.updateUser = jest.fn()
        const user = {
            id: 1,
            username: "admin",
            password: "admin",
            role: "ADMIN"
        };
        actions.updateUser({}, user)
        expect(api.updateUser).toHaveBeenCalledWith(user.id, user)
    })

    test('Change Password actions', () => {
        api.changePassword = jest.fn()
        const user = {
            username: "admin",
            password: "admin",
            role: "ADMIN"
        };
        actions.changePassword({}, user)
        expect(api.changePassword).toHaveBeenCalledWith(user)
    })


    test('Delete user actions', () => {
        api.deleteUser = jest.fn()
        const id = 1
        actions.deleteUser({}, id)
        expect(api.deleteUser).toHaveBeenCalledWith(id)
    })
})