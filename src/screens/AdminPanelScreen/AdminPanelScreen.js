import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import styles from './AdminPanelScreen.module.css';

export default function AdminPanelScreen() {
  return (
    <div>
      <Header admin></Header>
      <div className={styles.main_wrapper}>
        <Link to="/home-admin" className={styles.card_link}>
          <div className={styles.card}>Home Page</div>
        </Link>
        <Link to="/events-admin" className={styles.card_link}>
          <div className={styles.card}>Events</div>
        </Link>
        <Link to="/gallery-admin" className={styles.card_link}>
          <div className={styles.card}>Gallery Page</div>
        </Link>
        <Link to="/membership-admin" className={styles.card_link}>
          <div className={styles.card}>Membership Page</div>
        </Link>
        <Link to="/about-admin" className={styles.card_link}>
          <div className={styles.card}>About Page</div>
        </Link>
        <Link to="/contact-admin" className={styles.card_link}>
          <div className={styles.card}>Contact Page</div>
        </Link>
      </div>
    </div>
  );
}
