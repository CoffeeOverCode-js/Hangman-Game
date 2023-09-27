import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import './CSS/style.css'
import Header from './Components/Header';
import HangingMan from './Components/HangingMan';
import Keyboard from './Components/Keyboard';
import React, { useEffect, useState } from 'react';
import stage1 from './Images/state1.png'
import stage2 from './Images/state2.png'
import stage3 from './Images/state3.png'
import stage4 from './Images/state4.png'
import stage5 from './Images/state5.png'
import stage6 from './Images/state6.png'
import stage7 from './Images/state7.png'
import stage8 from './Images/state8.png'
import stage9 from './Images/state9.png'
import stage10 from './Images/state10.png'
import stage11 from './Images/state11.png'
import { Route, Routes } from 'react-router-dom';
import Help from './Components/Help';


function App() {
  //initializes state that will be used in the hangman game
  const [hangmanStage, setHangmanStage] = useState(stage1);
  const [word, setWord] = useState("");
  const [backgroundStyles, setBackgroundStyles] = useState([]);
  const [stageIndex, setStageIndex] = useState(0);
  const [score, setScore] = useState(parseInt(sessionStorage.getItem('score')) || 0);

  //create an array that stores the various hangman stages
  let array = [stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, stage10, stage11];

  //creates an array of words
  const wordsArray = [
    "apple",
    "banana",
    "chocolate",
    "dolphin",
    "elephant",
    "flamingo",
    "giraffe",
    "hamburger",
    "iguana",
    "jazz",
    "kangaroo",
    "leopard",
    "mango",
    "narwhal",
    "octopus",
    "penguin",
    "quokka",
    "raccoon",
    "strawberry",
    "tiger"
  ];

  //creates a use effect that initializes the sessionStoraeg for the score
  useEffect(() => {
    sessionStorage.setItem('score', score.toString());
  }, [score]);

  //creates a useEffect that initializes a random word and their background styles
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * wordsArray.length);
    const randomWord = wordsArray[randomIndex];
    setWord(randomWord);

    const splitWord = randomWord.split("");
    const array = splitWord.map(letter => ({
      letter,
      backgroundColor: 'white'
    }));
    setBackgroundStyles(array);
  }, [score]);


  return (
    <div>
      <Header />

      {/* passes the neccessary states as props to the components */}
      <Routes>
        <Route exact path="/" element={
          <>
          <div id='body-container'>
            <HangingMan
              word={word}
              hangmanStage={hangmanStage}
              setHangmanStage={setHangmanStage}
              backgroundStyles={backgroundStyles}
              setBackgroundStyles={setBackgroundStyles}
              stageIndex={stageIndex}
              setStageIndex={setStageIndex}
              score={score}
              setScore={setScore}
              array={array}
            />
            <Keyboard
              word={word}
              backgroundStyles={backgroundStyles}
              setBackgroundStyles={setBackgroundStyles}
              hangmanStage={hangmanStage}
              setHangmanStage={setHangmanStage}
              array={array}
              stageIndex={stageIndex}
              setStageIndex={setStageIndex}
            />
            </div>
          </>
        } />
        <Route exact path="/help" element={<Help />} />
      </Routes>
    </div>
  );
}


export default App;
