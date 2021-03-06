import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      expandedGroup: []
    };
  },
  computed: {
    ...mapGetters("admin", ["userFamilies"]),
    userId() {
      return this.$route.params.id;
    },
    disabledAddFamilyButton() {
      return this.userFamilies.length == 4;
    }
  },
  methods: {
    ...mapActions("admin", ["getUserFamilyDetailByUserId", "deleteUserFamily"]),
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
      const ID = id ? id : this.userId;
      this.$router.push({ name: page, params: { id: ID } });
    },
    removeUserFamily(id) {
      this.deleteUserFamily(id).then(() => {
        this.getUserFamilyDetailByUserId(this.userId);
      });
    },
    addNewUserFamily() {
      this.disabledAddFamilyButton ? null : this.moveTo("add-family");
    },
    iconClass(index) {
      return this.isExpandedGroup(index) ? "up" : "down";
    },
    editUser(page, familyId){
      this.$router.push({name: page, params:{userId: this.$route.params.id, familyId: familyId}})
    }
  },
  created() {
    this.getUserFamilyDetailByUserId(this.userId);
  }
};
