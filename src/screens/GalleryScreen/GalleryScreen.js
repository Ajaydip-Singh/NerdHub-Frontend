import MediaQuery from "react-responsive";
import BottomNav from "../../components/BottomNav/BottomNav";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import styles from "./GalleryScreen.module.css";

export default function GalleryScreen() {
  return (
    <div>
      <Header gallery></Header>
      <MediaQuery minWidth={800}>
        <Footer></Footer>
      </MediaQuery>
      <MediaQuery maxWidth={800}>
        <BottomNav gallery></BottomNav>
      </MediaQuery>
    </div>
  );
}
