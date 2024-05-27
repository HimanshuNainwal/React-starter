import React, { useEffect, useState } from "react";

function PlayerCard({ name, symbol }) {

  const [playerName, setPlayerName] = useState(name);

  const [edit, setEdit] = useState(false);

//   edit = true




console.log("playerName",playerName ,"edit",edit)

  // 1 when we will click on edit edit will change to save and player name span will change to input box

  const handleSave = () => {
    setEdit(false);
  };

  return (
    <li className="active">
      <span className="player">
        {edit ? (
          <input
            type="text"
            value={playerName}
            onChange={(e) => {
              setPlayerName(e?.target?.value);
            }}
          />
        ) : (
          <span className="player-name">{playerName}</span>
        )}

        <span className="player-symbol">{symbol}</span>
      </span>
      {edit ? (
        <button onClick={handleSave}>Save</button>
      ) : (
        <button onClick={() => setEdit(true)}>Edit</button>
      )}
    </li>
  );
}

export default PlayerCard;
