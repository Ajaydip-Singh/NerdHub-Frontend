import React from 'react';
import Header from '../../../components/Header/Header';
import styles from './ShopScreen.module.css';
import Footer from '../../../components/Footer/Footer';
import BottomNav from '../../../components/BottomNav/BottomNav';
import MediaQuery from 'react-responsive';

export default function ShopScreen() {
  return (
    <div className={styles.screen}>
      <Header shop></Header>

      <MediaQuery minWidth={800}>
        <Footer></Footer>
      </MediaQuery>
      <MediaQuery maxWidth={800}>
        <BottomNav></BottomNav>
      </MediaQuery>
    </div>
  );
}
