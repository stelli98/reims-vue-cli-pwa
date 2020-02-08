const d = new Date();
d.setTime(d.getTime() + 604800000);
const expires = d.toGMTString();

export default {
  SET_USER(state, { data }) {
    state.user = data;
  },
  SET_USER_FAMILY(state, data) {
    document.cookie = `userFamily=${data};expires=${expires}`;
    state.userFamily = data;
  },
  SET_HAS_VEHICLE(state, hasVehicle) {
    document.cookie = `hasVehicle=${hasVehicle};expires=${expires}`;
    state.hasVehicle = hasVehicle;
  }
};
