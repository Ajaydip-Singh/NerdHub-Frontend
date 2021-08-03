import MediaQuery, { useMediaQuery } from "react-responsive";
import BottomNav from "../../components/BottomNav/BottomNav";
import Header from "../../components/Header/Header";
import Carousel from "react-bootstrap/Carousel";
import styles from "./HomeScreen.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function HomeScreen() {
  const isSmallerScreen = useMediaQuery({ query: "(max-width: 800px)" });
  return (
    <div>
      <Header home></Header>
      <section className={styles.hero_section}>
        <Carousel>
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
            <Carousel.Caption>
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

            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>
      <MediaQuery maxWidth={800}>
        <BottomNav home></BottomNav>
      </MediaQuery>
    </div>
  );
}
