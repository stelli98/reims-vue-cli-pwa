export default {
  data() {
    return {
      isExpanding: false,
      userData: [
        {
          relationshipStatus: "Wife",
          name: "Tika",
          detail: "Marriage Date",
          marriedDate: "29-09-2020", 
          expanding: true
        },
        { 
          relationshipStatus: "Child", 
          name: "Bobi", 
          detail: "Birth Date",
          bornDate: "29-09-2025",
          expanding: false 
        },
        {
          relationshipStatus: "Child",
          name: "Tina",
          detail: "Birth Date",
          bornDate: "29-09-2026",
          expanding: false
        }
      ]
    };
  },
  methods: {
    expandFamilyData(index) {
      this.userData[index].expanding = !this.userData[index].expanding
    }
  }
};
