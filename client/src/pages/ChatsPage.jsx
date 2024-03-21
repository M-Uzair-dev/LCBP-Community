import React, { useEffect, useState } from "react";
import logo from "../images/transparent.png";
import "./css/chats.css";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button, Input } from "@mui/material";

const ChatsPage = () => {
  const navigate = useNavigate();
  const admin = localStorage.getItem("admin") === "true";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddCommunity, setShowAddCommunity] = useState(false);
  const [message, setMessage] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [buttonText, setButtonText] = useState("Create Community");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://lcbp-community-api.vercel.app/auth/get"
        );
        const data = await response.json();
        if (!data.success) {
          toast.error(data.message);
          setLoading(false);
        } else {
          setData(data.communities);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [refresh]);
  const createCommunity = async () => {
    try {
      setButtonText("Creating...");
      const response = await fetch(
        "https://lcbp-community-api.vercel.app/auth/new",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: message,
            id: localStorage.getItem("user"),
          }),
        }
      );
      const data = await response.json();
      if (!data.success) {
        toast.error(data.message);
        setButtonText("Create Community");
      } else {
        toast.success("Community created successfully");
        setMessage("");
        setShowAddCommunity(false);
        setRefresh(!refresh);
        setButtonText("Create Community");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      setButtonText("Create Community");
    }
  };
  return (
    <div className="chatspage">
      <div className="topbar">
        <div>
          <img src={logo} className="topBarLogo" />
          <h1>LCBP Community</h1>
        </div>
        <div className="topbarright">
          <p
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            Logout
          </p>
          {admin ? (
            <p onClick={() => setShowAddCommunity(!showAddCommunity)}>
              Add Community
            </p>
          ) : (
            <p></p>
          )}
        </div>
      </div>
      <div
        className="addcommunity"
        style={{ display: showAddCommunity ? "" : "none" }}
      >
        <Input
          className="inputinchat"
          placeholder="Enter community name"
          type="text"
          autoComplete
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          style={{ marginTop: "10px" }}
          onClick={() => {
            createCommunity();
          }}
          variant="contained"
          color="primary"
          size="small"
          sx={{ ml: 1 }}
        >
          {buttonText}
        </Button>{" "}
        <Button
          style={{ marginTop: "10px" }}
          variant="contained"
          color="secondary"
          size="small"
          sx={{ ml: 1 }}
          onClick={() => setShowAddCommunity(!showAddCommunity)}
        >
          Close
        </Button>
      </div>
      <p className="hello">
        Hello <span className="name">Uzair</span>, Welcome to
        <span> LCBP Community</span>.
      </p>
      <div className="chats">
        {loading ? (
          <p>Loading...</p>
        ) : data.length > 0 ? (
          data.map((item, index) => (
            <div
              className="chat"
              key={index}
              onClick={() => navigate(`/chat/${item._id}`)}
            >
              <p>{item.name}</p>
            </div>
          ))
        ) : (
          <p>No communities</p>
        )}
      </div>
    </div>
  );
};

export default ChatsPage;
