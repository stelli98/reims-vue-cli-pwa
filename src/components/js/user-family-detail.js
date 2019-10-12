import { mapActions, mapGetters} from "vuex"
export default {
  data() {
    return {
      expandedGroup : []
    };
  },
  computed: {
    ...mapGetters('user',['userFamily']),
      userId() {
        return this.$route.params.id;
      }
  },
  methods: {
    ...mapActions('user',['getUserFamilyDetail']),
    toggleExpandFamilyData(index) {
      if (this.isExpandedGroup(index)){
         this.expandedGroup.splice(this.expandedGroup.indexOf(index), 1);
      } else {
        this.expandedGroup.push(index);
      }
    },
    isExpandedGroup(index){
      return this.expandedGroup.indexOf(index) !== -1
    }
  },
  created () {
    this.getUserFamilyDetail(this.userId);
  }
};
