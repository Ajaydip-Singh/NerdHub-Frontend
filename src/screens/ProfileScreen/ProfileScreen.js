import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MediaQuery from 'react-responsive/';
import validator from 'validator';
import BottomNav from '../../components/BottomNav/BottomNav';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';
import { detailsUser } from '../../slices/userSlices/userDetailsSlice';
import styles from './ProfileScreen.module.css';

export default function ProfileScreen() {
  const userAuthentication = useSelector((state) => state.userAuthentication);
  const { user } = userAuthentication;

  const userDetails = useSelector((state) => state.userDetails);
  const { status, user: userInfo, error } = userDetails;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
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

  const validatePhone = (phone) => {
    if (validator.isMobilePhone()) {
      setPhone(phone);
      setPhoneError('');
    } else {
      setPhone('');
      setPhoneError('Enter Valid Phone Number. Begin with country code.');
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

  const dispatch = useDispatch();
  const onSubmitHandler = (e) => {
    e.preventDefault();

    // Validate form fields
    validateFirstName(firstName);
    validateLastName(lastName);
    if (phone) {
      validatePhone(phone);
    }
    if (password || confirmPassword) {
      validatePassword(password);
      validateConfirmPassword(confirmPassword);
    }
    const noValidationErrors = [
      firstNameError,
      lastNameError,
      passwordError,
      confirmPasswordError
    ].every((err) => err === '');

    // If no validation errors then update Profile
    if (noValidationErrors) {
    }
  };

  useEffect(() => {
    if (!userInfo) {
      dispatch(detailsUser({ userId: user._id }));
    } else {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setPhone(userInfo.phone);
    }
  }, [dispatch, user, userInfo]);

  return (
    <div>
      <Header></Header>
      <div
        className={styles.main_wrapper}
        style={{
          backgroundImage: 'url(images/call_of_duty_ghosts.jpeg)',
          backgroundPosition: 'top'
        }}
      >
        <section className={styles.hero_section}>
          <h1 className={styles.heading}>Hi {user.firstName}</h1>
          <p className={styles.subheading}>{user.email}</p>
        </section>
        <section className={styles.wrapper}>
          <h3>Profile</h3>
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          <form onSubmit={onSubmitHandler} className={styles.form}>
            <div>
              <label htmlFor="first_name">First Name</label>
              {firstNameError && (
                <MessageBox validation>{firstNameError}</MessageBox>
              )}
              <input
                className={`${styles.input} ${
                  firstNameError ? `${styles.val_danger}` : ``
                }`}
                placeholder="Enter first name"
                type="text"
                id="first_name"
                name="first_name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="last_name">Last Name</label>
              {lastNameError && (
                <MessageBox validation>{lastNameError}</MessageBox>
              )}
              <input
                className={`${styles.input} ${
                  lastNameError ? `${styles.val_danger}` : ``
                }`}
                placeholder="Enter last name"
                type="text"
                id="last_name"
                name="last_name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              {phoneError && <MessageBox validation>{phoneError}</MessageBox>}
              <input
                className={`${styles.input} ${
                  phoneError ? `${styles.val_danger}` : ``
                }`}
                placeholder="Enter Phone"
                type="text"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="password">New Password</label>
              {passwordError && (
                <MessageBox validation>{passwordError}</MessageBox>
              )}
              <input
                className={`${styles.input} ${
                  passwordError ? `${styles.val_danger}` : ``
                }`}
                placeholder="Enter new password"
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                placeholder="Confirm new password"
                type="password"
                name="confirm_password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <button className={styles.submit_button} type="submit">
                {status === 'loading' ? (
                  <LoadingBox></LoadingBox>
                ) : (
                  `Update Profile`
                )}
              </button>
            </div>
          </form>
        </section>
      </div>
      <MediaQuery minWidth={800}>
        <Footer></Footer>
      </MediaQuery>
      <MediaQuery maxWidth={800}>
        <BottomNav></BottomNav>
      </MediaQuery>
    </div>
  );
}
