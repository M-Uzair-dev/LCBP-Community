import React, { useEffect, useState } from "react";
import Input from "../components/javascript/Input";
import Button from "../components/javascript/Button";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import "./css/auth.css";
import { toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();
  let loggedIn = localStorage.getItem("loggedIn") === "true" || false;
  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, []);
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const [data, setData] = useState({ phone: "", password: "", name: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  let submit = async () => {
    try {
      if (data.phone === "" || data.password === "" || data.name === "") {
        toast.error("Please fill all fields");
        return;
      } else if (data.password !== ConfirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      let ResponseData = await fetch(
        "https://lcbp-community-api.vercel.app/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            phone: data.phone,
            password: data.password,
          }),
        }
      );

      let json = await ResponseData.json();
      if (json.success) {
        toast.success("Account created successfully");
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
    <div>
      <div className="maincont">
        <section className="leftcont">
          <img src={logo} alt="Logo" className="mobilelogo" />
          <div className="welcomediv">
            <h1>Sign up</h1>
            <p>Create your LCBP account</p>
          </div>
          <div className="inputdiv">
            <Input
              label="Name"
              placeholder="Enter your name"
              type="text"
              value={data.name}
              onchange={handleChange}
              id="name"
            />
            <Input
              label="Phone Number"
              placeholder="Enter your phone"
              type="phone"
              value={data.phone}
              onchange={handleChange}
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
            <Input
              label="Confirm Password"
              placeholder="Enter your password"
              type="password"
              value={ConfirmPassword}
              onchange={(e) => setConfirmPassword(e.target.value)}
              id="password"
            />
          </div>
          <div className="remembermediv">
            <input type="checkbox" /> <label>Remember me ?</label>
            <p>Need Help ?</p>
          </div>
          <div className="buttonsdiv">
            <Button theme="dark" text="Signup" submit={submit} />
          </div>
          <div className="leftlastdiv">
            <p>
              Already have an account ?{" "}
              <span
                onClick={() => {
                  navigate("/login");
                }}
              >
                Log in
              </span>
            </p>
          </div>
        </section>
        <section className="rightcont">
          <img src={logo} alt="Logo" className="logo" />
          <h1>LCBP Community</h1>
          <p className="textbody">
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
    </div>
  );
};

export default Signup;
