import React, { useEffect, useState } from "react";
import "./switch.css"

function Switch(props) {
  const { data } = props;

  const [activeName,setActiveName] = useState(null )


  console.log('activeName',activeName);
  return (
    <div>
      <ul className="listHolder">
   
      {data.map((singleData) => {
        return <li> <button onClick={() => setActiveName(singleData.name)} className={`switchName ${activeName == singleData.name ? "active"  :""}`} > {singleData.name} </button> </li>;
      })}

      </ul>
    </div>
  );
}

export default Switch;
