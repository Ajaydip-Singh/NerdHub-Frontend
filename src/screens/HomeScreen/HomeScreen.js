import MediaQuery, { useMediaQuery } from 'react-responsive';
import BottomNav from '../../components/BottomNav/BottomNav';
import Header from '../../components/Header/Header';
import Socials from '../../components/Socials/Socials';
import Carousel from 'react-bootstrap/Carousel';
import styles from './HomeScreen.module.css';
import Footer from '../../components/Footer/Footer';
import { Player } from 'video-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getEvents } from '../../slices/eventSlices/eventsGetSlice';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Event from '../../components/Event/Event';
import LoadingBox from '../../components/LoadingBox/LoadingBox';

export default function HomeScreen() {
  const isSmallerScreen = useMediaQuery({ query: '(max-width: 800px)' });
  const nextIcon = (
    <span
      aria-hidden="true"
      className={`carousel-control-next-icon ${styles.next_icon}`}
    />
  );

  const prevIcon = (
    <span
      aria-hidden="true"
      className={`carousel-control-prev-icon ${styles.prev_icon}`}
    />
  );

  const eventsGetSlice = useSelector((state) => state.eventsGetSlice);
  const { status, events, error } = eventsGetSlice;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEvents({}));
  }, [dispatch]);

  return (
    <div>
      <Header home></Header>
      <section className={styles.hero_section}>
        <Carousel
          fade
          indicators={false}
          nextIcon={nextIcon}
          prevIcon={prevIcon}
        >
          <Carousel.Item>
            <img
              className={`d-block w-100 ${styles.carousel_image} ${
                isSmallerScreen
                  ? `${styles.image_small_screen}`
                  : `${styles.image_large_screen}`
              }`}
              src="/images/gaming_room.jpeg"
              alt="First slide"
            />
            <Carousel.Caption className={styles.carousel_caption}>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className={`d-block w-100 ${styles.carousel_image} ${
                isSmallerScreen
                  ? `${styles.image_small_screen}`
                  : `${styles.image_large_screen}`
              }`}
              src="/images/player_gaming.jpeg"
              alt="Second slide"
            />

            <Carousel.Caption className={styles.carousel_caption}>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>
      <MediaQuery minWidth={800}>
        <p className={styles.rotated_text}>Scroll Down</p>
        <div className={styles.social_icons}>
          <Socials vertical />
        </div>
      </MediaQuery>
      <section
        style={{
          backgroundImage: 'url(/images/many_fighters_green.png)'
        }}
        className={styles.video_section}
      >
        <div className={styles.video_container}>
          <div>
            <h2 className={styles.section_heading}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum,
              cupiditate.
            </h2>
          </div>
          <div className={styles.video}>
            <Player
              poster="/images/knife_dark.jpeg"
              src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
            ></Player>
          </div>
        </div>
      </section>
      {status === 'loading' ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        ''
      ) : (
        <section>
          <div
            className={styles.events_slider_background}
            style={{
              backgroundImage: 'url(/images/fighters_dark.jpeg)',
              backgroundSize: 'cover'
            }}
          >
            <h2 className={styles.events_section_heading}>
              Upcoming{' '}
              <Link className={styles.link} to="/events">
                Events
              </Link>
            </h2>
            <AliceCarousel
              mouseTracking={true}
              keyboardNavigation={true}
              animationDuration={800}
              renderNextButton={() => nextIcon}
              renderPrevButton={() => prevIcon}
              infinite="true"
              items={events.map((event, index) => (
                <Event order={index} event={event}></Event>
              ))}
            />
          </div>
        </section>
      )}

      <div className={`row container ${styles.contact_wrapper}`}>
        <div className="col-md">
          <p className={styles.contact_info}>
            Contact us about <span className="green">press matters, </span>
            potential <span className="green">sponsorships, </span>
            and
            <span className="green"> membership </span>inquiries.
          </p>
          <Link className="link border_bottom" to="/about">
            Learn more about us
          </Link>
          <div className={styles.socials}>
            <Socials></Socials>
          </div>
        </div>
        <div className="col-md">
          <form action="" className={styles.form}>
            <div>
              <textarea
                className={styles.textarea}
                placeholder="Write Message"
                name=""
                id=""
                rows="5"
              ></textarea>
            </div>
            <div className={`row_f space-between ${styles.inputs_wrapper}`}>
              <input
                className={styles.input}
                type="text"
                placeholder="Your Name"
              />
              <input
                className={styles.input}
                type="text"
                placeholder="Your Email"
              />
            </div>
            <div>
              <button className={styles.submit_button} type="submit">
                Submit message
              </button>
            </div>
          </form>
        </div>
      </div>
      <MediaQuery minWidth={800}>
        <Footer></Footer>
      </MediaQuery>
      <MediaQuery maxWidth={800}>
        <BottomNav home></BottomNav>
      </MediaQuery>
    </div>
  );
}
