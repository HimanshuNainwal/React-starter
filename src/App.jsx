import { useState } from "react";
import PlayerCard from "./components/PlayerCard";
import GameBoard from "./components/GameBoard";

// const initialPlayerNames = ["Player 1", "Player 2","Player 3","Player 4"]

const initialArray = [
  [null, null, null], //0
  [null, null, null], // 1
  [null, null, null], //2
];

let test = "X"




function App() {
  const [boardValues, setBardValues] = useState(initialArray);

  // const [players, setPlayers] = useState({
  //   x: "player 1",
  //   o: "player 2",
  // });

const [count,setCount] = useState(0)

console.log("count",count);


const handleCount = () => {

  // setCount((previousState) => {
  //   return previousState + 1
  // })  
  // //1 

  // setCount((previousState) => {
  //   return previousState + 1
  // })   //2

  setCount(state => {
    return state + 5
  })


}

  const [players, setPlayers] = useState([
    { name: "player 1", symbol: "X" },
    { name: "player 2", symbol: "O" },
  ]);
  const [currentPlayer, setCurrentPlayer] = useState("X");

  const handleSetBoardValue = (outerIndex, innerIndex) => {
    const updatedBoard = boardValues.map((outerRow, index) => {
      return outerRow.map((innerRow, index2) => {
        if (innerRow !== null) {
          ///0 - 9
          return innerRow;
        } else if (outerIndex == index && innerIndex == index2) {
          
          if (currentPlayer === "X") setCurrentPlayer("O");
          else setCurrentPlayer("X");
          
          return currentPlayer;
        } else {
          return innerRow;
        }
      });
    });

    setBardValues(updatedBoard);
  };

  return (
    <div id="game-container">


      <button onClick={handleCount}>Counter {count}</button>
      <ol id="players" className="highlight-player">
        {players?.map((data) => {
          return (
            <PlayerCard
              key={data.symbol}
              name={data.name}
              symbol={data.symbol}
              active={data.symbol == currentPlayer}
            />
          );
        })}
        {/* <PlayerCard name={players.x} symbol={"x"} active={players.x == currentPlayer} />  

        <PlayerCard name={players.o} symbol={"o"} active={players.o == currentPlayer} />  */}
      </ol>

      <GameBoard board={boardValues} handleChange={handleSetBoardValue} />
    </div>
  );
}
export default App;
