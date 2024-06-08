import { useEffect, useState } from "react";
import PlayerCard from "./components/PlayerCard";
import GameBoard from "./components/GameBoard";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

// const initialPlayerNames = ["Player 1", "Player 2","Player 3","Player 4"]

const initialArray = [
// col 0    1     2    row
  [null, null, null], //0
  [null, null, null], // 1
  [null, null, null], //2
];



function App() {
  const [boardValues, setBardValues] = useState(initialArray);

  const [players, setPlayers] = useState([
    { name: "player 1", symbol: "X" },
    { name: "player 2", symbol: "O" },
   
  ]);

  const [currentPlayer, setCurrentPlayer] = useState("X");

  const [winner,setWinner] = useState("")
  const [winnerSymbol,setWinnerSymbol] = useState("")

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

  const handleRematch = () => {
    setWinner(false)
    setBardValues(initialArray)
    setCurrentPlayer("X")
  }


  useEffect(() => {
    // WINNING_COMBINATIONS
    for (let combination of WINNING_COMBINATIONS) {
      // [
    // { row: 1, column: 0 },
    // { row: 1, column: 1 },
    // { row: 1, column: 2 },
      // ],
      // [0,0]
      // [0,1]

      // [null, null, null], //0
      // ["x", "x", "x"], // 1
      // [null, null, null],

      // [
      //   { row: 0, column: 0 },
      //   { row: 1, column: 1 },
      //   { row: 2, column: 2 },
      // ],


      // [

      //   ['X', null, null]
      //   ['O', 'X', null] 
      //   ['O', null, 'X']
        
      // ]

      // ['X', null, null][0] = x
      // boardValues[0][0]
      // boardValues[0][1]
      // boardValues[0][2]
      // // combination 2
      // boardValues[1][0]
      // boardValues[1][1]
      // boardValues[1][2]
      // // combination 3 
      // boardValues[2][0]
      // boardValues[2][1]
      // boardValues[2][2]
      //  // combination 4 
      //  boardValues[0][0]
      //  boardValues[1][0]
      //  boardValues[2][0]

      const firstSquareSymbol =  boardValues[combination[0].row][combination[0].column]; // x
      const secondSquareSymbol = boardValues[combination[1].row][combination[1].column];  // x
      const thirdSquareSymbol =  boardValues[combination[2].row][combination[2].column]; // x

      if(firstSquareSymbol  && firstSquareSymbol == secondSquareSymbol && firstSquareSymbol == thirdSquareSymbol  ){
          setWinner(true)
          setWinnerSymbol(firstSquareSymbol)
      }
    }
  }, [boardValues]);


  return (
    <div id="game-container">
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
        {winner && <GameOver winner={winnerSymbol} onRestart={handleRematch} />}
      <GameBoard board={boardValues} handleChange={handleSetBoardValue} />
    </div>
  );
}
export default App;
