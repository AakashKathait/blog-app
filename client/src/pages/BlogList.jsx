import "../styles/blogList.css";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs, reset } from "../features/blogs/blogSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Blog from "../components/Blog";

const BlogList = () => {
  const dispatch = useDispatch();
  const { blogs, isError, message } = useSelector(
    (state) => state.blogs
  );

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    dispatch(getBlogs());
    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  return (
    <div className="blog-list-container">
      <div className="blog-list">
        <Blog />
      </div>
    </div>
  );
};

export default BlogList;
