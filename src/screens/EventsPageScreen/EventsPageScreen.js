import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';
import {
  deleteEvent,
  resetDeleteEvent
} from '../../slices/eventSlices/eventDeleteSlice';
import { getEvents } from '../../slices/eventSlices/eventsGetSlice';
import { formatDate } from '../../utils';
import styles from './EventsPageScreen.module.css';

export default function EventsPageScreen(props) {
  const eventsGetSlice = useSelector((state) => state.eventsGetSlice);
  const { status, events, error } = eventsGetSlice;

  const eventDeleteSlice = useSelector((state) => state.eventDeleteSlice);
  const {
    status: statusDelete,
    event: eventDelete,
    error: errorDelete
  } = eventDeleteSlice;

  const createHandler = () => {};
  const dispatch = useDispatch();
  const deleteHandler = (eventId) => {
    dispatch(deleteEvent(eventId));
  };

  // Cleanup events page on unmount
  useEffect(() => {
    return () => {
      dispatch(resetDeleteEvent());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getEvents({}));
  }, [dispatch, eventDelete]);

  return (
    <div>
      <Header admin events_page></Header>
      <div className={styles.hero_section}>
        <h1 className={styles.heading}>Events Page</h1>
      </div>
      <div className="table_wrapper">
        {statusDelete === 'loading' && <LoadingBox></LoadingBox>}
        {eventDelete && (
          <MessageBox variant="success">Event Deleted Succesfully</MessageBox>
        )}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        <button type="button" onClick={createHandler} className={styles.button}>
          Create Event
        </button>
        {status === 'loading' ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Date</th>
                <th>Category</th>
                <th>Is Active</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  <td>{event._id}</td>
                  <td>{event.name}</td>
                  <td>{formatDate(event.date)}</td>
                  <td>{event.category}</td>
                  <td>{event.isActive}</td>
                  <td>{event.price}</td>
                  <td>
                    <button
                      className="small"
                      type="button"
                      onClick={() =>
                        props.history.push(`/events/${event._id}/edit`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteHandler(event._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
