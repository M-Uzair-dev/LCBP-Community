import React from "react";
import ChatsPage from "./ChatsPage";

const MainPage = () => {
  let loggedIn = localStorage.getItem("loggedIn") === "true" || false;
  return <>{loggedIn && <ChatsPage />}</>;
};

export default MainPage;
