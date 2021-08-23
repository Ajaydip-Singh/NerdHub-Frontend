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
import { getEventsVenues } from '../../slices/eventSlices/eventsVenuesGetSlice';
import styles from './EventsScreen.module.css';

export default function EventsScreen(props) {
  const [inputEventName, setInputEventName] = useState('');
  const [searchEventName, setSearchEventName] = useState('');
  const [category, setCategory] = useState('all');
  const [venue, setVenue] = useState('all');

  const eventsGetSlice = useSelector((state) => state.eventsGetSlice);
  const eventsCategoriesGetSlice = useSelector(
    (state) => state.eventsCategoriesGetSlice
  );
  const eventsVenuesGetSlice = useSelector(
    (state) => state.eventsVenuesGetSlice
  );

  const { status, events, error } = eventsGetSlice;
  const { categories } = eventsCategoriesGetSlice;
  const { venues } = eventsVenuesGetSlice;

  const submitHandler = (e) => {
    e.preventDefault();
    setSearchEventName(inputEventName);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getEvents({
        name: searchEventName,
        category: category === 'all' ? '' : category,
        venue: venue === 'all' ? '' : venue
      })
    );
  }, [dispatch, category, venue, searchEventName]);

  useEffect(() => {
    dispatch(getEvents({}));
    dispatch(getEventsCategories());
    dispatch(getEventsVenues());
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
                  value={inputEventName}
                  onChange={(e) => setInputEventName(e.target.value)}
                  placeholder="Search event by name"
                  id="q"
                />
                <button
                  type="submit"
                  className={styles.search_button}
                  onClick={() => setSearchEventName(inputEventName)}
                >
                  <i className="fa fa-search"></i>
                </button>
              </div>
              <div className={styles.filter_button_wrapper}>
                <select
                  className={`${styles.search_button} ${styles.filter_button}`}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {categories &&
                    categories.map((category) => (
                      <option value={category}>{category}</option>
                    ))}
                </select>
                <select
                  className={`${styles.search_button} ${styles.filter_button}`}
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                >
                  <option value="all">All Venues</option>
                  {venues &&
                    venues.map((venue) => (
                      <option value={venue}>{venue}</option>
                    ))}
                </select>
              </div>
            </form>
          </div>
        </div>
        <div className={styles.events_wrapper}>
          {status === 'loading' ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            events.map(
              (event, index) =>
                event.isActive && <Event order={index} event={event}></Event>
            )
          )}
        </div>
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
