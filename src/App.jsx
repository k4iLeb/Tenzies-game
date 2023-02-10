import { nanoid } from "nanoid";
import React from "react";
import "./App.css";
import Die from "./components/Die";

function App() {
  const [dice, setDice] = React.useState(allNewDice);

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      const die = {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      };
      newDice.push(die);
    }
    // console.log(newDice);
    return newDice;
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  function rollDice() {
    setDice(allNewDice);
  }

  function holdDice(id) {
    // change isHeld=true when clicked
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
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
