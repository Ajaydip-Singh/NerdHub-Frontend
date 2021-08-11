import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MediaQuery, { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import BottomNav from '../../components/BottomNav/BottomNav';
import Header from '../../components/Header/Header';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';
import {
  registerUser,
  resetRegisterUser
} from '../../slices/userSlices/userRegisterSlice';
import styles from './RegisterScreen.module.css';

export default function RegisterScreen(props) {
  const isSmallerScreen = useMediaQuery({ query: '(max-width: 800px)' });

  const redirect = '/login';

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userRegister = useSelector((state) => state.userRegister);
  const { status, createdUser, error } = userRegister;

  const dispatch = useDispatch();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser({ firstName, lastName, email, password }));
  };

  useEffect(() => {
    if (createdUser) {
      dispatch(resetRegisterUser());
      props.history.push(redirect);
    }
  }, [dispatch, createdUser, props.history]);

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
          <form onSubmit={onSubmitHandler} className={styles.form}>
            <div>
              <input
                className={`${styles.input} ${styles.input_half}`}
                placeholder="Enter first name"
                type="text"
                name="first_name"
                onChange={(e) => setFirstName(e.target.value)}
              ></input>
            </div>
            <div>
              <input
                className={`${styles.input} ${styles.input_half}`}
                placeholder="Enter last name"
                type="text"
                name="last_name"
                onChange={(e) => setLastName(e.target.value)}
              ></input>
            </div>
            <div>
              <input
                className={styles.input}
                placeholder="Enter email"
                type="text"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <input
                className={styles.input}
                placeholder="Enter password"
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <input
                className={styles.input}
                placeholder="Confirm password"
                type="password"
                name="confirm_password"
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
