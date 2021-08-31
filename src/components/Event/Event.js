import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import styles from './Event.module.css';
import { formatDate } from '../../utils';

export default function Event(props) {
  const { event, order } = props;

  return (
    <div key={event._id} className={`${styles.event}`}>
      <div
        className={`${styles.event_info} ${
          order % 2 !== 0 ? styles.order_second : ``
        } `}
        style={{
          backgroundColor: event.backgroundColor
            ? event.backgroundColor
            : '#50d450'
        }}
      >
        {parse(event.name)}
        <h3 className={styles.event_date}>
          <i class="fas fa-calendar-day"></i>
          {` `}
          {formatDate(event.date)}
        </h3>
        <div className={styles.event_logistics}>
          <ul className={`row_f ${styles.event_list}`}>
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
              {event.time}
            </li>
            <li className={styles.event_list_item}>
              <i class="fas fa-map-marker-alt fa-fw"></i>
              {` `}
              {event.venue}
            </li>
          </ul>
        </div>
        {/* <p className={styles.event_description}>{event.description}</p> */}
        {parse(event.description)}
        <Link href="#" className={styles.event_button}>
          Register for {event.price !== 0?`KSh ${event.price}`: 'Free'}
        </Link>
      </div>
      <div
        className={`${styles.event_image_container} ${
          order % 2 !== 0 ? styles.order_first : ``
        } `}
        style={{
          border: event.borderColor
            ? `2px solid ${event.borderColor}`
            : '2px solid #50d450'
        }}
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
