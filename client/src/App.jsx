import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";

const App = () => {
  const navigate = useNavigate();
  let loggedIn = localStorage.getItem("loggedIn") === "true" || false;
  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <div>
        <Toaster richColors position="bottom-left" closeButton />
        <Outlet />
      </div>
    </>
  );
};

export default App;
