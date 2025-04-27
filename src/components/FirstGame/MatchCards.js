import React, { useCallback, useEffect, useState } from "react";
import SingleCard from "./SingleCard";

const MatchCards = ({ cardImages, handleGameOver }) => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [cardsFlipped, setCardsFlipped] = useState(0);

  const turnMatched = () => {
    let cardsToFlip = [];
    cards.forEach((card) => {
      cardsToFlip.push({
        ...card,
        matched: false,
      });
    });
    setCards((prev) => cardsToFlip);
  };

  const shuffleCards = useCallback(() => {
    setChoiceOne((prev) => null);
    setChoiceTwo((prev) => null);
    setTurns((prevTurns) => 0);
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index + 1 }));
    setTimeout(() => {
      setCards((prevCards) => shuffledCards);
    }, 500);
  }, [cardImages]);

  const handleChoice = (card) => {
    console.log("Card details : ", card);
    choiceOne ? setChoiceTwo((prev) => card) : setChoiceOne((prev) => card);
  };
  const addTurn = () => {
    setChoiceOne((prev) => null);
    setChoiceTwo((prev) => null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne?.src === choiceTwo?.src) {
        console.log("Cards match!!");
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              setCardsFlipped((prev) => prev + 1);
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
      } else {
        console.log("Uh Oh! Cards don't match");
      }
      setTimeout(() => {
        addTurn();
      }, 1500);
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffleCards();
  }, [shuffleCards]);

  useEffect(() => {
    if (cardsFlipped === 12) {
      handleGameOver();
    }
  }, [cardsFlipped]);

  return (
    <>
      <h1>Magic Match</h1>
      <button
        onClick={() => {
          turnMatched();
          shuffleCards();
        }}
      >
        New Game
      </button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card.matched || card === choiceOne || card === choiceTwo}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns : {turns}</p>
    </>
  );
};

export default MatchCards;
