import ReactQuill from 'react-quill'; // ES6

import Header from '../../../components/Header/Header';
import DateTimePicker from '../../../components/DateTimePicker/DateTimePicker';
import styles from './EventEditScreen.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getEvent,
  resetGetEvent
} from '../../../slices/eventSlices/eventGetSlice';
import {
  resetUpdateEvent,
  updateEvent
} from '../../../slices/eventSlices/eventUpdateSlice';
import MessageBox from '../../../components/MessageBox/MessageBox';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';

export default function EventEditScreen(props) {
  const eventId = props.match.params.id;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [price, setPrice] = useState('');
  const [isFeaturedEvent, setIsFeaturedEvent] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [venue, setVenue] = useState('');
  const [category, setCategory] = useState('');
  const [isActive, setIsActive] = useState('');
  const [capacity, setCapacity] = useState('');
  const [actualNumberOfGuests, setActualNumberOfGuests] = useState('');

  const eventGetSlice = useSelector((state) => state.eventGetSlice);
  const { status, event, error } = eventGetSlice;

  const eventUpdateSlice = useSelector((state) => state.eventUpdateSlice);
  const {
    status: statusUpdate,
    event: eventUpdate,
    error: errorUpdate
  } = eventUpdateSlice;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetUpdateEvent());
    dispatch(
      updateEvent({
        _id: eventId,
        name,
        description,
        date,
        time,
        price,
        isFeaturedEvent,
        country,
        city,
        venue,
        category,
        isActive,
        capacity,
        actualNumberOfGuests
      })
    );
  };

  useEffect(() => {
    return () => {
      dispatch(resetUpdateEvent());
    };
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetGetEvent());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!event || event._id !== eventId) {
      dispatch(getEvent(eventId));
    } else {
      setName(event.name);
      setDescription(event.description);
      setDate(new Date(event.date));
      setTime(event.time);
      setPrice(event.price);
      setIsFeaturedEvent(event.isFeaturedEvent);
      setCountry(event.country);
      setCity(event.city);
      setVenue(event.venue);
      setCategory(event.category);
      setIsActive(event.isActive);
      setCapacity(event.capacity);
      setActualNumberOfGuests(event.actualNumberOfGuests);
    }
  }, [dispatch, event, eventId, props.history]);

  return (
    <div className={styles.main_wrapper}>
      <Header admin></Header>
      <div className={styles.hero_section}>
        <h1 className={styles.heading}>Edit Event</h1>
      </div>
      <div className={styles.wrapper}>
        {status === 'loading' ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <form onSubmit={submitHandler}>
            <div className={styles.editor_wrapper}>
              <div className="editor_wrapper">
                <h3>Name</h3>
                <ReactQuill
                  placeholder="Enter event name"
                  value={name}
                  onChange={setName}
                ></ReactQuill>
              </div>

              <div className="editor_wrapper">
                <h3>Description</h3>
                <ReactQuill
                  placeholder="Enter event description"
                  value={description}
                  onChange={setDescription}
                ></ReactQuill>
              </div>
              <div className="editor_wrapper">
                <h3>Date</h3>
                <DateTimePicker date={date} setDate={setDate}></DateTimePicker>
              </div>
              <div className="editor_wrapper">
                <h3>Time</h3>
                <input
                  value={time}
                  required
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="Type in the time exactly as you want it to appear"
                ></input>
              </div>
              <div className="editor_wrapper">
                <h3>Price</h3>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter price in Ksh"
                ></input>
              </div>
              <div className="editor_wrapper">
                <h3>Is Featured Event</h3>
                <select
                  value={isFeaturedEvent}
                  onChange={(e) => setIsFeaturedEvent(e.target.value)}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <div className="editor_wrapper">
                <h3>Country</h3>
                <input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Enter country"
                ></input>
              </div>
              <div className="editor_wrapper">
                <h3>City</h3>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city"
                ></input>
              </div>
              <div className="editor_wrapper">
                <h3>Venue</h3>
                <input
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="Enter venue"
                ></input>
              </div>
              <div className="editor_wrapper">
                <h3>Category</h3>
                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Enter category"
                ></input>
              </div>
              <div className="editor_wrapper">
                <h3>Is Active</h3>
                <select
                  value={isActive}
                  onChange={(e) => setIsActive(e.target.value)}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <div className="editor_wrapper">
                <h3>Capacity</h3>
                <input
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  placeholder="Enter capacity"
                ></input>
              </div>
              <div className="editor_wrapper">
                <h3>Actual Number Of Guests</h3>
                <input
                  value={actualNumberOfGuests}
                  onChange={(e) => setActualNumberOfGuests(e.target.value)}
                  placeholder="Enter capacity"
                ></input>
              </div>

              <div className="editor_wrapper">
                {errorUpdate && (
                  <MessageBox variant="danger">
                    Failed. Event not updated.
                  </MessageBox>
                )}
                {eventUpdate && (
                  <MessageBox variant="success">Event Updated</MessageBox>
                )}
                <button className={styles.button} type="submit">
                  {statusUpdate === 'loading' ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    `Update`
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
