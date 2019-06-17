export const detectOnlineMixin = {
    computed: {
        isOnline() {
            return this.$root.$data.onLine
        }
    },
}