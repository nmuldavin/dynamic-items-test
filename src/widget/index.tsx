import { init, UiAppEventType } from "@datadog/ui-apps-sdk";

import "./widget.css";
import "typeface-roboto";
import "milligram";
import { useEffect, useState } from "react";

const client = init ({ debug: true });

function Widget() {
  const [name, setName] = useState("Datadog user");
  const [metric, setMetric] = useState("system.cpu.idle");

  useEffect(() => {
    client.getContext().then(c => {
      setName(c.app.currentUser.handle);
      setMetric(c.widget?.definition.options?.metric);
    })

    client.events.on(
      UiAppEventType.DASHBOARD_CUSTOM_WIDGET_OPTIONS_CHANGE,
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
