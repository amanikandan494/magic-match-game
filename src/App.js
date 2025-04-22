import { useEffect, useState } from 'react';
import './App.css'
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/chaaya.jpg", "matched": false },
  { "src": "/img/chendamelam.jpg", "matched": false },
  { "src": "/img/kathakali.jpg", "matched": false },
  { "src": "/img/theyyam.jpg", "matched": false },
  { "src": "/img/thiruvathira.jpg", "matched": false },
  { "src": "/img/sadhya.jpg", "matched": false },
]
function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  console.log(cards, turns);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index + 1 }));
    setCards(prevCards => shuffledCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => 0);
  }
  const handleChoice = (card) => {
    console.log("Card details : ", card);
    choiceOne ? setChoiceTwo(prev => card) : setChoiceOne(prev => card);
  }
  const addTurn = () => {
    setChoiceOne(prev => null);
    setChoiceTwo(prev => null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne?.src === choiceTwo?.src) {
        console.log("Cards match!!");
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
      } else {
        console.log("Uh Oh! Cards don't match");
      }
      setTimeout(() => {
        addTurn();
      }, 1500);
    }
  }, [choiceOne, choiceTwo])
  useEffect(() => { shuffleCards() }, [])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {
          cards.map((card) => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card.matched || card === choiceOne || card === choiceTwo}
              disabled={disabled}
            />
          ))
        }
      </div>
      <p>Turns : {turns}</p>
    </div>
  );
}

export default App