import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Burger from "./Burger";

const Nav = styled.nav`
  width: 100%;
  height: 55px;
  border-bottom: 2px solid #f1f1f1;
  background-color: #900f0f;
  padding: 0 20px;
//  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  .logo {
    padding: 15px 0;
    color: #ffffff;
    font-family: sans-serif;
    font-size: 1.2em;
    text-decoration: none;
  }
  a {
    color: #ffffff;
    text-decoration: none;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <Link to="/">
        <div className="logo">Comic&apos;App</div>
      </Link>
      <Burger />
    </Nav>
  );
};

export default Navbar;
