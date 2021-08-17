import { Link } from 'react-router-dom';
import styles from './Event.module.css';
import { formatDate } from '../../utils';

export default function Event(props) {
  const { event, order } = props;
  console.log(order);

  return (
    <div key={event._id} className={`${styles.event}`}>
      <div
        className={`${styles.event_info} ${
          order % 2 !== 0 ? styles.order_second : ``
        } `}
      >
        <h1 className={styles.event_heading}>{event.name}</h1>
        <h3 className={styles.event_date}>
          <i class="fas fa-calendar-day"></i>
          {` `}
          {formatDate(event.date)}
        </h3>
        <div className={styles.event_logistics}>
          <ul className="row_f">
            {event.capacity ? (
              <li className={styles.event_list_item}>
                <i class="fas fa-users fa-fw"></i>
                {` `}
                {event.capacity}
              </li>
            ) : (
              ``
            )}
            <li className={styles.event_list_item}>
              <i class="fas fa-clock fa-fw"></i> {` `}
              {event.duration}
            </li>
            <li className={styles.event_list_item}>
              <i class="fas fa-map-marker-alt fa-fw"></i>
              {` `}
              {event.venue}
            </li>
          </ul>
        </div>
        <p className={styles.event_description}>{event.description}</p>
        <Link href="#" className={styles.event_button}>
          Learn more
        </Link>
      </div>
      <div
        className={`${styles.event_image_container} ${
          order % 2 !== 0 ? styles.order_first : ``
        } `}
      >
        <img
          className={styles.event_image}
          src={event.image}
          alt={event.name}
        />
      </div>
    </div>
  );
}
