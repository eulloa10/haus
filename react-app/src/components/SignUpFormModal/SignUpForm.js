import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='sign-in-container'>
      <h2>Welcome to HouseMe</h2>
      <h4 className='sign-in-category'>New Account</h4>
      <form class='login-form' onSubmit={onSignUp}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className='email-login'>
          <label className='email-login-label'>Email</label>
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
            className='email-login-input'
          ></input>
        </div>
        <div className='password-login'>
          <label className='password-login-label'>Password</label>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
            className='password-login-input'
          ></input>
        </div>
        <div className='password-login'>
          <label className='password-login-label'>Repeat Password</label>
          <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            className='password-login-input'
          ></input>
        </div>
        <button className='login-btn' type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
