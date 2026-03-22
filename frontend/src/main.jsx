import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AOS from "aos";
import "aos/dist/aos.css";

function Root() {
  useEffect(() => {
    AOS.init({ once: true, duration: 600, easing: "ease-out" });
  }, []);

  return <App />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
