import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MediaQuery from 'react-responsive';
import Header from '../../../components/Header/Header';
import { getCartPageContent } from '../../../slices/pageSlices/cartPageContentSlices/cartPageContentGetSlice';
import {} from '../../../slices/shopSlices/cartSlice';
import { motion } from 'framer-motion';
import styles from './PostPaymentScreen.module.css';
import { pageVariant, sectionVariant } from '../../../animate';
import Footer from '../../../components/Footer/Footer';
import BottomNav from '../../../components/BottomNav/BottomNav';
import { Link } from 'react-router-dom';
import qs from 'qs';

export default function PostPaymentScreen(props) {
  const params = qs.parse(props.location.search, {
    ignoreQueryPrefix: true
  }).__firebase_request_key;
  console.log(params);

  const cartSlice = useSelector((state) => state.cartSlice);
  const { cart } = cartSlice;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartPageContent({}));
  }, [dispatch]);

  return (
    <div className={styles.screen}>
      <Header shop></Header>
      <motion.div
        style={{
          backgroundImage: `url(/images/destruction_long.jpeg)`
        }}
        variants={pageVariant}
        initial="initial"
        animate="final"
      >
        <motion.div
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
            <h1>Thank you for your purchase</h1>
          </motion.div>
        </motion.div>
        <div>
          <p
            style={{
              margin: '0 auto',
              maxWidth: 'max-content',
              padding: '2rem'
            }}
          >
            Your payment is being processed. We will notify you once it has
            completed.
            <br />
            <Link to="/shop">Continue Shopping</Link>
          </p>
        </div>
      </motion.div>
      <MediaQuery minWidth={800}>
        <Footer></Footer>
      </MediaQuery>
      <MediaQuery maxWidth={800}>
        <BottomNav></BottomNav>
      </MediaQuery>
    </div>
  );
}
