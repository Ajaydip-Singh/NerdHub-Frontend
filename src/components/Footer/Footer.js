import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Socials from '../Socials/Socials';
import styles from './Footer.module.css';
import { footerLinkVariant } from '../../animate';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className="row_f space-around container">
        <div>
          <h4 className={styles.footer_heading}>Address</h4>
          <p>
            Lorem ipsum dolor sit amet. <br />
            Lorem, ipsum dolor. <br />
            Lorem, ipsum dolor.
          </p>
        </div>
        <div>
          <h4 className={styles.footer_heading}>Explore</h4>
          <ul>
            <motion.li variants={footerLinkVariant} whileHover="hover">
              <Link className={styles.footer_link} to="/home">
                Home
              </Link>
            </motion.li>
            <motion.li variants={footerLinkVariant} whileHover="hover">
              <Link className={styles.footer_link} to="/events">
                Events
              </Link>
            </motion.li>
            <motion.li variants={footerLinkVariant} whileHover="hover">
              <Link className={styles.footer_link} to="/gallery">
                Gallery
              </Link>
            </motion.li>
            <motion.li variants={footerLinkVariant} whileHover="hover">
              <Link className={styles.footer_link} to="/membership">
                Membership
              </Link>
            </motion.li>
            <motion.li variants={footerLinkVariant} whileHover="hover">
              <Link className={styles.footer_link} to="/about">
                About
              </Link>
            </motion.li>
            <motion.li variants={footerLinkVariant} whileHover="hover">
              <Link className={styles.footer_link} to="/contact">
                Contact
              </Link>
            </motion.li>
            <motion.li variants={footerLinkVariant} whileHover="hover">
              <Link className={styles.footer_link} to="/shop">
                Shop
              </Link>
            </motion.li>
          </ul>
        </div>
        <div>
          <h4 className={styles.footer_heading}>Contact</h4>
          <ul className="column_f">
            <li className={styles.footer_list_item}>
              <a
                className={`row_f align-center ${styles.footer_link}`}
                href="mailto:"
              >
                <i class="fas fa-envelope fa-2x fa-fw"></i>
                Email
              </a>
            </li>
            <li className={styles.footer_list_item}>
              <a
                className={`row_f align-center ${styles.footer_link}`}
                href="tel:"
              >
                <i class="fas fa-phone-alt fa-2x fa-fw"></i>
                Phone
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className={styles.footer_heading}>Socials</h4>
          <Socials vertical dark text></Socials>
        </div>
      </div>
    </div>
  );
}
