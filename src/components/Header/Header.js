import styles from "./Header.module.css";
import { BrowserRouter as Router, Link } from "react-router-dom";

export default function Header(props) {
  const nav_items = props.navItems
    ? props.navItems
    : [
        { name: "Login", to: "/login" },
        { name: "Register", to: "/register" },
      ];

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
              <Link className={styles.nav_link} to="/">
                Home
              </Link>
            </li>
            <li className={styles.nav_list_item}>
              <Link className={styles.nav_link} to="/gallery">
                Gallery
              </Link>
            </li>
            <li className={styles.nav_list_item}>
              <Link className={styles.nav_link} to="/about">
                About
              </Link>
            </li>
            <li className={styles.nav_list_item}>
              <Link className={styles.nav_link} to="/contact">
                Contact
              </Link>
            </li>
          </ul>
          <ul className={styles.nav_list}>
            {nav_items.map((item) => (
              <li className={styles.nav_list_item} key={item}>
                <Link className={styles.nav_link} to={item.to}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </Router>
  );
}
