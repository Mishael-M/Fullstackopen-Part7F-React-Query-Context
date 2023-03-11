import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;
let config = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
  config = {
    headers: { Authorization: token },
  };
};

const getAll = () => axios.get(baseUrl, config).then((res) => res.data);

const createBlog = (newBlog) =>
  axios.post(baseUrl, newBlog, config).then((res) => res.data);

const updateBlog = (updatedBlog) =>
  axios
    .put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config)
    .then((res) => res.data);

const deleteBlog = (id) => {
  axios.delete(`${baseUrl}/${id}`, config).then((res) => res.data);
};

// const deleteBlog = async (id) => {
//   const response = await axios.delete(`${baseUrl}/${id}`, config);
//   return response.data;
// };

export default {
  getAll,
  createBlog,
  updateBlog,
  deleteBlog,
  setToken,
};
