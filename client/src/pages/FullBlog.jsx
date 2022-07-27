import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getSingleBlog,
  reset,
  addComment,
  deleteComment,
  deleteBlog,
} from "../features/blogs/blogSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../styles/fullBlog.css";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";

const FullBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [showComments, setShowComments] = useState(false);
  const { blogs, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.blogs
  );
  const [blogData, setBlogData] = useState({
    title: "",
    author: "",
    content: "",
    comments: [],
  });
  const [blog] = blogs;
  useEffect(() => {
    if (isError) {
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    dispatch(getSingleBlog(id));
    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  useEffect(() => {
    setBlogData((prevData) => ({
      ...prevData,
      title: blog && blog.title,
      content: blog && blog.content,
      author: blog && blog.author,
      comments: blog && blog.comments,
      user: blog && blog.user,
    }));
  }, [blog, blogs]);

  const { title, author, content, comments } = blogData;

  const handleClick = (e) => {
    const ID = e.currentTarget.id;
    if (ID === "comments") {
      setShowComments((state) => !state);
    }
    if (ID === "delete") {
      dispatch(deleteBlog(id));
      if (isError) {
        toast.error(message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      if (isSuccess) {
        toast.error("Blog deleted", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      navigate("/bloglist", { state: { id } });
    }
  };

  const [commentData, setCommentData] = useState({
    comment: "",
    blogID: id,
    user: { id: user ? user._id : null, name: user ? user.username : null },
  });
  const handleChange = (e) => {
    const val = e.target.value;
    setCommentData((prevData) => ({
      ...prevData,
      comment: val,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      if (commentData.comment) {
        dispatch(addComment(commentData));
        toast.success("Comment added", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error("Please add a comment", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } else {
      window.scroll({
        top: 0,
        behavior: "auto",
      });
      toast.error("Sign in to add a comment", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    setCommentData((prevData) => ({
      ...prevData,
      comment: "",
    }));
  };

  const handleDeleteEvent = (e, IDs) => {
    const { commentID, blogID, ownerID } = IDs;
    if (user._id === ownerID) {
      dispatch(deleteComment({ commentID, blogID }));
      toast.error("Comment deleted", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.error("Not authorized to delete this comment", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className="full-blog-container">
      <div className="full-blog">
        {isLoading ? (
          <div className="loader triangle">
            <svg viewBox="0 0 86 80">
              <polygon points="43 8 79 72 7 72"></polygon>
            </svg>
          </div>
        ) : (
          <div>
            <h1 className="full-blog-title">{title}</h1>
            <p className="full-blog-content">{content}</p>
            <div className="fullblog-foot">
              {user ? (
                user._id === blogData.user ? (
                  <>
                    <p className="full-blog-author">by {author}</p>
                    <div className="fullblog-icons">
                      <Link to={`/edit-blog/${id}`}>
                        <MdOutlineModeEdit className="fullblog-logo" />
                      </Link>
                      <MdOutlineDelete
                        id="delete"
                        className="fullblog-logo"
                        onClick={handleClick}
                      />
                    </div>
                  </>
                ) : (
                  <p className="full-blog-author unauth">by {author}</p>
                )
              ) : (
                <p className="full-blog-author unauth">by {author}</p>
              )}
            </div>
            <div className="comment-container">
              <FaRegComment
                className="comment-logo"
                id="comments"
                onClick={handleClick}
              />
            </div>
            {showComments && (
              <form className="comment-container" onSubmit={handleSubmit}>
                <input
                  value={commentData.comment}
                  className="comment-input"
                  placeholder="Add a comment"
                  onChange={handleChange}
                />
              </form>
            )}
            {comments && showComments ? (
              <div>
                <h2 className="comment-heading">Comments</h2>
                {comments.map((c, index) => (
                  <div key={index} className="comment">
                    <p className="comment-text">{c.comment}</p>
                    <div className="flex">
                      <p className="comment-author">by {c.user.name}</p>
                      {user
                        ? user._id === c.user.id && (
                            <MdOutlineDelete
                              className="fullblog-logo"
                              onClick={(event) =>
                                handleDeleteEvent(event, {
                                  commentID: c._id,
                                  blogID: c.blogID,
                                  ownerID: c.user.id,
                                })
                              }
                            />
                          )
                        : null}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default FullBlog;
