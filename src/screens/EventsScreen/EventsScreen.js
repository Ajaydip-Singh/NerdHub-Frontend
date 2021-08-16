import MediaQuery from 'react-responsive';
import BottomNav from '../../components/BottomNav/BottomNav';
import Event from '../../components/Event/Event';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import styles from './EventsScreen.module.css';

export default function EventsScreen() {
  return (
    <div>
      <Header events></Header>
      <div
        className={styles.main_wrapper}
        style={{
          backgroundImage:
            'url(https://cdn.wallpapersafari.com/0/20/wi7LZx.jpg)'
        }}
      >
        <Event order={0}></Event>
        <Event order={1}></Event>
        <Event order={2}></Event>
        <Event order={3}></Event>
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
