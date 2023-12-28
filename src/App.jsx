import { useState } from "react";
import InitialPage from "./components/InitialPage";
import Form from "./components/Form";

function App() {
  let [position, setPosition] = useState("initial");
  return (
    <div className="min-h-screen ">
      {position === "initial" ? (
        <InitialPage setPosition={setPosition} />
      ) : null}
      {position === "form" ? <Form /> : null}
    </div>
  );
}

export default App;
