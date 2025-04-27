import { useState, useEffect } from "react";

const useWordleHook = (solution) => {
  console.log("The solution  is : ", solution);
  let solutionLetters = [...solution];
  const [guesses, setGuesses] = useState(
    Array.from({ length: 6 }, () =>
      Array.from({ length: 5 }, () => ({
        letter: "",
        color: "white",
      }))
    )
  );
  const [turns, setTurns] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentGuess, setCurrentGuess] = useState("");
  const [currentGuessArr, setCurrentGuessArr] = useState(
    Array.from({ length: 5 }, () => ({
      letter: "",
      color: "blackLetters",
    }))
  );
  const [history, setHistory] = useState([]);

  const addGuess = () => {
    let guessesArr = [...guesses];
    let newGuess = [...currentGuess].map((letter) => ({
      letter: letter,
      color: "grey",
    }));
    if (currentGuess === solution) {
      setIsCorrect((prev) => true);
    }

    //function to turn all matching letters to green
    newGuess.forEach((item, index) => {
      if (item.letter === solutionLetters[index]) {
        newGuess[index] = {
          ...newGuess[index],
          color: "green",
        };
        solutionLetters[index] = null;
      }
    });
    // to turn all available letters in wrong positions to yellow
    newGuess.forEach((item, index) => {
      if (
        solutionLetters.includes(item.letter) &&
        newGuess[solutionLetters.indexOf(item.letter)].color !== "green"
      ) {
        newGuess[index] = {
          ...newGuess[index],
          color: "yellow",
        };
        solutionLetters[solutionLetters.indexOf(item.letter)] = null;
        console.log("solution letters : ", solutionLetters);
      }
    });
    console.log("New guess after formatting : ", newGuess);
    guessesArr[turns] = [...newGuess];
    console.log("Guesses Array :", guessesArr);
    setCurrentGuess((prev) => "");
    setTimeout(() => {
      setTurns((prev) => prev + 1);
      setGuesses((prevGuesses) => guessesArr);
      setHistory((prevHistory) => [...prevHistory, currentGuess]);
    }, 100);
  };

  const handleKeyUp = ({ key }) => {
    const regex = /^[A-Za-z]$/;
    if (isCorrect) {
      return;
    }
    if (turns > 5) {
      console.log("You have used up all the available number of guesses");
      return;
    }
    if (key === "Enter") {
      if (history.includes(currentGuess)) {
        console.log("You have already tried this word!!");
        return;
      }
      if (currentGuess.length !== 5) {
        console.log("Enter words five characters long");
        return;
      }
      addGuess();
      return;
    }
    if (key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1));
    }
    if (regex.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key);
      } else {
        setCurrentGuess((prev) => key);
      }
    }
  };
  useEffect(() => {
    if (currentGuess.length > 0) {
      let currentGuessLetters = [...currentGuess].map((letter) => ({
        letter: letter,
        color: "blackLetters",
      }));
      for (let i = 0; i < 5 - currentGuess.length; i++) {
        currentGuessLetters.push({
          letter: "",
          color: "blackLetters",
        });
      }
      setCurrentGuessArr((prev) => currentGuessLetters);
    } else {
      setCurrentGuessArr((prev) =>
        Array.from({ length: 5 }, () => ({
          letter: "",
          color: "blackLetters",
        }))
      );
    }
  }, [currentGuess]);

  return {
    turns,
    currentGuess,
    currentGuessArr,
    guesses,
    isCorrect,
    handleKeyUp,
  };
};

export default useWordleHook;
