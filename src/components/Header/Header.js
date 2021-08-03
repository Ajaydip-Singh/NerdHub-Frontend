import { BrowserRouter as Router, Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import styles from "./Header.module.css";
import { useState } from "react";
import SideBar from "../SideBar/SideBar";

export default function Header(props) {
  const addLinkStyling = (props) => {
    return props ? `${styles.nav_link} ${styles.active}` : styles.nav_link;
  };

  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);
  const [user, setUser] = useState(true);

  const isSmallerScreen = useMediaQuery({ query: "(max-width: 800px)" });

  return (
    <Router>
      <header
        className={`row ${styles.header} ${
          isSmallerScreen ? `space-between` : ``
        }`}
      >
        <Link to="/home">
          <img src="/logo192.png" alt="Nerdhub Logo" className={styles.logo} />
        </Link>
        <nav
          className={`row ${styles.nav} ${
            isSmallerScreen ? `flex-end` : `space-between`
          }`}
        >
          {!isSmallerScreen && (
            <ul className={`row align-center ${styles.nav_list}`}>
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

          {user ? (
            <button
              className={`button ${styles.hamburger_button}`}
              onClick={() => setSideBarIsOpen(true)}
            >
              <div className={styles.hamburger_menu_wrapper}>
                <div className={styles.hamburger_menu}></div>
              </div>
            </button>
          ) : (
            <ul className={`${styles.nav_list} row align-center`}>
              <li className={styles.nav_list_item}>
                <Link className={addLinkStyling(props.login)} to="/login">
                  login
                </Link>
              </li>
              <li className={styles.nav_list_item}>
                <Link className={addLinkStyling(props.register)} to="/register">
                  register
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </header>
      <SideBar
        sideBarIsOpen={sideBarIsOpen}
        setSideBarIsOpen={setSideBarIsOpen}
      ></SideBar>
    </Router>
  );
}
