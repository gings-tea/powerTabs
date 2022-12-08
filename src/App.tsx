import React from "react";
import { useState } from "react";
import Tab from "./components/Tab";

function App(): JSX.Element {
  const [active, setActive] = useState(0);
  function onActiveChange(index: number) {
    setActive(index);
  }
  return (
    <div>
      <h1>Uncontrolled</h1>
      <Tab initialActive={0}>
        <Tab.Pane title="A">First Pane Body</Tab.Pane>
        <Tab.Pane title="B">Second Pane Body</Tab.Pane>
      </Tab>

      <h1>Controlled</h1>
      <Tab active={active} onActiveChange={onActiveChange}>
        <Tab.Pane title="A">First Pane Body</Tab.Pane>
        <Tab.Pane title="B">Second Pane Body</Tab.Pane>
      </Tab>
    </div>
  );
}

export default App;
