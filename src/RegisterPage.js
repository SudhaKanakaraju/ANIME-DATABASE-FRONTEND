import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    contact: '',
    address: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, gender, contact, address, email, password } = formData;

    if (!firstName || !lastName || !gender || !contact || !address || !email || !password) {
      setError('All fields are required.');
      setSuccess('');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      setSuccess('');
      return;
    }

    localStorage.setItem('user', JSON.stringify(formData));
    setError('');
    setSuccess('Registration successful! Redirecting to login...');

    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <RegisterPageStyled>
      <div className="overlay">
        <div className="content">
          <h1>Register</h1>
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            <div className="gender">
              <label>Gender:</label>
              <label><input type="radio" name="gender" value="Male" onChange={handleChange} /> Male</label>
              <label><input type="radio" name="gender" value="Female" onChange={handleChange} /> Female</label>
              <label><input type="radio" name="gender" value="Other" onChange={handleChange} /> Other</label>
            </div>
            <input
              type="text"
              placeholder="Contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </RegisterPageStyled>
  );
}

const RegisterPageStyled = styled.div`
  height: 100vh;
  background-image: url('https://images.unsplash.com/photo-1587614382346-4ec70d6e9be5?auto=format&fit=crop&w=1400&q=80');
  background-size: cover;
  background-position: center;
  position: relative;

  .overlay {
    background-color: rgba(0, 0, 0, 0.7);
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

    .form {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;

      input {
        padding: 0.7rem;
        border-radius: 6px;
        border: none;
        font-size: 1rem;
      }

      .gender {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1rem;
        color: white;

        label {
          margin-right: 0.5rem;
        }

        input[type="radio"] {
          margin-right: 0.3rem;
        }
      }

      button {
        padding: 0.8rem;
        border-radius: 8px;
        background-color: #007bff;
        color: white;
        font-size: 1.1rem;
        border: none;
        cursor: pointer;

        &:hover {
          background-color: #0056b3;
        }
      }

      .error {
        color: red;
        font-size: 1rem;
      }

      .success {
        color: lightgreen;
        font-size: 1rem;
      }
    }
  }
`;

export default RegisterPage;