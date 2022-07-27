import "../styles/authForm.css";
import { FaUser } from "react-icons/fa";
import { BiShow, BiHide } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const { username, email, password, password2 } = userData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message } = useSelector(
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
      navigate("/");
      toast.success("New User Created", {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    dispatch(reset());
  }, [user, isError, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 6 || password2.length < 6) {
      toast.error("Password requires atleast 6 characters", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      if (password !== password2) {
        toast.error("Password do not match", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        const userData = {
          username,
          email,
          password,
        };
        dispatch(register(userData));
      }
    }
  };
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);

  const handleChange = (e) => {
    const key = e.target.name;
    let value = e.target.value;
    if (key === "username") {
      const valueArr = value.split("");
      if (valueArr.includes(" ")) {
        valueArr.pop();
        valueArr.push("_");
        value = valueArr.join("");
        setUserData((prevState) => ({
          ...prevState,
          [key]: value,
        }));
      } else {
        setUserData((prevState) => ({
          ...prevState,
          [key]: value,
        }));
      }
    } else {
      setUserData((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    }
  };

  const changeShowHide = (e) => {
    e.currentTarget.id === "pwd" && setShowPwd((prevState) => !prevState);
    e.currentTarget.id === "pwd2" && setShowPwd2((prevState) => !prevState);
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>
          <FaUser style={{ color: "#570A57" }} /> Register
        </h1>
        <h2>Create a new account</h2>
        <label htmlFor="username">Username*</label>
        <input
          required
          id="username"
          name="username"
          type={"text"}
          value={username}
          onChange={handleChange}
        />
        <label htmlFor="email">Email*</label>
        <input
          required
          id="email"
          name="email"
          type={"email"}
          value={email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password*</label>
        <div className="pwd-container">
          {showPwd ? (
            <input
              autoComplete="true"
              required
              className="password"
              id="password"
              name="password"
              type={"text"}
              value={password}
              onChange={handleChange}
            />
          ) : (
            <input
              autoComplete="true"
              required
              className="password"
              id="password"
              name="password"
              type={"password"}
              value={password}
              onChange={handleChange}
            />
          )}
          {password ? (
            showPwd ? (
              <BiHide className="show-hide" id="pwd" onClick={changeShowHide} />
            ) : (
              <BiShow className="show-hide" id="pwd" onClick={changeShowHide} />
            )
          ) : (
            ""
          )}
        </div>
        <label htmlFor="password">Re-enter Password*</label>
        <div className="pwd-container">
          {showPwd2 ? (
            <input
              autoComplete="true"
              required
              className="password"
              id="password2"
              name="password2"
              type={"text"}
              value={password2}
              onChange={handleChange}
            />
          ) : (
            <input
              autoComplete="true"
              required
              className="password"
              id="password2"
              name="password2"
              type={"password"}
              value={password2}
              onChange={handleChange}
            />
          )}
          {password2 ? (
            showPwd2 ? (
              <BiHide
                className="show-hide"
                id="pwd2"
                onClick={changeShowHide}
              />
            ) : (
              <BiShow
                className="show-hide"
                id="pwd2"
                onClick={changeShowHide}
              />
            )
          ) : (
            ""
          )}
        </div>
        <button className="btn">Sign up</button>
        <h3>
          Have an account? <Link to={"/login"}>Sign in</Link>
        </h3>
      </form>
    </div>
  );
};

export default Register;
