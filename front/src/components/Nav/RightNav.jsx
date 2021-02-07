import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Slideburger = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  z-index: 19;

  li {
    padding: 18px 10px;
    background-color: #900f0f;
    color: #f5f5f5;
    font-family: sans-serif;
    font-size: 0.9rem;
  }

  a {
    color: #ffffff;
    text-decoration: none;
  }

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #900f0f;
    opacity: 1;
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 0;
    right: 0;
    height: 50vh;
    width: 50vw;
    padding-top: 5rem;
    transition: transform 0.3s ease-in-out;

    li {
      color: #f1f1f1;
      text-align: center;
      border-bottom: 3px solid;
    }
    
    a {
      color: #ffffff;
      text-decoration: none;
      font-family: sans-serif;
    }
  } ;
`;

const RightNav = ({ open }) => {
  return (
    <Slideburger open={open}>
      <li>
        <Link to="/shows">Liste des spectacles</Link>
      </li>
      <li>
        <Link to="/add">Ajouter un spectacle</Link>
      </li>
    </Slideburger>
  );
};

export default RightNav;
