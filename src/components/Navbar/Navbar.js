import React from "react";
import "./Navbar.css";
import sirma from "../../images/sirma.png";

export const Navbar = () => {
  return (
    <div>
      <div id="main-navbar" className="navbar">
        <img src={sirma} className="logo" alt="Sirma Logo" />
        <nav>
          <ul>
            <li>
              <p href="/home">Created</p>
            </li>
            <li>
              <p href="/home">By:</p>
            </li>
            <li>
              <p href="/home">Ergi</p>
            </li>
            <li>
              <p href="/home">Aliko</p>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
