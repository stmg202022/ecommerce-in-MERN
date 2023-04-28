import React from "react";
import "./title_header.css";

const Header = ({ header }) => {
  return (
    <div>
      <div id="header" className="header">
        <div>
          <h2>{header}</h2>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Header;
