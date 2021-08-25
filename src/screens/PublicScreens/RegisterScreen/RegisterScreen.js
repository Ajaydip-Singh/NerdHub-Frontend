import { useDispatch, useSelector } from 'react-redux';
import MediaQuery, { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import validator from 'validator';
import BottomNav from '../../../components/BottomNav/BottomNav';
import Header from '../../../components/Header/Header';
import styles from './RegisterScreen.module.css';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import { registerUser } from '../../../slices/userSlices/userRegisterSlice';
import { useState } from 'react';

export default function RegisterScreen(props) {
  const isSmallerScreen = useMediaQuery({ query: '(max-width: 767px)' });

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateFirstName = (name) => {
    if (validator.isLength(name, { min: 3 }) && validator.isAlpha(name)) {
      setFirstName(name);
      setFirstNameError('');
    } else {
      setFirstName('');
      setFirstNameError('Enter Valid First Name');
    }
  };

  const validateLastName = (name) => {
    if (validator.isLength(name, { min: 3 }) && validator.isAlpha(name)) {
      setLastName(name);
      setLastNameError('');
    } else {
      setLastName('');
      setLastNameError('Enter Valid Last Name');
    }
  };

  const validateEmail = (email) => {
    if (validator.isEmail(email)) {
      setEmail(email);
      setEmailError('');
    } else {
      setEmail('');
      setEmailError('Enter Valid Email');
    }
  };

  const validatePassword = (password) => {
    if (validator.isStrongPassword(password, { min: 10 })) {
      setPassword(password);
      setPasswordError('');
    } else {
      setPassword('');
      setPasswordError('Enter Strong Password');
    }
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (password === confirmPassword) {
      setPassword(password);
      setConfirmPasswordError('');
    } else {
      setPassword('');
      setConfirmPasswordError('Passwords must match');
    }
  };

  const userRegister = useSelector((state) => state.userRegister);
  const { status, createdUser, error } = userRegister;

  const dispatch = useDispatch();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser({ firstName, lastName, email, password }));
  };

  return (
    <div>
      <Header register></Header>
      <section className={`row ${styles.main_wrapper}`}>
        <div
          className={`col-md-6 ${styles.info_box}`}
          style={{
            backgroundImage: 'url(/images/man_with_gun.jpeg)'
          }}
        ></div>
        <div
          className={`col-md-6 ${styles.login_box}`}
          style={
            isSmallerScreen
              ? {
                  backgroundImage: 'url(/images/man_with_gun.jpeg)'
                }
              : {}
          }
        >
          <h1 className={styles.title}>Register</h1>
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          {createdUser && (
            <MessageBox variant="success">
              Success. Verify Email In Inbox.
            </MessageBox>
          )}
          <form onSubmit={onSubmitHandler} className={styles.form}>
            <div>
              {firstNameError && (
                <MessageBox validation>{firstNameError}</MessageBox>
              )}
              <input
                className={`${styles.input} ${
                  firstNameError ? `${styles.val_danger}` : ``
                }`}
                placeholder="Enter first name"
                type="text"
                name="first_name"
                onChange={(e) => validateFirstName(e.target.value)}
              ></input>
            </div>
            <div>
              {lastNameError && (
                <MessageBox validation>{lastNameError}</MessageBox>
              )}
              <input
                className={`${styles.input} ${
                  lastNameError ? `${styles.val_danger}` : ``
                }`}
                placeholder="Enter last name"
                type="text"
                name="last_name"
                onChange={(e) => validateLastName(e.target.value)}
              ></input>
            </div>
            <div>
              {emailError && <MessageBox validation>{emailError}</MessageBox>}
              <input
                className={`${styles.input} ${
                  emailError ? `${styles.val_danger}` : ``
                }`}
                placeholder="Enter email"
                type="text"
                name="email"
                onChange={(e) => validateEmail(e.target.value)}
              ></input>
            </div>
            <div>
              {passwordError && (
                <MessageBox validation>{passwordError}</MessageBox>
              )}
              <input
                className={`${styles.input} ${
                  passwordError ? `${styles.val_danger}` : ``
                }`}
                placeholder="Enter password"
                type="password"
                name="password"
                onChange={(e) => validatePassword(e.target.value)}
              ></input>
            </div>
            <div>
              {confirmPasswordError && (
                <MessageBox validation>{confirmPasswordError}</MessageBox>
              )}
              <input
                className={`${styles.input} ${
                  confirmPasswordError ? `${styles.val_danger}` : ``
                }`}
                placeholder="Confirm password"
                type="password"
                name="confirm_password"
                onChange={(e) => validateConfirmPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <button className={styles.submit_button} type="submit">
                {status === 'loading' ? <LoadingBox></LoadingBox> : `Register`}
              </button>
            </div>
            <p className="mt-1">
              Already have an account?{' '}
              <Link className={`border_bottom ${styles.link}`} to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </section>
      <MediaQuery maxWidth={800}>
        <BottomNav></BottomNav>
      </MediaQuery>
    </div>
  );
}
