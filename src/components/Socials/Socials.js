import styles from "./Socials.module.css";

export default function Socials({ vertical }) {
  return (
    <ul
      className={`align_center space_between ${styles.social_list} ${
        vertical ? `column_f` : `row_f`
      }`}
    >
      <li className={styles.social_list_item}>
        <a href="https://web.facebook.com/" className={styles.social_link}>
          <i class="fab fa-facebook fa-2x"></i>
        </a>
      </li>

      <li className={styles.social_list_item}>
        <a href="https://www.instagram.com/" className={styles.social_link}>
          <i class="fab fa-instagram fa-2x"></i>
        </a>
      </li>
      <li className={styles.social_list_item}>
        <a href="https://twitter.com/" className={styles.social_link}>
          <i class="fab fa-twitter-square fa-2x"></i>
        </a>
      </li>
    </ul>
  );
}
