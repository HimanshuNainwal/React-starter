import { useState } from "react";
import CoreConceptImg from "./assets/react-core-concepts.png";
import Switch from "./Components/Switch";

function App() {
  const switchData = [
    {
      name: "components",
      heading: "Components",
      content:
        "Components are the building blocks of React applications. A component is a self-contained module (HTML + optional CSS + JS) that renders some output.",
      code: `function Welcome() {
        return <h1>Hello, World!</h1>;
      }`,
    },
    {
      name: "JSX",
      heading: "JSX",
      content:
        "JSX is a syntax extension to JavaScript. It is similar to a template language, but it has full power of JavaScript (e.g., it may output dynamic content). ",
      code: `<div>
      <h1>Welcome {userName}</h1>
      <p>Time to learn React!</p>
    </div>`,
    },
    {
      name: "Props",
      heading: "Props",
      content:
        "Components accept arbitrary inputs called props. They are like function arguments.",
      code: `function Welcome(props) {
        return <h1>Hello, {props.name}</h1>;
      }`,
    },
    {
      name: "State",
      heading: "State",
      content:
        "State allows React components to change their output over time in response to user actions, network responses, and anything else.",
      code: `function Counter() {
        const [isVisible, setIsVisible] = useState(false);
      
        function handleClick() {
          setIsVisible(true);
        }
      
        return (
          <div>
            <button onClick={handleClick}>Show Details</button>
            {isVisible && <p>Amazing details!</p>}
          </div>
        );
      }`,
    },
  ];
  return (
    <div>
      <header>
        <img src={CoreConceptImg} alt="Stylized atom" />

        <h1 className="myHiCkjasndkajnslass" id="myH1">
          React Essentials
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
