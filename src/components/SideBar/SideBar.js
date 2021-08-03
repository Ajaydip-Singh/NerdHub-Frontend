import { Link } from "react-router-dom";
import styles from "./SideBar.module.css";

export default function Sidebar({ sideBarIsOpen, setSideBarIsOpen }) {
  return (
    <div
      className={`side_bar row_f ${styles.side_bar} ${
        sideBarIsOpen ? `${styles.open}` : ``
      }`}
    >
      <div
        className={`${styles.side_bar_overlay} ${
          sideBarIsOpen ? `${styles.open_side_bar_overlay}` : ``
        }`}
      >
        <button
          className={`button ${styles.side_bar_button}`}
          onClick={() => setSideBarIsOpen(false)}
        ></button>
      </div>
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
        <li className={styles.side_bar_list_item}>
          <Link to="/events" className={styles.side_bar_link}>
            Events
          </Link>
        </li>
        <li className={styles.side_bar_list_item}>
          <Link to="/profile" className={styles.side_bar_link}>
            Profile
          </Link>
        </li>
        <li className={styles.side_bar_list_item}>
          <Link to="/logout" className={styles.side_bar_link}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}
