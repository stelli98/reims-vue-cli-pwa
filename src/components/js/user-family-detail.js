export default {
  data() {
    return {
      isExpanding: false,
      userData: [
        {
          relationshipStatus: "Wife",
          name: "Tika",
          detail: "Marriage Date",
          marriedDate: "29-09-2020"
        },
        {   relationshipStatus: "Child", 
            name: "Bobi", 
            detail: "Birth Date",
            bornDate: "29-09-2025" },
        {
          relationshipStatus: "Child",
          name: "Tina",
          detail: "Birth Date",
          bornDate: "29-09-2026"
        }
      ]
    };
  },
  methods: {
    expandFamilyData() {
      this.isExpanding = !this.isExpanding;
    }
  }
};
