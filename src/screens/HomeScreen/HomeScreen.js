import MediaQuery, { useMediaQuery } from "react-responsive";
import BottomNav from "../../components/BottomNav/BottomNav";
import Header from "../../components/Header/Header";
import Socials from "../../components/Socials/Socials";
import Carousel from "react-bootstrap/Carousel";
import styles from "./HomeScreen.module.css";
import Footer from "../../components/Footer/Footer";
import { Player } from "video-react";

export default function HomeScreen() {
  const isSmallerScreen = useMediaQuery({ query: "(max-width: 800px)" });
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
          backgroundImage: "url(/images/many_fighters_green.png)",
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
      <MediaQuery minWidth={800}>
        <Footer></Footer>
      </MediaQuery>
      <MediaQuery maxWidth={800}>
        <BottomNav home></BottomNav>
      </MediaQuery>
    </div>
  );
}
