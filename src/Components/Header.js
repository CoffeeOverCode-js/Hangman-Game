import { Link } from "react-router-dom";
import Help from "./Help";
//creates a function to display the heading
const Header = () => {
    return (
        <div id="header-container">
            <ul>
                <li><h1 className="header-heading">HangMan Game</h1></li>
                <li className="link"><Link to="/help"><a>Help</a></Link></li>
                <li className="link"><Link to="/">Hangman Game</Link></li>
                <br />
                <br />
            </ul>
        </div>
    )
}

export default Header;