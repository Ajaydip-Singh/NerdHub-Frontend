import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../slices/userSlices/userAuthenticationSlice';
import styles from './SideBar.module.css';

export default function Sidebar(props) {
  const addLinkStyling = (props) => {
    return props
      ? `${styles.side_bar_link} ${styles.active}`
      : styles.side_bar_link;
  };

  const userAuthentication = useSelector((state) => state.userAuthentication);
  const { user } = userAuthentication;

  const dispatch = useDispatch();
  const logoutClickHandler = () => {
    dispatch(logoutUser());
    props.setSideBarIsOpen(false);
  };

  return (
    <div
      className={`side_bar row_f ${styles.side_bar} ${
        props.sideBarIsOpen ? `${styles.open}` : ``
      }`}
    >
      <div
        className={`${styles.side_bar_overlay} ${
          props.sideBarIsOpen ? `${styles.open_side_bar_overlay}` : ``
        }`}
      >
        <button
          className={`button ${styles.side_bar_button}`}
          onClick={() => props.setSideBarIsOpen(false)}
        ></button>
      </div>
      <div className={`column_f space-between ${styles.side_bar_content}`}>
        <ul className={`column_f align-center ${styles.side_bar_list}`}>
          <li>
            <Link to="/home">
              <img
                src="/logo192.png"
                alt="Nerdhub Logo"
                className={`${styles.side_bar_link} ${styles.logo}`}
              />
            </Link>
          </li>
          <MediaQuery maxWidth="800px">
            <li className={styles.side_bar_list_item}>
              <Link to="/about" className={addLinkStyling(props.about)}>
                About
              </Link>
            </li>
            <li className={styles.side_bar_list_item}>
              <Link to="/contact" className={addLinkStyling(props.contact)}>
                Contact
              </Link>
            </li>
            <li className={styles.side_bar_list_item}>
              <Link to="/events" className={addLinkStyling(props.events)}>
                My Events
              </Link>
            </li>
          </MediaQuery>
        </ul>
        {user ? (
          <ul className={`column_f align-center ${styles.side_bar_list}`}>
            <li className={styles.side_bar_list_item}>
              <Link to="/profile" className={addLinkStyling(props.profile)}>
                Profile
              </Link>
            </li>
            <li className={styles.side_bar_list_item}>
              <Button
                to="/logout"
                className={`button border_bottom ${styles.side_bar_item_button}`}
                onClick={logoutClickHandler}
              >
                Logout
              </Button>
            </li>
          </ul>
        ) : (
          <ul className={`column_f align-center ${styles.side_bar_list}`}>
            <li className={styles.side_bar_list_item}>
              <Link to="/login" className={styles.side_bar_link}>
                Login
              </Link>
            </li>
            <li className={styles.side_bar_list_item}>
              <Link to="/register" className={styles.side_bar_link}>
                Register
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
