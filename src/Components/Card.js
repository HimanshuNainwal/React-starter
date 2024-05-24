import React from "react";
import "./card.css";

function Card({ header, content, code }) {

  // console.log("header",header,"content",content,"code",code)
  return (
    <div className="tab-content">
      {header && <h3>{header}</h3>}

      {content && <p>{content}</p>}

      {code && (
        <div>
          <code>{code}</code>
        </div>
      )}
    </div>
  );
}

export default Card;
