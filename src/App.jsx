import React from "react";

import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";


function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <AppRoutes/>
      </BrowserRouter>
      {/* <Filter/> */}
    </>
  );
}

export default App;
