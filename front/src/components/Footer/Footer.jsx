import React from "react";
import styled from "styled-components";

const FOOTER = styled.div`
  .Footer {
    background-color: #900f0f;
    border-top: 2px solid #f1f1f1;
    width: 100%;
    height: 10vh;
    display: flex;
    bottom: 0;
    flex-direction: column;
    justify-content: space-around;
  }
  .footer-link {
    display: flex;
    justify-content: space-around;
    margin: 0 1rem;
  }
  a {
    color: #ffffff;
    font-family: sans-serif;
    font-size: 0.8rem;
    text-decoration: none;
  }

  @media screen and (min-width: 768px) {
    .Footer {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      height: 8vh;
      position: fixed;
      bottom: 0;
    }
    .footer-link {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
    }
  }
`;

const Footer = () => {
  return (
    <div>
      <FOOTER>
        <footer className="Footer">
          <div className="footer-link">
            <a href="https://www.wildcodeschool.com/" rel="noopener noreferrer" target="_blank">Wild Code School</a>
          </div>
          <div className="footer-link">
            <a href="https://github.com/loicbdev/" rel="noopener noreferrer" target="_blank">Mon GitHub</a>
          </div>
        </footer>
      </FOOTER>
    </div>
  );
};

export default Footer;
