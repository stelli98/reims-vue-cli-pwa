import mutations from "@/store/modules/notification/mutations"


const expectedAddNotification = [{
    id: 1,
    type: "success",
    message: "Image has been submitted."
}];


describe('mutations for notifications module', () => {
    test('PUSH_NOTIFICATION add new notification', () => {
        const state = {
            notifications: []
        }

        const notification = {
            type: "success",
            message: "Image has been submitted."
        };
        mutations.PUSH_NOTIFICATION(state, notification)
        expect(state.notifications).toEqual(expectedAddNotification)
    })
    test('DELETE_NOTIFICATION add new notification', () => {
        const state = {
            notifications: expectedAddNotification
        }
        const notificationToRemove = {
            id: 1,
            type: "success",
            message: "Image has been submitted."
        }
        mutations.DELETE_NOTIFICATION(state, notificationToRemove)
        expect(state.notifications).toEqual([])
    })
})