import React, { useEffect, useState, useCallback } from "react";

//initializes a functional component that takes in state as props
const HangingMan = ({ word, hangmanStage, setHangmanStage, backgroundStyles, setBackgroundStyles, stageIndex, setStageIndex, score, setScore, array }) => {

    //initializes a function that detects when there is a keydown event and uses a callback with the key down event
    const detectKeyDown = useCallback((e) => {
        
        //splits the word into an array of letters
        const splitWord = word.split("");

        //initializes an array to hold the indicies of matching letters
        const indices = [];

        //checks to see if there are multiple occurences of one letter
        if (splitWord.includes(e.key)) {
            splitWord.forEach((letter, index) => {
                if (letter === e.key) {
                    indices.push(index);
                }
            });

            //styles the appropriate block to transparent
            if (indices.length > 0) {
                indices.forEach(index => {
                    backgroundStyles[index].backgroundColor = "transparent";
                });
                //sets the state with the newly updated backgroundstyles
                setBackgroundStyles([...backgroundStyles]);
            }
        }
        //if key is not found
        //this means that the letter entered is invalid which results in the hangmanStage state being updated aswell as the index
        else {
            setHangmanStage(array[stageIndex + 1]);
            setStageIndex(stageIndex + 1);
        }
        //Memoize the function by stating its dependencies
    }, [word, backgroundStyles, stageIndex]);

    //uses the useEffect function to initialize a keyDownHandler function
    useEffect(() => {
        //initializes a function that takes a keydown event (e) as a parameter
        const keyDownHandler = (e) => {
            //if stageIndex is greater or equal to 11 it returns the return that removes the eventlistener to not allow anymore keydowns
            if (stageIndex >= 11) {
                return;
            }
            //this if statement checks to see if the user won by checking if the values returned by the 
            //checkIfWon function and the length of the background styles are equal which meant the user has won
            //which then updates the score
            if (checkIfWon() === backgroundStyles.length) {
                setScore((prevScore) => prevScore + 1000);
                return;
            }
            //calls the detectKeyDown function with the event passed in
            detectKeyDown(e);
        };

        //adds a keydown eventListener
        document.addEventListener('keydown', keyDownHandler, true);

        //return statement that removes the keydown eventListener
        return () => {
            document.removeEventListener('keydown', keyDownHandler, true);
        };
    }, [detectKeyDown]);

    //initializes a function called that checks if the user had won by checking how many of the backgrounds of the letter boxes are transparent
    const checkIfWon = () => {
        let checker = 0;
        backgroundStyles.forEach(element => {
            if (element.backgroundColor === "transparent") {
                checker = checker + 1;
            }
        });
        return checker;
    }


    //returns the elements of the Hangman Game
    return (
        <div className="hangman-UI">
            <h1>Hangman</h1>
            <h1>Score: {score}</h1>
            {/* checks if the stageIndex is less then 11 it displays the image but if its greater then 11 then it displays a paragraph that you have lost */}
            {stageIndex < 11 ? (
                <img src={hangmanStage} alt='hangman stage' />
            ) : (
                    <h1 className="lost">You have lost...</h1>
            )}
            <br />
            {/* creates a button that reloads the page and resets the score stored in state as session storage */}
            <button onClick={() => {
                window.location.reload();
                setScore(0);
            }}>Restart</button>
            <br />
            {/* if stageIndex is less then 11 it displays all the letter box as white */}
            {stageIndex < 11 ? (
                backgroundStyles.map((item, index) => (
                    <div key={index} className="box">
                        <p style={{ backgroundColor: item.backgroundColor }}>
                            {item.letter}
                        </p>
                    </div>
                ))
                // if its greater then 11 it means that the user lost the game so all the letter boxes are displayed as transparent to display the word
            ) : (
                backgroundStyles.map((item, index) => (
                    <div key={index} className="box">
                        <p style={{ backgroundColor: "transparent" }}>
                            {item.letter}
                        </p>
                    </div>
                ))
            )}


            {checkIfWon() === backgroundStyles.length ? <h1 className="won">You Have Won!!!! Congratulations!!!! <br /> Press any key to go again...</h1> : <p></p>}
        </div>
    )
}

export default HangingMan;
