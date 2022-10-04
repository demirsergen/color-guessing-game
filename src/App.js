import "./App.css";
import { useState, useEffect } from "react";

const getRandomColor = () => {
  const hex = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  const color = new Array(6)
    .fill("")
    .map(() => hex[Math.floor(Math.random() * hex.length)])
    .join("");

  return `#${color}`;
};

function App() {
  const [color, setColor] = useState("");
  const [message, setMessage] = useState("");
  const [displayedOptions, setDisplayedOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [tryCount, setTryCount] = useState(0);

  const newGame = () => {
    const correctColor = getRandomColor();
    setColor(correctColor);
    setDisplayedOptions(
      [correctColor, getRandomColor(), getRandomColor()].sort()
    );
  };

  const checkAnswer = (chosenColor) => {
    if (chosenColor === color) {
      setMessage("Correct!");
      setScore((prev) => prev + 1);
      setTryCount((prev) => prev + 1);
      newGame();
    } else {
      setMessage("Wrong!");
      setTryCount((prev) => prev + 1);
    }
  };

  useEffect(() => {
    newGame();
  }, []);

  return (
    <div className="App">
      <h1 className="app__title">Color Guessing Game</h1>
      <div className="game_container">
        <div className="color_box" style={{ backgroundColor: color }}></div>
        <div className="color_options-container">
          {displayedOptions.map((color) => (
            <button
              key={color}
              onClick={() => checkAnswer(color)}
              className="option"
            >
              {color}
            </button>
          ))}
        </div>
        <h1 className={message === "Correct!" ? "correct" : "wrong"}>
          {message}
        </h1>
        <div className="score__container">
          <h1>
            SCORE: <span>{score}</span>
          </h1>
          <h1>
            TRIES: <span>{tryCount}</span>
          </h1>
          <h1>
            SUCCESS RATE:
            {score > 0 ? (
              <span> {((score / tryCount) * 100).toFixed(0)}%</span>
            ) : null}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default App;
