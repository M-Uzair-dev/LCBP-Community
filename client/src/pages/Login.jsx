import React, { useEffect, useState } from "react";
import Input from "../components/javascript/Input";
import Button from "../components/javascript/Button";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import "./css/auth.css";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  let loggedIn = localStorage.getItem("loggedIn") === "true" || false;
  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, []);
  const [data, setData] = useState({ phone: "", password: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };
  let submit = async () => {
    try {
      if (data.password === "" || data.name === "") {
        toast.error("Please fill all fields");
        return;
      }
      let ResponseData = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: data.phone,
          password: data.password,
        }),
      });

      let json = await ResponseData.json();
      if (json.success) {
        json.User.admin && localStorage.setItem("admin", true);
        toast.success("Logged in successfully");
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("user", json.User._id);
        navigate("/");
      } else {
        toast.error(json.message);
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  return (
    <div className="maincont">
      <section className="leftcont">
        <img src={logo} alt="Logo" className="mobilelogo" />
        <div className="welcomediv">
          <h1>Welcome Back</h1>
          <p>LCBP Community awaits you !</p>
        </div>
        <div>
          <div className="inputdiv">
            <Input
              label="Phone Number"
              value={data.phone}
              onchange={handleChange}
              placeholder="Enter your phone"
              type="phone"
              id="phone"
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              value={data.password}
              onchange={handleChange}
              id="password"
            />
          </div>
          <div className="remembermediv">
            <div className="inneremember">
              <input type="checkbox" id="remember" />{" "}
              <label htmlFor="remember">Remember me ?</label>
            </div>
            <p>Forgot Password ?</p>
          </div>
        </div>
        <div>
          <div className="buttonsdiv">
            <Button text="Login" theme="dark" submit={submit} />
          </div>
          <div className="leftlastdiv">
            <p>
              Don't have an account ?{" "}
              <span
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </section>
      <section className="rightcont">
        <img src={logo} alt="Logo" className="logo" />
        <h1>LCBP Community</h1>
        <p>
          LCBP Community is a platform where you can get al the notifications
          about LCBP Online classes and all the other news in one place. login
          now or register as an LCBP User.
        </p>
        <div className="dots">
          <div className="line"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </section>
    </div>
  );
};

export default Login;
