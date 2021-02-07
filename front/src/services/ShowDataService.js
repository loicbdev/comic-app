import axios from "axios";

const http =  axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-type": "application/json"
  }
});


const getAll = () => {
  return http.get("/shows/");
};

const get = (id) => {
  return http.get(`/shows/${id}`);
};

const create = (data) => {
  return http.post("/shows", data);
};

const update = (id, data) => {
  return http.put(`/shows/update/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/shows/delete/${id}`);
};

const findByArtist = (artist) => {
  return http.get(`/shows/artists/contains?artist=${artist}`);
};

const publishedTop = () => {
  return http.get(`/shows/top/1`);
};


export default {
  getAll,
  get,
  create,
  update,
  remove,
  findByArtist,
  publishedTop
};