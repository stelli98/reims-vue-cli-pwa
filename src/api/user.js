import axios from "axios";
import config from "@/config";
const api = config.api.users;

export default {
  downloadPersonalReport(options, token) {
    const path = api.report;
    return axios.get(path, {
      params: options,
      headers: {
        Authorization: token
      }
    });
  },
  updatePersonalProfile(data, token) {
    const path = api.user;
    return axios.put(path, data, {
      headers: {
        Authorization: token
      }
    });
  },
  getFamilyDetailByUserId(id,token){
    const path = api.family;
    return axios.get(`${path}?user-id=${id}`, {
      headers: {
        Authorization: token
      }
    })
  }
};
