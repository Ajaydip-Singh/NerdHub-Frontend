import { useState } from 'react';
import styles from './FilterBox.module.css';

export default function FilterBox(props) {
  const { events } = props;

  const categories = [...new Set(events.map((event) => event.category))];
  const venues = [...new Set(events.map((event) => event.venue))];

  const [name, setName] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.search} onSubmit={submitHandler}>
        <div className="row_f">
          <input
            className={styles.input}
            type="text"
            name="q"
            placeholder="Search event by name"
            id="q"
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className={styles.search_button}>
            <i className="fa fa-search"></i>
          </button>
        </div>
      </form>
      <div className={styles.filter_button_wrapper}>
        <select className={`${styles.search_button} ${styles.filter_button}`}>
          <option value="">All Categories</option>
          {categories &&
            categories.map((category) => (
              <>
                <option value={category}>{category}</option>
              </>
            ))}
        </select>
        <select className={`${styles.search_button} ${styles.filter_button}`}>
          <option value="">All Venues</option>
          {venues &&
            venues.map((venue) => (
              <>
                <option value={venue}>{venue}</option>
              </>
            ))}
        </select>
      </div>
    </div>
  );
}
