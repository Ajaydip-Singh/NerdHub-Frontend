import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import Rating from '../../../components/Rating/Rating';
import {
  getProduct,
  resetGetProduct
} from '../../../slices/productSlices/productGetSlice';
import { stripHtml } from '../../../utils';
import styles from './ProductScreen.module.css';

export default function ProductScreen(props) {
  const productId = props.match.params.id;

  const [qty, setQty] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);

  const productGetSlice = useSelector((state) => state.productGetSlice);
  const { status, product, error } = productGetSlice;

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetGetProduct());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProduct(productId));
  }, [dispatch, productId]);

  return (
    <div>
      <Header shop></Header>
      {status === 'loading' ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className={styles.main_wrapper}>
            <div>
              <Link
                className={`button border_bottom ${styles.back_button}`}
                to="/shop"
              >
                Back to Shop
              </Link>
              <div
                className={fullscreen ? styles.fullscreen : ''}
                onClick={() => {
                  fullscreen ? setFullscreen(false) : setFullscreen(true);
                }}
              >
                <img
                  className={`${styles.product_image} ${
                    fullscreen ? styles.image_fullscreen : ''
                  }`}
                  src={product && product.image}
                  alt={product && stripHtml(product.pageName)}
                />
              </div>
            </div>
            <div className={styles.info}>
              <div className="ql-editor">
                {product && parse(product.pageName)}
              </div>
              <Rating
                rating={product && product.rating}
                numReviews={product && product.numReviews}
              ></Rating>
              <div className="ql-editor">
                {product && parse(product.pageDisplayPrice)}
              </div>
              <div className="ql-editor">
                {product && parse(product.description)}
              </div>
            </div>
            <div className={styles.checkout}>
              <table className="table">
                <tbody>
                  <tr>
                    <td>Price:</td>
                    <td>KES {product && product.price}</td>
                  </tr>
                  <tr>
                    <td>Status:</td>
                    <td>
                      {product && product.countInStock > 0 ? (
                        <span className="success">Available</span>
                      ) : (
                        <span>Not In Stock</span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Quantity:</td>
                    <td>
                      <select
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product && product.countInStock).keys()].map(
                          (x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          )
                        )}
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                onClick={addToCartHandler}
                className={`button border_bottom ${styles.cart_button}`}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
