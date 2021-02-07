import React from "react";
import styled from "styled-components";
import banner from "../../../src/images/home-banner.jpg";

const HOME = styled.div`
.img {
    background-image: url(${banner});
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    width: 100%;
    height: 55rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .containerhome {
    width: 60%;
    height: auto;
    background-color: #fbf3f3;
    opacity: 0.8;
    box-shadow: 3px 3px 1px;
  }
  
  .title {
    text-align: center;
    font-family: sans-serif;
    padding-top: 2rem;
  }
  
  .presentation {
    text-align: center;
    font-size: x-large;
    font-family: sans-serif;
    padding: 1rem;
  }
  
  @media (max-width: 768px) {
    .img {
      background-image: url(${banner});
      position: relative;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .presentation {
      text-align: center;
      font-size: medium;
    }
    .containerhome {
      width: 90%;
      height: auto;
      background-color: #fbf3f3;
      opacity: 0.8;
      box-shadow: 3px 3px 1px;
    }
  }
`;

const HomePage = () => {
  return (
    <HOME className="Home">
      <div className="img">
        <div className="containerhome">
          <h1 className="title">Comic&apos;App</h1>
          <p className="presentation">
            Bienvenue sur Comic&apos;App ! Un site pour regarder des spectacles humoristiques.
          </p>
        </div>
      </div>
    </HOME>
  );
};

export default HomePage;
