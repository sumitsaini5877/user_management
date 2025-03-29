import React from "react";
import LoginForm from "./LoginForm";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import EditForm from "./EditForm";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <AppRoutes/>
      </BrowserRouter>
      {/* <EditForm/> */}
    </>
  );
}

export default App;
