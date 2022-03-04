import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [userChoice, setUserChoice] = useState("rock");
  const [computerChoice, setComputerChoice] = useState("rock");
  const [userPoints, setUserPoints] = useState(0);
  const [computerPoints, setComputerPoints] = useState(0);
  const [turnResult, setTurnResult] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const choices = ["rock", "paper", "scissors"];

  // Since the computer generated choice and the person generated choice happen in the same function call it doesnt make sense to have a useEffect.

  const handleOnClick = (choice) => {
    setUserChoice(choice);
    generateComputerChoice();

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
    // Setting state is asynchronous operation, so the if check runs before the values are actually set. Thats why we cant use the the condition here
    // Instead, we put it on the useEffect below. We could also use async await.
    if (computerPoints === 5 || userPoints === 5) {
      setGameOver(true);
    }
  };

  // Creating a useEffect, that will check for ending the game, and will be updated with the user points

  useEffect(() => {
    if (computerPoints === 5 || userPoints === 5) {
      setGameOver(true);
    }
  }, [computerPoints, userPoints]);

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
