import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Controls } from "./internal/Controls";

async function prepare() {
  if (process.env.NODE_ENV === "development") {
    const { worker } = require("./internal/mocks/browser");
    return worker.start();
  }
}

prepare().then(() => {
  createRoot(document.getElementById("root")).render(
    <>
      <Controls />
      <App />
    </>
  );
});
