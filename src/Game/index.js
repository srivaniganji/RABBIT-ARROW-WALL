import React, { useEffect, useState } from "react";

function Game() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [isActive, setActive] = useState(false);
  const [time, setTime] = useState(0);
  const [result, setResult] = useState("-");

  const handleStart = () => {
    setComputerScore(0);
    setPlayerScore(0);
    setResult("");
    setTime(60);
    setActive(true);
  };

  const handlePause = () => {
    setActive(false);
  };

  const handleReset = () => {
    setActive(false);
    setComputerScore(0);
    setPlayerScore(0);
    setResult("");
    setTime(60);
  };

  function handleChoice(num) {
    const randomIndex = Math.floor(Math.random() * 100);
    setComputerChoice(randomIndex % 3);
    if (isActive) {
      setPlayerChoice(num);
      if (
        (computerChoice === 0 && playerChoice === 1) ||
        (computerChoice === 1 && playerChoice === 2) ||
        (computerChoice === 2 && playerChoice === 0)
      ) {
        setPlayerScore(playerScore + 1);
      } else {
        setComputerScore(computerScore + 1);
      }
    }
  }

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) =>
          prevTime === 1 ? setActive(false) : prevTime - 1
        );
      }, 1000);
    } else {
      setTime("Time Up");
      setResult(
        playerScore > computerScore
          ? "Player"
          : playerScore === computerScore
          ? "Draw"
          : "Computer"
      );
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="bg-container">
      <h1>Rabbit Arrow Wall</h1>
      <h1>{time}</h1>
      <div>
        <br />
        {!isActive ? (
          <button onClick={handleStart}>Start</button>
        ) : (
          <button onClick={handlePause}>Pause</button>
        )}
        <button onClick={handleReset}>Reset</button>
      </div>
      <h4>computerChoice = {computerChoice}</h4>
      <h4>playerChoice = {playerChoice}</h4>
      <h2>Player Score = {playerScore}</h2>
      <h2>Computer Score = {computerScore}</h2>
      <button onClick={() => handleChoice(0)}>Rabbit</button>
      <button onClick={() => handleChoice(1)}>Arrow</button>
      <button onClick={() => handleChoice(2)}>Wall</button>

      <h1>Winner: {result} </h1>
    </div>
  );
}

export default Game;
