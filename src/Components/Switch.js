import React, { useEffect, useState } from "react";
import "./switch.css";
import Card from "./Card";

function Switch(props) {
  const { data } = props;

  const [activeName, setActiveName] = useState(null);
  const [cardData, setCardData] = useState(null);

  const handleSetCurrentData = (data) => {
    setActiveName(data.name);
    setCardData(data)
  };

 

  return (
    <div>
      <ul className="listHolder">
        {data?.map((singleData, index) => {
          return (
            <li key={singleData.name}>
              <button
                onClick={() => handleSetCurrentData(singleData)}
                className={`switchName ${
                  activeName == singleData.name ? "active" : ""
                }`}
              >
                {singleData.name}
              </button>

              {/* {activeName == singleData.name && ( */}
              {/* <Card
                  header={singleData.heading}
                  content={singleData.content}
                  code={singleData.code}
                /> */}
              {/* )} */}
            </li>
          );
        })}

        <li>Clear</li>
      </ul>

     {cardData ? <Card
        header={cardData.heading}
        content={cardData.content}
        code={cardData.code}
      /> : <p>Please select a topic.</p>}
    </div>
  );
}

export default Switch;
