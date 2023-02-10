import React from "react";
import "./App.css";
import Die from "./components/Die";

function App() {
  const [dice, setDice] = React.useState(allNewDice);

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(Math.ceil(Math.random() * 6));
    }
    return newDice;
  }

  const diceElements = dice.map((item) => <Die value={item} />);

  function rollDice() {
    setDice(allNewDice);
  }

  return (
    <div className="Container">
      <main>
        <div className="die-container">{diceElements}</div>
        <button
          onClick={rollDice}
          name="button"
          className="roll-btn"
          value="Roll"
        >
          Roll
        </button>
      </main>
    </div>
  );
}

export default App;
