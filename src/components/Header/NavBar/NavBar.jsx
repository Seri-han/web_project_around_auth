import { useContext } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import CurrentUserContext from '../../../contexts/CurrentUserContext';
import { removeToken } from "../../../utils/token";
import Logo from "../Logo/Logo";


function NavBar() {
  const navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn, userData } = useContext(CurrentUserContext);
  
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  function signOut() {
    removeToken();
    navigate("/login");
    setIsLoggedIn(false);
  }


  function handleLogin() {
    if (isLoginPage) {
      navigate("/register");
    } else {
      navigate("/login");
    }
  }
  
  
  return (
    <nav className="nav">
      <div className="nav__logo">
        <Logo />
      </div>
      <ul className="nav__links">
        <li>
          <NavLink to="/my-profile" className="nav__link">
            {isLoggedIn ? userData.email : ""}
          </NavLink>
        </li>
        <li>
          <button onClick={signOut} className={`nav__link nav__button ${isLoggedIn ? "" : "login__link_visible" }`}>Cerrar sesión</button>
        </li>
        <li>
          <button onClick={handleLogin} className={`nav__link nav__button ${isLoggedIn ? "login__link_visible" : "" }`}>{isLoginPage ? "Regístrate" : "Iniciar sesión"}</button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;