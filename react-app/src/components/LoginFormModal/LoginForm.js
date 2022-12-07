import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  let history = useHistory();
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
    // history.push('/me')
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='sign-in-container'>
      <h2>Welcome to Haus</h2>
      <h4 className='sign-in-category'>Sign in</h4>
      <form className='login-form' onSubmit={onLogin}>
        <div>
          {errors.map((error, ind) => (
            <div className="login-error-detail" key={ind}>{error}</div>
          ))}
        </div>
        <div className='email-login'>
          <label className='email-login-label' htmlFor='email'>Email</label>
          <input
            name='email'
            type='text'
            placeholder='Enter email'
            value={email}
            onChange={updateEmail}
            className='email-login-input'
            required={true}
          />
        </div>
        <div className='password-login'>
          <label className='password-login-label' htmlFor='password'>Password</label>
          <input
            name='password'
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={updatePassword}
            className='password-login-input'
            required={true}
          />
          <button className='login-btn' type='submit'>Sign in</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
