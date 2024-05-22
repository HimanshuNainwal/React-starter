import { useState } from "react";
import CoreConceptImg from "./assets/react-core-concepts.png";
import Switch from "./Components/Switch";

function App() {
  const [name, setName] = useState("Himanshu");

  const switchData = [
    {
      name: "components",
    },
    {
      name: "JSX",
    },
    {
      name: "Props",
    },
    {
      name: "State",
    },
  ];
  return (
    <div>
      <header>
        <img src={CoreConceptImg} alt="Stylized atom" />

        <h1 className="myHiCkjasndkajnslass" id="myH1">
          React Essentials {name}
        </h1>

        <p>
          Fundamental React concepts you will need for almost any app you are
          going to build!
        </p>
      </header>
      <main>
        <Switch data={switchData} />
      </main>
    </div>
  );
}

export default App;
