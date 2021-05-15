import Nav from "./Nav";

const Header = ({ menu,translations }) => {
  return (
    <div className="header">
      <Nav menu={menu} translations={translations}/>
    </div>
  );
};

export default Header;
