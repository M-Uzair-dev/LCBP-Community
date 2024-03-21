import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./css/chats.css";
import { Input } from "@mui/material";
import { toast } from "sonner";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const admin = localStorage.getItem("admin") === "true";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/auth/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
          }),
        });
        const data = await response.json();
        if (!data.success) {
          toast.error(data.message);
          setLoading(false);
          navigate("/");
        } else {
          setData(data.messages);
          setLoading(false);
          setName(data.name);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.message);
        setLoading(false);
        navigate("/");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const scrollBehavior =
        document.documentElement.style.scrollBehavior || "auto";

      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: scrollBehavior,
      });
    }
  }, [data]);

  const sendMessage = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/newMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          message,
          userID: localStorage.getItem("user"),
        }),
      });
      const tempdata = await response.json();
      if (!tempdata.success) {
        toast.error(tempdata.message);
        navigate("/");
      } else {
        setData([...data, tempdata.savedMessage]);
        setMessage("");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      navigate("/");
    }
  };

  return (
    <div className="chatspage">
      <p className="backButton" onClick={() => navigate(-1)}>
        {"<"}
      </p>
      <div className="topbar" style={{ justifyContent: "center" }}>
        <h1>{loading ? "Loading..." : `${name} Announcements `}</h1>
      </div>
      <div className="messages">
        {data.length > 0 &&
          data.map((message) => <p key={message._id}>{message.data}</p>)}
      </div>
      {admin ? (
        <div className="inputDiv">
          <Input
            className="inputinchat"
            placeholder="Enter message to send"
            type="text"
            autoComplete
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            multiline={true}
          />
          <p
            onClick={() => {
              sendMessage();
            }}
            style={{ cursor: "pointer" }}
          >
            Send
          </p>
        </div>
      ) : (
        <div style={{ height: "30px" }}></div>
      )}
    </div>
  );
};

export default Chat;
