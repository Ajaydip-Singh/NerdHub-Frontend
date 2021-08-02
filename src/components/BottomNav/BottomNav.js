import { BrowserRouter as Router, Link } from "react-router-dom";
import styles from "./BottomNav.module.css";

export default function BottomNav(props) {
  const addLinkStyling = (props) => {
    return props ? `${styles.nav_link} ${styles.active}` : styles.nav_link;
  };

  return (
    <Router>
      <nav className={`row align-center ${styles.nav}`}>
        <ul className={`row space-evenly align-center ${styles.nav_list}`}>
          <li className={styles.nav_list_item}>
            <Link className={addLinkStyling(props.about)} to="/about">
              <i class="fas fa-user-friends fa-lg"></i>
              <span className={styles.small}>about</span>
            </Link>
          </li>
          <li className={styles.nav_list_item}>
            <Link className={addLinkStyling(props.home)} to="/home">
              <i class="fas fa-home fa-lg"></i>
              <span className={styles.small}>home</span>
            </Link>
          </li>
          <li className={styles.nav_list_item}>
            <Link className={addLinkStyling(props.gallery)} to="/gallery">
              <i class="far fa-image fa-lg"></i>
              <span className={styles.small}>gallery</span>
            </Link>
          </li>
          <li className={styles.nav_list_item}>
            <Link className={addLinkStyling(props.contact)} to="/contact">
              <i class="fas fa-address-book fa-lg"></i>
              <span className={styles.small}>contact</span>
            </Link>
          </li>
        </ul>
      </nav>
    </Router>
  );
}
