import React from "react";
import Layout from "./Layout/Layout";

import Routes from "./features/Routes";
import "./App.css";

function App() {
  return (
    <>
      <Layout>
        <Routes />
      </Layout>
    </>
  );
}

export default App;
