import React, { useState, useEffect } from "react";
import "./style.css";
function CountDown({ hr, min, sec }) {
  const [over, setOver] = useState(false);
  const [pause, setPause] = useState(true);
  const [[h, m, s], setTime] = useState([hr, min, sec]);

  const tick = () => {
    console.log("triggered");
    if (pause || over) {
      return;
    } else if (s === 0) {
      setTime([h, m - 1, 59]);
    } else if (m === 0 && s === 0) {
      setTime([h - 1, 59, 59]);
    } else if (h === 0 && m === 0 && s === 0) {
      setOver(true);
    } else {
      setTime([h, m, s - 1]);
    }
  };
  useEffect(() => {
    let ticker = setInterval(() => tick(), 1000);
    return () => {
      clearInterval(ticker);
    };
  });

  const handlePause = () => {
    setPause(!pause);
  };

  const handleReset = () => {
    setTime([hr, min, sec]);
    setPause(true);
    setOver(false);
  };

  let format = (num) => {
    let output = num.toString().padStart(2, "0");
    return output;
  };

  return (
    <>
      <h3 className="countDown">
        {format(h)} : {format(m)} : {format(s)}
      </h3>
      <button onClick={handlePause}>{pause ? "Start" : "Pause"}</button>
      <button onClick={handleReset}>Reset</button>
    </>
  );
}
function App() {
  return (
    <>
      <CountDown hr={3} min={9} sec={10} />
    </>
  );
}

export default App;
