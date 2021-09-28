import styles from './Socials.module.css';
import { motion } from 'framer-motion';
import { footerLinkVariant } from '../../animate';

export default function Socials({ vertical, color, hoverColor, text }) {
  return (
    <ul
      className={`align_center space_between ${styles.social_list} ${
        vertical ? `column_f` : `row_f`
      }`}
    >
      <li className={styles.social_list_item}>
        <motion.a
          whileHover={{ scale: 1.3, color: hoverColor ? hoverColor : '#fff' }}
          href="https://web.facebook.com/"
          className={`row_f align-center ${styles.social_link}`}
          style={{ color: color && color }}
        >
          <i class="fab fa-facebook fa-2x fa-fw"></i>

          {text ? 'Facebook' : ''}
        </motion.a>
      </li>

      <li className={styles.social_list_item}>
        <motion.a
          whileHover={{ scale: 1.3, color: hoverColor ? hoverColor : '#fff' }}
          href="https://www.instagram.com/"
          className={`row_f align-center ${styles.social_link}`}
          style={{ color: color && color }}
        >
          <i class="fab fa-instagram fa-2x fa-fw"></i>
          {text ? 'Instagram' : ''}
        </motion.a>
      </li>
      <li className={styles.social_list_item}>
        <motion.a
          whileHover={{ scale: 1.3, color: hoverColor ? hoverColor : '#fff' }}
          href="https://twitter.com/"
          className={`row_f align-center ${styles.social_link}`}
          style={{ color: color && color }}
        >
          <i class="fab fa-twitter-square fa-2x fa-fw"></i>
          {text ? 'Twitter' : ''}
        </motion.a>
      </li>
    </ul>
  );
}
