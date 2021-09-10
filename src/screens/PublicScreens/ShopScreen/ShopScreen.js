import React, { useEffect, useState } from 'react';
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
import { getProductsCategories } from '../../../slices/productSlices/productsCategoriesGetSlice';
import { getProductsBrands } from '../../../slices/productSlices/productsBrandsGetSlice';

export default function ShopScreen() {
  const [inputProductName, setInputProductName] = useState('');
  const [searchProductName, setSearchProductName] = useState('');
  const [category, setCategory] = useState('all');
  const [brand, setBrand] = useState('all');

  const productsGetSlice = useSelector((state) => state.productsGetSlice);
  const productsCategoriesGetSlice = useSelector(
    (state) => state.productsCategoriesGetSlice
  );
  const productsBrandsGetSlice = useSelector(
    (state) => state.productsBrandsGetSlice
  );

  const { status, products, error } = productsGetSlice;
  const { categories } = productsCategoriesGetSlice;
  const { brands } = productsBrandsGetSlice;

  const submitHandler = (e) => {
    e.preventDefault();
    setSearchProductName(inputProductName);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getProducts({
        name: searchProductName,
        category: category === 'all' ? '' : category,
        brand: brand === 'all' ? '' : brand
      })
    );
  }, [dispatch, category, brand, searchProductName]);

  useEffect(() => {
    dispatch(getProducts({}));
    dispatch(getProductsCategories());
    dispatch(getProductsBrands());
  }, [dispatch]);

  return (
    <div className={styles.screen}>
      <Header shop></Header>
      <div className={styles.main_wrapper}>
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 1 }}
          className={styles.filterbox}
        >
          <div className={styles.wrapper}>
            <form className={styles.search} onSubmit={submitHandler}>
              <div className="row_f">
                <input
                  className={styles.input}
                  type="text"
                  name="q"
                  value={inputProductName}
                  onChange={(e) => setInputProductName(e.target.value)}
                  placeholder="Search product by name"
                  id="q"
                />
                <button
                  type="submit"
                  className={styles.search_button}
                  onClick={() => setSearchProductName(inputProductName)}
                >
                  <i className="fa fa-search"></i>
                </button>
              </div>
              <div className={styles.filter_button_wrapper}>
                <select
                  className={`${styles.search_button} ${styles.filter_button}`}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {categories &&
                    categories.map((category) => (
                      <option value={category}>{category}</option>
                    ))}
                </select>
                <select
                  className={`${styles.search_button} ${styles.filter_button}`}
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                >
                  <option value="all">All Brands</option>
                  {brands &&
                    brands.map((brand) => (
                      <option value={brand}>{brand}</option>
                    ))}
                </select>
              </div>
            </form>
          </div>
        </motion.div>
        <div className="min_page_height search_box">
          {status === 'loading' ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <motion.div
              variants={pageVariant}
              initial="initial"
              animate="final"
              className={styles.products_wrapper}
            >
              {products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </motion.div>
          )}
        </div>
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
