import React, { useState } from "react";

const Keyboard = ({
  word,
  backgroundStyles,
  setBackgroundStyles,
  hangmanStage,
  setHangmanStage,
  array,
  stageIndex,
  setStageIndex,
}) => {
  //defines the layout of the virtual keyboard
  const keyboardLayout = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];

  //initializes the properties for the keyboard
  const initialKeyboardProps = keyboardLayout.flat().map((key) => ({
    letter: key,
    backgroundColor: "white",
  }));

  //creates to manage the properties of the keyboard
  const [keyboardProps, setKeyboardProps] = useState(initialKeyboardProps);

  //splits the word into an array
  const splitWord = word.split("");

  //initializes a function to count the number of transparent backgrounds
  const backgroundChecker = () => {
    const styles = [...backgroundStyles];
    let count = 0;

    styles.forEach((element) => {
      if (element.backgroundColor === "transparent") {
        count++;
      }
    });
    return count;
  };

  //initializes a function to handle the button click
  const checkClicked = (key) => {
    key = key.toLowerCase();
    const indices = [];
    const updatedBackgroundStyles = [...backgroundStyles];

    //finds all the occurrences of the key in splitWord
    for (let i = 0; i < splitWord.length; i++) {
      if (splitWord[i] === key) {
        indices.push(i);
      }
    }

    if (indices.length > 0) {
      //updates the backgroundColor property of the objects at the specified indices
      indices.forEach((index) => {
        updatedBackgroundStyles[index].backgroundColor = "transparent";
      });
      //updates the state with the modified array
      setBackgroundStyles(updatedBackgroundStyles);
    }

    //if the key is not in the word, update the Hangman stage and index
    if (!splitWord.includes(key)) {
      let index = stageIndex;
      index++;
      setHangmanStage(array[index]);
      setStageIndex(index);
    }

    //creates a copy of keyboardProps and updates the backgroundColor based on the splitWord array
    const updatedKeyboardProps = [...keyboardProps];
    updatedKeyboardProps.forEach((item) => {
      if (item.letter.toLowerCase() === key) {
        item.backgroundColor = splitWord.includes(key) ? "lime" : "rgb(251, 113, 113)";
      }
      if (backgroundChecker() === splitWord.length) {
        item.backgroundColor = "white";
      }
    });

    //updates the state with the modified array
    setKeyboardProps(updatedKeyboardProps);
  };

  return (
    <div className="virtual-keyboard">
      {keyboardLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key, keyIndex) => {
            const keyProps = keyboardProps.find((item) => item.letter === key);

            return (
              <button
                key={keyIndex}
                className="keyboard-key"
                style={{ backgroundColor: keyProps ? keyProps.backgroundColor : "white" }}
                onClick={() => {
                  key = key.toLowerCase();

                  checkClicked(key);
                }}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
