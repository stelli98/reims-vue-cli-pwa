import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      expandedGroup: []
    };
  },
  computed: {
    ...mapGetters("user", ["userFamilies"]),
    userId() {
      return this.$route.params.id;
    },
    disabledAddFamilyButton(){
      return this.userFamilies.length == 4
    }
  },
  methods: {
    ...mapActions("user", ["getUserFamilyDetailByUserId", "deleteUserFamily"]),
    toggleExpandFamilyData(index) {
      if (this.isExpandedGroup(index)) {
        this.expandedGroup.splice(this.expandedGroup.indexOf(index), 1);
      } else {
        this.expandedGroup.push(index);
      }
    },
    isExpandedGroup(index) {
      return this.expandedGroup.indexOf(index) !== -1;
    },
    moveTo(page, id) {
      const ID = id ? id : this.userId
      this.$router.push({ name: page , params: {id: ID}});
    },
    removeUserFamily(id) {
      this.deleteUserFamily(id);
    },
    addNewUserFamily(){
      this.disabledAddFamilyButton ? null : this.moveTo('add-family')
    },
    iconClass(index){
      return this.isExpandedGroup(index) ? "up" : "down"
    }
  },
  created() {
    this.getUserFamilyDetailByUserId(this.userId);
  }
};
