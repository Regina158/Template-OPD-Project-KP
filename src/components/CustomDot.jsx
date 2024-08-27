import React from "react";

const CustomDot = ({ onClick, ...rest }) => {
  const { active } = rest;
  return (
    <li
      className={`custom-dot ${active ? "active" : ""}`}
      onClick={() => onClick()}
    >
      <button className="w-2 h-2 mx-1 bg-white rounded-full"></button>
    </li>
  );
};

export default CustomDot;
