import { useState } from "react";
import "./App.css";
import MatchCards from "./components/FirstGame/MatchCards.js";

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

  return (
    <div className="App">
      {isFirstGame && <MatchCards cardImages={cardImages} />}
    </div>
  );
}

export default App;
