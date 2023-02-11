import { nanoid } from "nanoid";
import React, { useEffect } from "react";
import Confetti from "react-confetti";
import "./App.css";
import Die from "./components/Die";

function App() {
  const [dice, setDice] = React.useState(allNewDice);
  const [tenzies, setTenzies] = React.useState(false);
  const [rolls, setRolls] = React.useState(0);
  const [game, setGame] = React.useState(false);
  const [counter, setCounter] = React.useState(0);
  const [highScore, setHighScore] = React.useState("-");
  const [lastScore, setLastScore] = React.useState(0);

  useEffect(() => {
    if (game && !tenzies) {
      var timer = setInterval(() => {
        setCounter(counter + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [game, tenzies, counter]);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const allSameValue = dice.every((die) => die.value === dice[0].value);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
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
    if (!game) {
      setGame((oldGame) => !oldGame);
    } else {
      if (!tenzies) {
        setDice((oldDice) =>
          oldDice.map((die) => {
            return die.isHeld ? die : generateNewDie();
          })
        );
        countRolls();
      } else {
        setTenzies(false);
        setDice(allNewDice);
        setRolls(0);
        setGame(false);
        setLastScore(counter);
        if (highScore === "-") {
          setHighScore(counter);
        }
        if (counter < highScore) {
          setHighScore(counter);
        }
        setCounter(0);
      }
    }
  }

  function holdDice(id) {
    if (!game) {
    } else {
      // change isHeld=true when clicked
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
        })
      );
    }
  }

  // *** ROLL COUNTER ***
  function countRolls() {
    setRolls((oldRolls) => oldRolls + 1);
  }

  // *** TIMER ***
  const styles = {
    backgroundColor: game ? "#572dfd" : "#6be494",
  };

  return (
    <div className="Container">
      {tenzies && <Confetti />}
      <main>
        <div className="nav">
          <div className="scores">
            <p className="highScore">Last try: {lastScore} (s)</p>
            <p className="highScore">Best try: {highScore} (s)</p>
          </div>
          <div className="trackers">
            <p className="timePassed">Time: {counter} (s)</p>
            <p className="rollCount">Rolls: {rolls}</p>
          </div>
        </div>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="die-container">{diceElements}</div>
        <button
          onClick={rollDice}
          name="button"
          className="roll-btn"
          value="Roll"
          style={styles}
        >
          {!game ? "START GAME" : tenzies ? "NEW GAME" : "Roll"}
        </button>
      </main>
    </div>
  );
}

export default App;
