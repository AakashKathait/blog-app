const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  getBlogs,
  getBlog,
  postBlogs,
  editBlogs,
  deleteBlog,
  postComment,
  deleteComment,
} = require("../controller/blogController");

router.get("/", getBlogs);

router.post("/", protect, postBlogs);

router.get("/:id", getBlog);

router.put("/edit", protect, editBlogs);

router.delete("/:id", protect, deleteBlog);

router.post("/comment/create", protect, postComment);

router.post("/comment/delete", protect, deleteComment);

module.exports = router;
