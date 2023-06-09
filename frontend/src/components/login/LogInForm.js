import React, { useState } from 'react';
import './LogInForm.css';

const LogInForm = ({ navigate, setShowIntro }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event) => {
    if (!email || !password ) return

    event.preventDefault();

    let response = await fetch( '/tokens', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
    })

    if (response.status === 401) {
        setErrorMessage('Email address is incorrect. Try again!');
    } else if (response.status === 402) {
        setErrorMessage('Password is incorrect. Try again!');
    } else {
        let data = await response.json()
        window.localStorage.setItem("token", data.token)
        window.localStorage.setItem("user", JSON.stringify(data.user))
        setShowIntro(true)
        navigate('/game');
    }
  }

  return (
    <div id='login-container'>

      <form id='login-form' onSubmit={handleSubmit}>
          <h1 id='login-title'>Login</h1>
          <input placeholder='Enter your email address' id="email" className="login-form-field" type='text' value={ email } onChange={handleEmailChange} />
          <input placeholder='Enter your password' id="password" className="login-form-field" type='password' value={ password } onChange={handlePasswordChange} />
          <input id='login-submit-btn' className='btn' type="submit" value="Log in" /> 
          {errorMessage && <p id="login-error-message">{errorMessage}</p>}
          <p id='signup-prompt'>Don't have an account?  <a href="/signup" id='signup-link'>Sign up</a> </p>
      </form>
      
    </div>
  );
}

export default LogInForm;