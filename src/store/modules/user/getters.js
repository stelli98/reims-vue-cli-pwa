export default {
  user(state) {
    return state.user;
  },
  userFamily(state){
    return JSON.parse(state.userFamily);
  },
  hasVehicle(state){
    return state.hasVehicle;
  }
};
