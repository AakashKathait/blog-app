import "../styles/blogForm.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createBlog, reset } from "../features/blogs/blogSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { blogs, isError, isSuccess, message } = useSelector(
    (state) => state.blogs
  );
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    author: user.username,
    id: user._id,
  });

  const { title, content } = blogData;

  useEffect(() => {
    if (isSuccess) {
      navigate("/bloglist");
      toast.success("New Blog Created", {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(reset());
    }
    if (isError) {
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(reset());
    }
  }, [blogs, isError, isSuccess, message, navigate, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contentLimit = 100;
    const contentWrittent = content.split(" ").length;
    const titleLimit = 25;
    const titleWritten = title.split("").length;
    if (titleWritten > titleLimit) {
      window.scroll({
        top: 0,
        behavior: "auto",
      });
      toast.error("Title too long", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      if (contentWrittent > contentLimit) {
        dispatch(createBlog(blogData));
      } else {
        window.scroll({
          top: 0,
          behavior: "auto",
        });
        toast.error(
          `More than ${contentLimit} words required, You need ${
            contentLimit - contentWrittent
          } more words in content`,
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
      }
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "title") {
      setBlogData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    if (name === "content") {
      setBlogData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <div className="blog-form-container">
      <form className="blog-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h1>Create a new Blog</h1>
        </div>
        <div className="form-inputs">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            value={title}
            name="title"
            type="text"
            required={true}
            onChange={handleChange}
          />
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            defaultValue={content}
            name="content"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="btn-container">
          <button className="btn">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
