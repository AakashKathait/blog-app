import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Blog = () => {
  const location = useLocation();
  const { blogs, isLoading } = useSelector((state) => state.blogs);
  const id = location.state && location.state.id;
  return (
    <div className="blog-container">
      {isLoading ? (
        <div className="loader triangle">
          <svg viewBox="0 0 86 80">
            <polygon points="43 8 79 72 7 72"></polygon>
          </svg>
        </div>
      ) : (
        <>
          <h1 className="blog-list-heading">THE ARRAY</h1>
          <p className="blog-list-description">
            List of all the blogs posted here
          </p>
          {blogs.map(
            (blog, index) =>
              blog._id !== id && (
                <Link className="blog" to={`/fullblog/${blog._id}`} key={index}>
                  <h1 className="title">{blog.title.toUpperCase()}</h1>
                  <p className="content">
                    {blog.content.split(" ").splice(0, 50).join(" ")}...
                  </p>
                  <p className="descriptor">Click to read the full blog</p>
                  <p className="author">- {blog.author}</p>
                </Link>
              )
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
