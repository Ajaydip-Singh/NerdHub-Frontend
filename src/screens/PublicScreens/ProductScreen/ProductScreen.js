import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
        <div className={styles.main_wrapper}>
          <div>
            <img
              className={styles.product_image}
              src={product && product.image}
              alt={product && stripHtml(product.pageName)}
            />
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
      )}
    </div>
    //         <div className="col-1">
    //           <div className="card card-body">
    //             <ul>
    //               <li>
    //                 <div className="row">
    //                   <div>Price</div>
    //                   <div className="price">{product.price}</div>
    //                 </div>
    //               </li>
    //               <li>
    //                 <div className="row">
    //                   <div>Status</div>
    //                   <div>
    //                     {product.countInStock > 0 ? (
    //                       <span className="success">In Stock</span>
    //                     ) : (
    //                       <span className="error">Unavailable</span>
    //                     )}
    //                   </div>
    //                 </div>
    //               </li>
    //               {product.countInStock > 0 && (
    //                 <>
    //                   <li>
    //                     <div className="row">
    //                       <div>Qty</div>
    //                       <div>
    //                         <select
    //                           value={qty}
    //                           onChange={(e) => setQty(e.target.value)}
    //                         >
    //                           {[...Array(product.countInStock).keys()].map(
    //                             (x) => (
    //                               <option key={x + 1} value={x + 1}>
    //                                 {x + 1}
    //                               </option>
    //                             )
    //                           )}
    //                         </select>
    //                       </div>
    //                     </div>
    //                   </li>
    //                   <li>
    //                     <button
    //                       onClick={addToCartHandler}
    //                       className="primary block"
    //                     >
    //                       Add to Cart
    //                     </button>
    //                   </li>
    //                 </>
    //               )}
    //             </ul>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </div>
  );
}
