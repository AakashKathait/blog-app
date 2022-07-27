import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getSingleBlog, editBlog, reset } from "../features/blogs/blogSlice";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { blogs, isLoading, isError, message } = useSelector(
    (state) => state.blogs
  );
  const [blogData, setBlogData] = useState({
    id: id,
    title: "",
    content: "",
  });
  const [blog] = blogs;
  useEffect(() => {
    if (isError) {
      toast.error("Couldn't find the blog in database", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    dispatch(getSingleBlog(id));
    return () => {
      dispatch(reset());
    };
  }, [isError, dispatch]);

  useEffect(() => {
    setBlogData((prevState) => ({
      ...prevState,
      title: blog ? blog.title : "",
      content: blog ? blog.content : "",
    }));
  }, [blog]);

  const { title, content } = blogData;

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setBlogData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleClick = (e) => {
    const ID = e.target.id;
    e.preventDefault();
    if (ID === "cancel") {
      navigate(`/fullblog/${id}`);
    }
    if (ID === "save") {
      const wordLimit = 100;
      const wordWritten = content.split(" ").length;
      const titleLimit = 25;
      const titleWritten = title.split("").length;
      if (titleWritten > titleLimit) {
        toast.error("Title too long", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        if (wordWritten > wordLimit) {
          dispatch(editBlog(blogData));
          navigate(`/fullblog/${id}`);
          toast.success("Blog edited", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.error(
            `More than ${wordLimit} words required, You need ${
              wordLimit - wordWritten
            } more words`,
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
        }
      }
    }
  };

  return (
    <div className="blog-form-container">
      <form className="blog-form">
        {isLoading ? (
          <div className="form-loader form-triangle">
            <svg viewBox="0 0 86 80">
              <polygon points="43 8 79 72 7 72"></polygon>
            </svg>
          </div>
        ) : (
          <>
            <div className="form-header">
              <h1>Edit Your Blog</h1>
            </div>
            <div className="form-inputs">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                value={title}
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
            <div className="btns-container">
              <button
                id="cancel"
                type="button"
                className="btn cancel"
                onClick={handleClick}
              >
                Cancel
              </button>
              <button
                id="save"
                type="submit"
                className="btn save"
                onClick={handleClick}
              >
                Save
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default EditBlog;
