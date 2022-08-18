import * as React from "react";

interface IMenuProps {
  isMenuOpen: boolean;
}

export const Menu = ({ isMenuOpen }: IMenuProps) => {
  return (
    <div className={`app-menu ${isMenuOpen ? "menu-open" : ""}`}>
      <ul className="ul">
        <li className="li">
          <center>
            <h2>Navigate</h2>
          </center>
        </li>
        <br></br>
        <li className="li">
          <a className="comp" href="/events/abc">
            Home
          </a>
        </li>
      </ul>
    </div>
  );
};
