import logo from "../../images/logo.png";
export default function Header() {
  return (
    <header className="header">
      <img className="header__photo" src={logo} alt="logo de Around The US" />
    </header>
  );
}
