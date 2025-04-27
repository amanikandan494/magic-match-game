import { useCallback, useState } from "react";
import "./App.css";
import MatchCards from "./components/FirstGame/MatchCards.js";
import Wordle from "./components/SecondGame/Wordle.js";

const cardImages = [
  { src: "/img/chaaya.jpg", matched: false },
  { src: "/img/chendamelam.jpg", matched: false },
  { src: "/img/kathakali.jpg", matched: false },
  { src: "/img/theyyam.jpg", matched: false },
  { src: "/img/thiruvathira.jpg", matched: false },
  { src: "/img/sadhya.jpg", matched: false },
];
function App() {
  const [isFirstGame, setIsFirstGame] = useState(true);
  const [isSecondGame, setIsSecondGame] = useState(false);
  const [isFirstGameOver, setIsFirstGameOver] = useState(false);

  const handleNextOnFirst = () => {
    setIsFirstGame((prev) => false);
    setIsSecondGame((prev) => true);
  };
  const handleNextOnSecond = () => {
    setIsSecondGame((prev) => false);
  };
  const handleGameOver = useCallback(() => {
    setIsFirstGameOver((prev) => true);
  }, []);

  return (
    <div className="App">
      {isFirstGame && (
        <>
          <MatchCards cardImages={cardImages} handleGameOver={handleGameOver} />
          <br />
          {isFirstGameOver && (
            <>
              <div className="alert alert-success">
                <strong>You have won this game!</strong>
              </div>
              <button className="nextgame-btn" onClick={handleNextOnFirst}>
                Next Game
              </button>
            </>
          )}
        </>
      )}
      {isSecondGame && (
        <>
          <Wordle />
          <br />
          <button className="nextgame-btn" onClick={handleNextOnSecond}>
            Next Game
          </button>
        </>
      )}
    </div>
  );
}

export default App;
