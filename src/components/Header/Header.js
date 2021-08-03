import { BrowserRouter as Router, Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import styles from "./Header.module.css";

export default function Header(props) {
  const addLinkStyling = (props) => {
    return props ? `${styles.nav_link} ${styles.active}` : styles.nav_link;
  };

  const isSmallerScreen = useMediaQuery({ query: "(max-width: 800px)" });

  return (
    <Router>
      <header
        className={`row ${styles.header} ${isSmallerScreen && `space-between`}`}
      >
        <Link to="/home">
          <img src="/logo192.png" alt="Nerdhub Logo" className={styles.logo} />
        </Link>
        {/* {isSmallerScreen && (
          <button
            className={`button ${styles.hamburger_button}`}
            // onClick={() => setSideBarOpen(true)}
          >
            <i class="fas fa-bars fa-2x"></i>
          </button>
        )} */}
        <nav
          className={`row align-center ${styles.nav} ${
            isSmallerScreen ? `flex-end` : `space-between`
          }`}
        >
          {!isSmallerScreen && (
            <ul className={`${styles.nav_list} row`}>
              <li className={styles.nav_list_item}>
                <Link className={addLinkStyling(props.home)} to="/home">
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
          )}

          {props.navItems && (
            <ul className={`${styles.nav_list} row align-center`}>
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
