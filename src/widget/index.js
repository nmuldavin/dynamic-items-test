import { init } from "@datadog/ui-apps-sdk";

import "./widget.css";
import "typeface-roboto";
import "milligram";
import { useEffect, useState } from "react";

let DDClient = null;

function Widget() {
  const [name, setName] = useState("Datadog user");
  const [metric, setMetric] = useState("system.cpu.idle");

  useEffect(() => {
    DDClient = init({ debug: true }, (c) => {
      setName(c.appContext.currentUser.handle);
      setMetric(c.frameContext.options.metric);
    });

    DDClient.events.on(
      "dashboard_custom_widget_options_change",
      ({ metric }) => {
        setMetric(metric);
      }
    );
  }, []);

  return (
    <section style={{ padding: "10px" }}>
      <h2>Hello {name} 👋</h2>
      <p>Welcome to your first Datadog application.</p>
      <p>Your favorite metric is: {metric}</p>
    </section>
  );
}

export default Widget;
