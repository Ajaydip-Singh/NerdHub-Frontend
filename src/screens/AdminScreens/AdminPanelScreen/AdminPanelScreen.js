import { Link } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import styles from './AdminPanelScreen.module.css';

export default function AdminPanelScreen() {
  return (
    <div>
      <Header admin></Header>
      <div className={styles.main_wrapper}>
        <Link to="/home-page-content-admin" className={styles.card_link}>
          <div className={styles.card}>Home Page</div>
        </Link>
        <Link to="/gallery-admin" className={styles.card_link}>
          <div className={styles.card}>Gallery Items</div>
        </Link>
        <Link to="/membership-admin" className={styles.card_link}>
          <div className={styles.card}>Membership Page</div>
        </Link>
        <Link to="/about-page-content-admin" className={styles.card_link}>
          <div className={styles.card}>About Page</div>
        </Link>
        <Link to="/contact-page-content-admin" className={styles.card_link}>
          <div className={styles.card}>Contact Page</div>
        </Link>
        <Link to="/cart-page-content-admin" className={styles.card_link}>
          <div className={styles.card}>Cart Page</div>
        </Link>
        <Link to="/events-admin" className={styles.card_link}>
          <div className={styles.card}>Events</div>
        </Link>
        <Link to="/products-admin" className={styles.card_link}>
          <div className={styles.card}>Products</div>
        </Link>
      </div>
    </div>
  );
}
