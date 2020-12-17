import { init } from "@datadog/ui-apps-sdk";
import { useEffect } from "react";

let DDClient = null;

function Controller() {
  useEffect(() => {
    DDClient = init({ debug: true }, (c) => {
      console.log("Controller initialized");
    });
  }, []);

  return (
    <section style={{ padding: "10px" }}>
      <p>
        This is your main iframe.
        <a href="/widget"> Click here to go to your widget </a>
      </p>
    </section>
  );
}

export default Controller;
