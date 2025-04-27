import React, { useEffect, useState } from "react";
import "./Wordle.css";
import useWordleHook from "./hooks/useWordleHook";
import Row from "./Row";

const Wordle = () => {
  const [solution, setSolution] = useState({
    word: "",
  });

  const { guesses, turns, currentGuessArr, isCorrect, handleKeyUp } =
    useWordleHook(solution?.word);

  useEffect(() => {
    fetch("http://localhost:3001/solutions")
      .then((res) => res.json())
      .then((jsonData) => {
        console.log("Json data : ", jsonData);
        setSolution(
          (prev) => jsonData[Math.floor(Math.random() * jsonData.length)]
        );
      });
  }, []);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp]);

  return (
    <div>
      <h1>Wordle</h1>
      <div className="grid-container">
        {guesses?.map((guess, index) => {
          if (index === turns) {
            return <Row key={index} guess={currentGuessArr} />;
          }
          return <Row key={index} guess={guess} />;
        })}
      </div>
      {isCorrect && (
        <div className="alert alert-success">
          <strong>You have won this game!</strong>
        </div>
      )}
    </div>
  );
};
export default Wordle;
