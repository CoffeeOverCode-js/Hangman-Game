
//creates a component that display the information for the help page
const Help = () => {
    return (
        <div>
            <h1>Help</h1>
            <p className="help-content">
                Welcome to my Hangman Game <br />
                <br />
                Here are the following rules of the game: <br />
                A unknown word is given for the user to guess. <br />
                Each time a incorrect word is given a new component of the <br />
                hangman is constructed, ranging from the pole to the head, <br /> 
                torso, legs and arms. Once all of these are constructed <br /> 
                the user gets one last opportunity to guess a correct letter <br />
                if not then the stickman is hanged resulting in the using losing the game. <br />
                <br />
                If you are experiencing any other issues not discussed here please read <br />
                the <b>Readme.md</b> file displayed in the directory of this project.
            </p>
        </div>
    )
}

export default Help;