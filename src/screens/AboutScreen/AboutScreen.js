import MediaQuery from "react-responsive";
import BottomNav from "../../components/BottomNav/BottomNav";
import Header from "../../components/Header/Header";
import styles from "./AboutScreen.module.css";

export default function AboutScreen() {
  return (
    <div>
      <Header about></Header>
      <section
        className={styles.hero_section}
        style={{ backgroundImage: "url(/images/about_us_hero.jpeg)" }}
      >
        <h1 className={styles.heading}>About us</h1>
      </section>

      <MediaQuery maxWidth={800}>
        <BottomNav about></BottomNav>
      </MediaQuery>
    </div>
  );
}
