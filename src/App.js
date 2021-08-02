import React from "react";
import Header from "./components/Header/Header";

function App() {
  return (
    <Header
      navItems={[
        { name: "Login", to: "/login" },
        { name: "Register", to: "/register" },
      ]}
    ></Header>
  );
}

export default App;
