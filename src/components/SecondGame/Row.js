import React from "react";

const Row = ({ guess }) => {
  return (
    <div className="row">
      {guess.map((guessLetter, index) => {
        return (
          <div key={index} className={`square ${guessLetter?.color}`}>
            {guessLetter?.letter}
          </div>
        );
      })}
    </div>
  );
};

export default Row;
