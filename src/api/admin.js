import axios from "axios";
import config from "@/config";
const api = config.api.admin;

export default {
  createUser(data, token) {
    const path = api.user;
    return axios.post(path, data, {
      headers: {
        Authorization: token
      }
    });
  },
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
  getFamilyDetailByUserId(id,token){
    const path = api.family;
    return axios.get(`${path}?user-id=${id}`, {
      headers: {
        Authorization: token
      }
    })
  }, 
  getFamilyDetailByFamilyId(id,token){
    const path = api.family;
    return axios.get(`${path}/${id}`, {
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
  updateUserFamily(data, token){
    const path = api.family;
    return axios.put(`${path}/${data.id}`, data, {
      headers: {
        Authorization: token
      }
    });
  },
  deleteUserFamilyById(id, token){
    const path = api.family;
    return axios.delete(`${path}/${id}`, {
      headers: {
        Authorization: token
      }
    });
  }
};
