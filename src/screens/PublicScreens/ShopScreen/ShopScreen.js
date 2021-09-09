import React, { useEffect } from 'react';
import Header from '../../../components/Header/Header';
import styles from './ShopScreen.module.css';
import Footer from '../../../components/Footer/Footer';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import BottomNav from '../../../components/BottomNav/BottomNav';
import Product from '../../../components/Product/Product';
import MediaQuery from 'react-responsive';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getProducts } from '../../../slices/productSlices/productsGetSlice';
import { pageVariant } from '../../../animate';
import { motion } from 'framer-motion';

export default function ShopScreen() {
  const productsGetSlice = useSelector((state) => state.productsGetSlice);
  const { status, products, error } = productsGetSlice;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts({}));
  }, [dispatch]);

  return (
    <div className={styles.screen}>
      <Header shop></Header>
      <div className="min_page_height">
        {status === 'loading' ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <motion.div
            className={styles.products_wrapper}
            variants={pageVariant}
            initial="initial"
            animate="final"
          >
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </motion.div>
        )}
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
