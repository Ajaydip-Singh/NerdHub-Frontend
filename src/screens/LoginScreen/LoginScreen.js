import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MediaQuery, { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import BottomNav from '../../components/BottomNav/BottomNav';
import Header from '../../components/Header/Header';
import styles from './LoginScreen.module.css';
import { loginUser } from './loginScreenSlice';

export default function LoginScreen(props) {
  const isSmallerScreen = useMediaQuery({ query: '(max-width: 800px)' });

  const redirect = '/home';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = useSelector((state) => state.login);
  const { user, status, error } = login;

  const dispatch = useDispatch();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

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
          {error && error}
          <form onSubmit={onSubmitHandler} className={styles.form}>
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
              <button className={styles.submit_button} type="submit">
                Login
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