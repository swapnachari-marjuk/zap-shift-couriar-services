import React from "react";
import logo from "./../assets/logo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link>
      {" "}
      <div className="flex items-end">
        <img src={logo} alt="" />
        <h3 className="text-2xl w-4 -ml-4 font-bold">ZapShift</h3>
      </div>
    </Link>
  );
};

export default Logo;
