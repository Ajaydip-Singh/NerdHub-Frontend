import MediaQuery from 'react-responsive';
import BottomNav from '../../components/BottomNav/BottomNav';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import styles from './AboutScreen.module.css';
import { Player } from 'video-react';

export default function AboutScreen() {
  return (
    <div>
      <Header about></Header>
      <div
        className={styles.main_wrapper}
        style={{
          backgroundImage: 'url(images/fighters.jpeg)'
        }}
      >
        <section className={styles.hero_section}>
          <h1 className={styles.heading}>About us</h1>
        </section>
        <section className={styles.video_section}>
          <div className={styles.video_container}>
            <div className={styles.video}>
              <Player
                poster="/images/knife_dark.jpeg"
                src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
              ></Player>
            </div>
          </div>
        </section>
        <section>
          <div
            className={`row container align-center space-evenly ${styles.wrapper}`}
          >
            <div className="col-md">
              <h1>What we do</h1>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni
                consectetur, dolor illum aperiam repellat numquam iure,
                laudantium sunt tenetur aut quasi eum vel maxime deleniti
                corporis quod nemo totam optio.
              </p>
            </div>

            <div className="col-md">
              <img
                src="/nerdhub.png"
                className={styles.logo}
                alt="Nerdhub Logo"
              />
            </div>
          </div>
        </section>
      </div>
      <MediaQuery minWidth={800}>
        <Footer></Footer>
      </MediaQuery>
      <MediaQuery maxWidth={800}>
        <BottomNav></BottomNav>
      </MediaQuery>
    </div>
  );
}
