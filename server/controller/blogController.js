const asyncHandler = require("express-async-handler");
const Blog = require("../models/blogModel");
const User = require("../models/userModel");

const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find();
  res.status(200).json(blogs);
});

const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const blogData = await Blog.findById(id);

  res.json(blogData);
});

const postBlogs = asyncHandler(async (req, res) => {
  if (!req.body.title || !req.body.content) {
    res.status(400);
    throw new Error("Please enter input fields");
  }
  if (!req.body.author) {
    res.status(400);
    throw new Error("User not logged in");
  }
  try {
    const blog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      user: req.body.id,
    });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500);
    throw new Error("Something went wrong");
  }
});

const editBlogs = asyncHandler(async (req, res) => {
  const { id, title, content } = req.body;
  const blog = await Blog.findById(id);
  if (!blog) {
    res.status(400);
    throw new Error("Blog not found");
  }
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (blog.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { title: title, content: content },
    {
      new: true,
    }
  );
  res.status(200).json(updatedBlog);
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog) {
    res.status(400);
    throw new Error("Blog not found");
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (blog.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await blog.remove();

  res.status(200).json(id);
});

const postComment = asyncHandler(async (req, res) => {
  if (!req.body.comment) {
    res.status(400);
    throw new Error("Please add a comment");
  }

  if (!req.body.user) {
    res.status(400);
    throw new Error("Sign in to add a comment");
  }

  const { comment, user, blogID } = req.body;
  const commentData = {
    comment: comment,
    user: user,
    blogID: blogID,
  };

  const blog = await Blog.findByIdAndUpdate(
    blogID,
    {
      $push: { comments: commentData },
    },
    { new: true }
  );
  res.status(200).json(blog);
});

const deleteComment = asyncHandler(async (req, res) => {
  const { commentID, blogID } = req.body;
  const blog = await Blog.findByIdAndUpdate(
    blogID,
    {
      $pull: { comments: { _id: commentID } },
    },
    { new: true }
  );
  res.status(200).json(blog);
});

module.exports = {
  getBlogs,
  getBlog,
  postBlogs,
  editBlogs,
  deleteBlog,
  postComment,
  deleteComment,
};
