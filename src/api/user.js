import axios from "axios";
import config from "@/config";
const api = config.api.users;

export default {
  getUser(id, token) {
    const path = api.user;
    return axios.get(`${path}/${id}`, {
      headers: {
        Authorization: token
      }
    });
  },
  getUsers(options, token) {
    const path = api.user;
    return axios.get(path, {
      params: options,
      headers: {
        Authorization: token
      }
    });
  },
  createUser(data, token) {
    const path = api.user;
    return axios.post(path, data, {
      headers: {
        Authorization: token
      }
    });
  },
  updateUser(id, data, token) {
    const path = api.user;
    return axios.put(`${path}/${id}`, data, {
      headers: {
        Authorization: token
      }
    });
  },
  deleteUser(id, token) {
    const path = api.user;
    return axios.delete(`${path}/${id}`, {
      headers: {
        Authorization: token
      }
    });
  },
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
    const path = api.personalUser;
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
  }, 
  addFamilyToUser(id, data, token){
    const path = api.family;
    return axios.post(`${path}?user-id=${id}`, data, {
      headers: {
        Authorization: token
      }
    });
  },
  updateUserFamily(id, data, token){
    const path = api.family;
    return axios.post(`${path}?user-id=${id}`, data, {
      headers: {
        Authorization: token
      }
    });
  }
};
