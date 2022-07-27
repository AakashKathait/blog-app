import axios from "axios";

const API_URL = "/api/blogs/";
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://arrayblogapp.herokuapp.com"
    : "http://localhost:5000";
const createBlog = async (blogData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.post(BASE_URL + API_URL, blogData, config);
  return res.data;
};

const editBlog = async (blogData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.put(BASE_URL + API_URL + "edit", blogData, config);
  return res.data;
};

const deleteBlog = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.delete(BASE_URL + API_URL + id, config);
  return res.data;
};

const getBlogs = async () => {
  const res = await axios.get(BASE_URL + API_URL);
  return res.data;
};

const getSingleBlog = async (id) => {
  const res = await axios.get(BASE_URL + API_URL + id);
  return res.data;
};

const addComment = async (commentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.post(
    BASE_URL + API_URL + "comment/create",
    commentData,
    config
  );
  return res.data;
};

const deleteComment = async (commentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.post(
    BASE_URL + API_URL + "comment/delete",
    commentData,
    config
  );
  return res.data;
};

const blogService = {
  createBlog,
  getBlogs,
  getSingleBlog,
  addComment,
  deleteComment,
  editBlog,
  deleteBlog,
};

export default blogService;
