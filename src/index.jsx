import React from "react";
import ReactDOM from "react-dom/client";
import * as serviceWorker from "./serviceWorker";
import "./index.css";
import App from "./App";


const RootComponent = () => {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RootComponent />);

serviceWorker.register();