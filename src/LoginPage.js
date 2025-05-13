import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      setError('');
      navigate('/homepage'); // or your homepage route
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <LoginPageStyled>
      <div className="overlay">
        <div className="content">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="error">{error}</p>}
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </LoginPageStyled>
  );
}

const LoginPageStyled = styled.div`
  height: 100vh;
  background-image: url('https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=1400&q=80');
  background-size: cover;
  background-position: center;

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
    max-width: 400px;
    width: 90%;

    h1 {
      font-size: 2.5rem;
      margin-bottom: 1.5rem;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      input {
        padding: 0.7rem;
        border-radius: 6px;
        border: none;
        font-size: 1rem;
      }

      button {
        padding: 0.8rem;
        border-radius: 8px;
        background-color: #28a745;
        color: white;
        font-size: 1.1rem;
        border: none;
        cursor: pointer;

        &:hover {
          background-color: #218838;
        }
      }

      .error {
        color: red;
        font-size: 1rem;
      }
    }
  }
`;

export default LoginPage;