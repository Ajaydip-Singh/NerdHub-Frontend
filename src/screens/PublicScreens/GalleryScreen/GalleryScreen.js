import MediaQuery from 'react-responsive';
import { motion } from 'framer-motion';
import BottomNav from '../../../components/BottomNav/BottomNav';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Header/Header';
import styles from './GalleryScreen.module.css';
import { pageVariant, sectionVariant } from '../../../animate';
import { useState } from 'react';
import ProductImage from '../../../components/ProductImage/ProductImage';

export default function GalleryScreen() {
  const [fullscreen, setFullScreen] = useState(false);
  const [imageList, setImageList] = useState('');

  return (
    <div>
      <Header gallery></Header>
      <motion.div variants={pageVariant} initial="initial" animate="final">
        <div
          className={styles.main_wrapper}
          style={{
            backgroundImage: 'url(/images/destruction_long.jpeg)',
            width: '100%'
          }}
        >
          <motion.section
            className={styles.hero_section}
            initial={{ opacity: 0, x: '-100vw' }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            variants={sectionVariant}
            whileHover="hover"
          >
            <motion.div
              drag
              dragConstraints={{ top: 10, left: 10, right: 10, bottom: 10 }}
              dragTransition={{ bounceStiffness: 200, bounceDamping: 10 }}
              whileHover={{ x: 1.5, scale: 1.2 }}
              transition={{ yoyo: 5 }}
              whileDrag={{ scale: 1.2 }}
            >
              <h1>Gallery</h1>
            </motion.div>
          </motion.section>
          <div className={styles.gallery}>
            <ProductImage
              imageThumbnail={'/images/destruction_long.jpeg'}
            ></ProductImage>
            <ProductImage
              imageThumbnail={'/images/destruction_long.jpeg'}
            ></ProductImage>
            <ProductImage
              imageThumbnail={'/images/destruction_long.jpeg'}
            ></ProductImage>
            <ProductImage
              imageThumbnail={'/images/destruction_long.jpeg'}
            ></ProductImage>
            <ProductImage
              imageThumbnail={'/images/destruction_long.jpeg'}
            ></ProductImage>
            <ProductImage
              imageThumbnail={'/images/destruction_long.jpeg'}
            ></ProductImage>
            <ProductImage
              imageThumbnail={'/images/destruction_long.jpeg'}
            ></ProductImage>
          </div>
        </div>
        <MediaQuery minWidth={800}>
          <Footer></Footer>
        </MediaQuery>
        <MediaQuery maxWidth={800}>
          <BottomNav gallery></BottomNav>
        </MediaQuery>
      </motion.div>
    </div>
  );
}
