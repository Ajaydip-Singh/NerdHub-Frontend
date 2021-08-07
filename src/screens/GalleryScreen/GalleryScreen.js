import MediaQuery from "react-responsive";
import BottomNav from "../../components/BottomNav/BottomNav";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import styles from "./GalleryScreen.module.css";

export default function GalleryScreen() {
  return (
    <div>
      <Header gallery></Header>
      <div
        className={styles.main_wrapper}
        style={{
          backgroundImage: "url(/images/destruction_long.jpeg)",
          width: "100%",
          height: "200vh",
        }}
      ></div>

      <MediaQuery minWidth={800}>
        <Footer></Footer>
      </MediaQuery>
      <MediaQuery maxWidth={800}>
        <BottomNav gallery></BottomNav>
      </MediaQuery>
    </div>
  );
}
