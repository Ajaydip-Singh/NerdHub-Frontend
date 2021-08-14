/*global google*/
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MediaQuery, { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';
import BottomNav from '../../components/BottomNav/BottomNav';
import Header from '../../components/Header/Header';
import styles from './LoginScreen.module.css';
import {
  googleLoginUser,
  loginUser
} from '../../slices/userSlices/userAuthenticationSlice';
import MessageBox from '../../components/MessageBox/MessageBox';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import { confirmUser } from '../../slices/userSlices/userConfirmationSlice';

export default function LoginScreen(props) {
  const isSmallerScreen = useMediaQuery({ query: '(max-width: 767px)' });

  const redirect = '/home';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

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

  const userAuthentication = useSelector((state) => state.userAuthentication);
  const { user, status, error } = userAuthentication;

  const userConfirmation = useSelector((state) => state.userConfirmation);
  const {
    confirmedUser: successConfirmation,
    status: statusConfirmation,
    error: errorConfirmation
  } = userConfirmation;

  const dispatch = useDispatch();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    const userId = props.match.params.userId;
    const confirmationCode = props.match.params.confirmationCode;

    if (userId && confirmationCode) {
      dispatch(confirmUser({ userId, confirmationCode }));
    }
  }, [
    dispatch,
    props.match.params.userId,
    props.match.params.confirmationCode
  ]);

  useEffect(() => {
    const handleGoogleCredentialResponse = (response) => {
      dispatch(googleLoginUser(response));
    };

    const setupGoogleOneTapSignIn = async () => {
      const { data } = await axios.get('/api/config/google');

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;

      script.onload = () => {
        google.accounts.id.initialize({
          client_id: data,
          callback: handleGoogleCredentialResponse
        });
        google.accounts.id.prompt();
      };

      document.body.appendChild(script);
    };

    setupGoogleOneTapSignIn();
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      props.history.push(redirect);
    }
  }, [user, props]);

  return (
    <div>
      <Header login></Header>
      <section className={`row ${styles.main_wrapper}`}>
        <div
          className={`col-md-6 ${styles.info_box}`}
          style={{
            backgroundImage: 'url(/images/destruction_long.jpeg)'
          }}
        ></div>
        <div
          className={`col-md-6 ${styles.login_box}`}
          style={
            isSmallerScreen
              ? {
                  backgroundImage: 'url(/images/destruction_long.jpeg)'
                }
              : {}
          }
        >
          <h1 className={styles.title}>Login</h1>
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          {successConfirmation && (
            <MessageBox variant="success">
              {successConfirmation.message}
            </MessageBox>
          )}
          {statusConfirmation === 'loading' && <LoadingBox></LoadingBox>}
          {errorConfirmation && (
            <MessageBox variant="danger">{errorConfirmation}</MessageBox>
          )}

          <form onSubmit={onSubmitHandler} className={styles.form}>
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
              <button className={styles.submit_button} type="submit">
                {status === 'loading' ? <LoadingBox></LoadingBox> : `Login`}
              </button>
            </div>
            <p className="mt-1">
              Don't have an account?{' '}
              <Link className={`border_bottom ${styles.link}`} to="/register">
                Create one
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
