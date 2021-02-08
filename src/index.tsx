import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Controller from "./controller";
import Modal from './modal';

const getContent = () => {
  console.log(window.location.pathname);
  switch (window.location.pathname) {
    case '/modal': {
      return <Modal />
    }
    default: {
      return <Controller />
    }
  }
}

ReactDOM.render(
  <React.StrictMode>
    {getContent()}
  </React.StrictMode>,
  document.getElementById("root")
);
