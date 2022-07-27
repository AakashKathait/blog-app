import "../styles/authForm.css";
import { FaSignInAlt } from "react-icons/fa";
import { BiShow, BiHide } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      window.scroll({
        top: 0,
        behavior: "auto",
      });
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    if (isSuccess || user) {
      toast.success(`${user.username} is logged in`, {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, dispatch]);

  const { email, password } = userData;

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  const [showPwd, setShowPwd] = useState(false);

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setUserData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const changeShowHide = () => {
    setShowPwd((prevState) => !prevState);
  };
  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>
          <FaSignInAlt style={{ color: "#570A57" }} /> Login
        </h1>
        <h2>Sign in to your account</h2>
        <label htmlFor="email">Email*</label>
        <input
          required
          id="email"
          type={"email"}
          value={email}
          name={"email"}
          onChange={handleChange}
        />
        <label htmlFor="password">Password*</label>
        <div className="pwd-container">
          {showPwd ? (
            <input
              autoComplete="true"
              required
              id="password"
              name="password"
              className="password"
              type={"text"}
              value={password}
              onChange={handleChange}
            />
          ) : (
            <input
              autoComplete="true"
              required
              id="password"
              className="password"
              name="password"
              type={"password"}
              value={password}
              onChange={handleChange}
            />
          )}
          {password ? (
            showPwd ? (
              <BiHide className="show-hide" onClick={changeShowHide} />
            ) : (
              <BiShow className="show-hide" onClick={changeShowHide} />
            )
          ) : (
            ""
          )}
        </div>
        <button className="btn">Login</button>
        <h3>
          Don't have an account? <Link to={"/register"}>Sign up</Link>
        </h3>
      </form>
    </div>
  );
};

export default Login;
