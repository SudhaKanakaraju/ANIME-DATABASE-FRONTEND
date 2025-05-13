import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <LandingPageStyled>
      <div className="overlay">
        <div className="content">
          <h1>Welcome to Anime World</h1>
          <div className="buttons">
            <Link to="/register" className="btn">Register</Link>
            <Link to="/login" className="btn">Login</Link>
          </div>
        </div>
      </div>
    </LandingPageStyled>
  );
}

const LandingPageStyled = styled.div`
  height: 100vh;
  background-image: url("https://wallpaperaccess.com/full/2076085.jpg"); // high-quality anime background
  background-size: cover;
  background-position: center;
  position: relative;

  .overlay {
    background-color: rgba(0, 0, 0, 0.6);
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content {
    text-align: center;
    color: white;

    h1 {
      font-size: 3rem;
      margin-bottom: 2rem;
      font-family: "Arial", sans-serif;
    }

    .buttons {
      display: flex;
      gap: 1.5rem;
      justify-content: center;

      .btn {
        padding: 0.8rem 2rem;
        border-radius: 30px;
        background-color: #ff5c5c;
        color: white;
        font-size: 1.1rem;
        text-decoration: none;
        transition: 0.3s ease;

        &:hover {
          background-color: #ff1c1c;
        }
      }
    }
  }
`;

export default LandingPage;