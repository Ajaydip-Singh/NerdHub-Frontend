import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MediaQuery from 'react-responsive';
import BottomNav from '../../components/BottomNav/BottomNav';
import Event from '../../components/Event/Event';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';
import { getEvents } from '../../slices/eventSlices/eventsGetSlice';
import styles from './EventsScreen.module.css';

export default function EventsScreen() {
  const eventsGetSlice = useSelector((state) => state.eventsGetSlice);
  const { status, events, error } = eventsGetSlice;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEvents({}));
  }, [dispatch]);

  return (
    <div>
      <Header events></Header>
      <div
        className={styles.main_wrapper}
        style={{
          backgroundImage:
            'url(/images/cubes.jpeg)'
        }}
      >
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
