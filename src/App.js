import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [userChoice, setUserChoice] = useState("rock");
  const [computerChoice, setComputerChoice] = useState("rock");
  const [userPoints, setUserPoints] = useState(0);
  const [computerPoints, setComputerPoints] = useState(0);
  const [turnResult, setTurnResult] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const choices = ["rock", "paper", "scissors"];

  const handleOnClick = (choice) => {
    setUserChoice(choice);
    generateComputerChoice();
  };

  useEffect(() => {
    switch (userChoice + computerChoice) {
      case "scissorspaper":
      case "rockscissors":
      case "paperrock":
        setTurnResult("YOU WIN!");
        setUserPoints((user) => user + 1);
        break;
      case "paperscissors":
      case "scissorsrock":
      case "rockpaper":
        setTurnResult("YOU LOSE!");
        setComputerPoints((computer) => computer + 1);
        break;
      case "rockrock":
      case "paperpaper":
      case "scissorsscissors":
        setTurnResult("ITS A DRAW!");
        break;
      default:
        console.log("Something is broken");
    }
    if (computerPoints === 5 || userPoints === 5) {
      setGameOver(true);
    }
    console.log("UserPoints:", userPoints, "computer Points:", computerPoints);
  }, [computerChoice, userChoice]);

  const generateComputerChoice = () => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice);
  };

  const reset = () => {
    setGameOver(false);
    setUserPoints(0);
    setComputerPoints(0);
  };

  return (
    <div className="App">
      <h1 className="heading">Rock Paper Scissprs</h1>
      <div className="score">
        <h1>User Points: {userPoints}</h1>
        <h1>Computer Points: {computerPoints}</h1>
      </div>
      <div className="choices">
        <div className="choice-user">
          {/* The image name and the state value are the same, so depending on the state, the image will change */}
          <img
            className="user-hand"
            src={`../images/${userChoice}.png`}
            alt="hey"
          />
        </div>
        <div className="choice-computer">
          <img
            className="computer-hand"
            src={`../images/${computerChoice}.png`}
            alt="not hey"
          />
        </div>
      </div>
      <div children="button-div">
        {choices.map((choice, index) => {
          return (
            <button
              className="button"
              key={index}
              onClick={() => handleOnClick(choice)}
            >
              {choice}
            </button>
          );
        })}
      </div>
      <div className="result">
        <h1>Turn result: {turnResult}</h1>

        {gameOver && (
          <div className="button-div">
            <button className="button" onClick={reset}>
              Restart game ?
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
