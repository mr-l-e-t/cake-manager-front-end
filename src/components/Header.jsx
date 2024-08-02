import { Link } from "react-router-dom";
import piece_of_cake_logo_png from "../styling/img/piece_of_cake_logo.png";
import piece_of_cake_logo_webp from "../styling/img/piece_of_cake_logo.webp";

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <Link>
            <picture>
              <source srcSet={piece_of_cake_logo_webp} type="image/webp" />
              <img src={piece_of_cake_logo_png} alt="logo"></img>
            </picture>
          </Link>
        </div>
        <div className="header__buttons">
          <div className="header__add">
            <Link to="/cake/new">
              <span>Add Recipe</span>
            </Link>
          </div>
          <div className="header__login">
            <Link>
              <span>Login</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
