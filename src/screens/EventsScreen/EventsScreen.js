import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MediaQuery from 'react-responsive';
import BottomNav from '../../components/BottomNav/BottomNav';
import Event from '../../components/Event/Event';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';
import { getEventsCategories } from '../../slices/eventSlices/eventsCategoriesGetSlice';
import { getEvents } from '../../slices/eventSlices/eventsGetSlice';
import styles from './EventsScreen.module.css';

export default function EventsScreen(props) {
  const [defaultCategory, setDefaultCategory] = useState('all');

  const eventsGetSlice = useSelector((state) => state.eventsGetSlice);
  const { status, events, error } = eventsGetSlice;

  const eventsCategoriesGetSlice = useSelector(
    (state) => state.eventsCategoriesGetSlice
  );
  const { categories } = eventsCategoriesGetSlice;

  const venues = [...new Set(events.map((event) => event.venue))];

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const dispatch = useDispatch();

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    dispatch(getEvents({ category: category === 'all' ? '' : category }));
    setDefaultCategory(category);
  };

  useEffect(() => {
    dispatch(getEvents({}));
    dispatch(getEventsCategories());
  }, [dispatch]);

  return (
    <div>
      <Header events></Header>
      <div
        className={styles.main_wrapper}
        style={{
          backgroundImage: 'url(/images/cubes.jpeg)'
        }}
      >
        <div className={styles.filterbox}>
          <div className={styles.wrapper}>
            <form className={styles.search} onSubmit={submitHandler}>
              <div className="row_f">
                <input
                  className={styles.input}
                  type="text"
                  name="q"
                  placeholder="Search event by name"
                  id="q"
                />
                <button type="submit" className={styles.search_button}>
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </form>
            <div className={styles.filter_button_wrapper}>
              <select
                className={`${styles.search_button} ${styles.filter_button}`}
                value={defaultCategory}
                onChange={handleCategoryChange}
              >
                <option value="all">All Categories</option>
                {categories &&
                  categories.map((category) => (
                    <option value={category}>{category}</option>
                  ))}
              </select>
              <select
                className={`${styles.search_button} ${styles.filter_button}`}
              >
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
        </div>
        {status === 'loading' ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          events.map((event, index) => (
            <Event order={index} event={event}></Event>
          ))
        )}
      </div>

      <MediaQuery minWidth={800}>
        <Footer></Footer>
      </MediaQuery>
      <MediaQuery maxWidth={800}>
        <BottomNav events></BottomNav>
      </MediaQuery>
    </div>
  );
}
