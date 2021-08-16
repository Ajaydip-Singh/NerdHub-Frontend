import { Link } from 'react-router-dom';
import styles from './Event.module.css';

export default function Event(props) {
  //   const { event } = props;
  const { order } = props;

  return (
    <div className={`${styles.event}`}>
      <div
        className={`${styles.event_info} ${
          order % 2 !== 0 ? styles.order_first : ``
        } `}
      >
        <h1 className={styles.event_heading}>Lorem, ipsum.</h1>
        <h3 className={styles.event_date}>
          <i class="fas fa-calendar-day"></i> Friday 4th August
        </h3>
        <div className={styles.event_logistics}>
          <ul className="row_f">
            <li className={styles.event_list_item}>
              <i class="fas fa-users fa-fw"></i> 5
            </li>
            <li className={styles.event_list_item}>
              <i class="fas fa-clock fa-fw"></i> 60
            </li>
            <li className={styles.event_list_item}>
              <i class="fas fa-map-marker-alt fa-fw"></i> South B, Nairobi
            </li>
          </ul>
        </div>
        <p className={styles.event_description}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur id
          enim ut eius ad quo aliquam fuga quam error modi accusantium illum
          laudantium, nihil numquam atque quasi voluptate ab tenetur? Vitae
          repellendus autem asperiores illum. Obcaecati molestias nisi tenetur
          recusandae facilis. Cum suscipit eum aperiam consectetur! Mollitia ad
          a molestias?
        </p>
        <Link href="#" className={styles.event_button}>
          Learn more
        </Link>
      </div>
      <img
        className={styles.event_image}
        src="/images/player_gaming.jpeg"
        alt=""
      />
    </div>
  );
}
