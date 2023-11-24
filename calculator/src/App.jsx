import React, { useState } from "react";
import "./App.css";

export const App = () => {
  const [input, setInput] = useState("");
  const buttons = [
    "AC",
    "DEL",
    "%",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "00",
    "0",
    ".",
    "=",
  ];

  const handleClick = (value) => {
    if (value === "=") {
      setInput(eval(input).toString());
    } else if (value === "AC") {
      setInput("");
    } else if (value === "DEL") {
      setInput(input.slice(0, -1));
    } else {
      setInput(input + value);
    }
  };

  return (
    <div className="container">
      <div className="calculator">
        <input
          type="text"
          id="inputBox"
          value={input}
          placeholder="0"
          readOnly
        />
        <div>
          {buttons.map((button, index) => (
            <button
              key={index}
              className={`button ${isNaN(button) ? "operator" : ""}`}
              onClick={() => handleClick(button)}
            >
              {button}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
