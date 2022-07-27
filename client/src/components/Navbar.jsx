import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import "../styles/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset, logout } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const Navbar = ({ showNav }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
    toast.error("Logged out", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className={showNav ? "nav-container" : "hide nav-container"}>
      <div className="nav">
        <div className="logo-container">
          <h1 onClick={handleClick}>ArY</h1>
        </div>
        <div className="links-container">
          {user ? (
            <>
              <div className="logout">
                <button onClick={handleLogout}>
                  <FaSignOutAlt className="auth-logo" />
                  Logout
                </button>
              </div>
              <div className="username">
                <FaUser className="auth-logo" />
                {user.username}
              </div>
            </>
          ) : (
            <>
              <div className="login">
                <Link
                  to={"/login"}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <FaSignInAlt className="auth-logo" />
                  Login
                </Link>
              </div>
              <div className="register">
                <Link
                  to={"/register"}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <FaUser className="auth-logo" />
                  Register
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
