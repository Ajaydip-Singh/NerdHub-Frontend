import styles from "./Header.module.css";
import { BrowserRouter as Router, Link } from "react-router-dom";

export default function Header(props) {
  const addLinkStyling = (props) => {
    return props ? `${styles.nav_link} ${styles.active}` : styles.nav_link;
  };

  return (
    <Router>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <ul className={styles.nav_list}>
            <li className={styles.nav_list_item}>
              <Link to="/">
                <img
                  src="/logo192.png"
                  alt="Nerdhub Logo"
                  className={styles.logo}
                />
              </Link>
            </li>
            <li className={styles.nav_list_item}>
              <Link className={addLinkStyling(props.home)} to="/">
                home
              </Link>
            </li>
            <li className={styles.nav_list_item}>
              <Link className={addLinkStyling(props.gallery)} to="/gallery">
                gallery
              </Link>
            </li>
            <li className={styles.nav_list_item}>
              <Link className={addLinkStyling(props.about)} to="/about">
                about
              </Link>
            </li>
            <li className={styles.nav_list_item}>
              <Link className={addLinkStyling(props.contact)} to="/contact">
                contact
              </Link>
            </li>
          </ul>
          {props.navItems && (
            <ul className={styles.nav_list}>
              {props.navItems.map((item) => (
                <li className={styles.nav_list_item} key={item}>
                  <Link className={addLinkStyling(props[item])} to={`/${item}`}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </header>
    </Router>
  );
}
