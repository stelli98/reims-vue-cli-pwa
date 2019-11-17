export default {
    computed: {
        currentDateTime() {
            return new Date().toISOString();
        },
        maxDateOfBirth(){
            return new Date(2000,0,1).toISOString();
        },
        minDateOfBirth(){
            return new Date(1954,1,1).toISOString();
        },
        id() {
            return this.$route.params.id;
        }
    },
    methods: {
        moveTo(page) {
            this.$router.push({name: page});
        },
        moveToWithParamsRouteId(page){
            this.$router.push({name: page, params: {id: this.id}});
        },
        moveToWithParamsId(page, id){
            this.$router.push({name: page, params: {id: id}});
        },
        moveToPreviousPage(){
            this.$router.go(-1)
        }
    },
}