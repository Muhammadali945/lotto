import React from "react";
import "./App.css";
import { Balls } from "./Lottery/lottery.js";
const App = () => {
  const Maxcounter = 6;
  const [lotteryPool, setlotteryPool] = React.useState([]);
  const [counter, setCounter] = React.useState(0);
  const [lottery, setLottery] = React.useState(new Balls());

  const winnerBalls = [0, 1, 2, 3, 4, 5]

  React.useEffect(() => {
    // Populate the lottery pool at the start of the game once
    function populate() {
      let result = []
      for (let i = 1; i < 60; i++) {
        const ball =
        {
          value: i,
          selected: false
        }
        result.push(ball);
        // console.log(lotteryPool.length)
      }
      setlotteryPool([...result])
    }
    populate();
  }, []);

  function numberPressed(id) {
    if (counter === Maxcounter) {
      console.log("six balls picked...  Returning");
      return;
    }
    let updatedPool = [...lotteryPool].map((ball) => {
      if (ball.value === id) {
        ball.selected = !ball.selected
      }
      return ball;
    });
    setlotteryPool(updatedPool);
  }

  function toggleColor(id) {
    if (counter === 6) {
      console.log("six balls picked...  Returning");
      return;
    }
    let undo = false;
    let updatedPool = [...lotteryPool].map((ball) => {
      if (ball.value === id && ball.selected === true) {
        console.log("same button pressed with id number: " + id);
        undo = true
      }

    });
    if (undo) {
      let updatedCounter = counter + 1
      setCounter(updatedCounter);
      document.getElementById("number" + counter).innerHTML = id
    }
    else {
      let updatedCounter = counter - 1
      setCounter(updatedCounter);
      document.getElementById("number" + updatedCounter).innerHTML = ""
    }
  }

  function resetGame() {
    lotteryPool.map((ball) => {
      if (ball.selected === true) {
        ball.selected = false;
      }
    });
    setCounter(0);
    winnerBalls.map((ball) => {
      document.getElementById("number" + ball).innerHTML = ""
    })
    document.getElementById("winning-line").innerHTML = "Pick balls and press play for draw!!!"

  }

  async function startLottery() {
    if (counter < Maxcounter) {
      displayResult(7);
      return;
    }
    document.getElementById("winning-line").innerHTML = "Winning Numbers for the Draw!!!"
    const lottery = new Balls();
    setLottery(lottery);
    lottery.startGame();
    await Async();
    let wins = lottery.getWinNumber();
    checkWinAmount(wins);
  }

  function Async() {
    return new Promise((res) => {
      setTimeout(() => {
        res();
      }, 3000);
    });
  }

  function checkWinAmount(winningNumbers) {
    let matchedNumbers = 0;
    let win = [];
    win = winningNumbers
    let selected = []
    lotteryPool.map((ball) => {
      if (ball.selected === true) {
        selected.push(ball.value);
      }
    })
    for (let i = 0; i < win.length; i++) {
      for (let j = 0; j < selected.length; j++) {
        if (win[i] === selected[j]) {
          matchedNumbers++;
        }
      }
    }
    displayResult(matchedNumbers);
  }

  function displayResult(matchedNumbers) {
    switch (matchedNumbers) {
      case 0:
        document.getElementById("info_text").innerHTML = "Sorry! No luck this time"
        break;

      case 3:
        document.getElementById("info_text").innerHTML = "Hurray! You Won £30"
        break;

      case 4:
        document.getElementById("info_text").innerHTML = "Hurray! You Won £100"
        break;

      case 5:
        document.getElementById("info_text").innerHTML = "Hurray! You Won £200"
        break;

      case 6:
        document.getElementById("info_text").innerHTML = "Hurray! You Won £500"
        break;

      case 7:
        document.getElementById("info_text").innerHTML = "Please Select 6 numbers before starting lottery"
        break;

      default:
        document.getElementById("info_text").innerHTML = matchedNumbers + " Matched. Match atleast 3 balls to win lottery"
        break;
    }
    console.log(matchedNumbers);
    document.getElementById("popup_box").style.visibility = "visible"
    document.getElementById("popup_box").style.display = "block"
  }

  function hidepopup() {
    document.getElementById("popup_box").style.visibility = "hidden";
    if (counter === Maxcounter)
    {
      lottery.resetNumbers();
      resetGame();
    }
  }

  function pickLuckyDip() {
    if (counter === Maxcounter) {
      return;
    }
    resetGame();
    lottery.pickNumbers();
    let luckyNumbers = lottery.getWinNumber();
    let updatedPool = lotteryPool.map((ball) => {
      if (luckyNumbers.includes(ball.value)) {
        ball.selected = true;
        toggleColor(ball.value);
      }
      return ball;
    })
    setlotteryPool(updatedPool);
    winnerBalls.map((ball) => {
      document.getElementById("number" + ball).innerHTML = luckyNumbers[ball]
    })
    setCounter(6);
  }

  return (
    <div className="App">
      <h1>LOTTO MILLIONAIRE</h1>
      <p>Pick six balls or try a Lucky Dip</p>
      <div class="grid-container">
        {lotteryPool.length > 0 && lotteryPool.map((ball) => <button class="button" id={ball.value}
         className={ ball.selected ? 'button2' : 'button' }
          key={ball.value} onClick={() => {
          numberPressed(ball.value);
          toggleColor(ball.value);
        }}>{ball.value}</button>)}
      </div>
      <p>Your selected balls for the Draw</p>
      <div class="selected-balls-container">
        {
          winnerBalls.map((ball) => {
            return <div id={"number" + ball} key={ball} class="selected-balls">{ball.value}</div>
          })
        }
      </div>
      <div class="button-container">
        <button class="button-28" key="bu-on" onClick={() => resetGame()}>Reset</button>
        <button class="button-28" key="bu-on1" onClick={() => startLottery()}>Play</button>
        <button class="button-28" key="bu-on2" onClick={() => pickLuckyDip()}>Lucky Dip</button></div>
      <p id="winning-line">Pick balls and press play for draw!!!</p>
      <div class="selected-balls-container">
        {
          winnerBalls.map((ball) => {
            return <div id={"balls" + "_" + ball} key={ball} class="win-balls"></div>
          })
        }
      </div>
      <div id="popup_box">
        <input type="button" id="cancel_button" value="X" onClick={() => { hidepopup(); }}></input>
        <p id="info_text">To be populated.
        </p><input type="button" id="close_button" value="Close" onClick={() => { hidepopup(); }}></input>
      </div>
    </div>
  );
};
export default App;
