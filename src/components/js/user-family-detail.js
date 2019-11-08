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
      this.$router.push({ name: page , params: {id: id}});
    },
    removeUserFamily(id) {
      this.deleteUserFamily(id);
    }
  },
  created() {
    this.getUserFamilyDetailByUserId(this.userId);
  }
};
