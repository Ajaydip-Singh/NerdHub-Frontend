import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import Header from '../../../components/Header/Header';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import { getCartPageContent } from '../../../slices/pageSlices/cartPageContentSlices/cartPageContentGetSlice';
import parse from 'html-react-parser';
import { motion } from 'framer-motion';
import styles from './OrderScreen.module.css';
import { pageVariant, sectionVariant } from '../../../animate';
import Footer from '../../../components/Footer/Footer';
import BottomNav from '../../../components/BottomNav/BottomNav';
import axios from 'axios';

export default function OrderScreen(props) {
  const [total, setTotal] = useState(0);

  const userAuthentication = useSelector((state) => state.userAuthentication);
  const { user } = userAuthentication;

  const cartPageContentGetSlice = useSelector(
    (state) => state.cartPageContentGetSlice
  );
  const { status, content, error } = cartPageContentGetSlice;

  const cartSlice = useSelector((state) => state.cartSlice);
  const { cart } = cartSlice;

  const dispatch = useDispatch();

  const onPesaPalPaymentHandler = async () => {
    const { data } = await axios.post('/api/pesapal/order/post', {
      Amount: '5',
      Type: 'MERCHANT',
      Description: 'sample',
      Reference: '1234',
      Email: user.email,
      FirstName: user.firstName,
      LastName: user.lastName
    });
    window.location.href = data;
  };

  useEffect(() => {
    if (cart) {
      setTotal(
        cart.reduce(
          (a, c) => a + parseFloat(c.price) * parseFloat(c.quantity),
          0
        )
      );
    }
  }, [cart]);

  useEffect(() => {
    dispatch(getCartPageContent({}));
  }, [dispatch]);

  return (
    <div className={styles.screen}>
      <Header shop></Header>
      {status === 'loading' ? (
        <div className="min_page_height">
          <LoadingBox></LoadingBox>
        </div>
      ) : error ? (
        <div className="min_page_height">
          <MessageBox variant="danger">
            Oops. We are temporarily unavailable. Please try again later.
          </MessageBox>
        </div>
      ) : (
        <motion.div
          style={{
            backgroundImage: `url(${content && content.cartBackgroundImage})`
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
              <div className="ql-editor">
                {content && parse(content.cartMainHeading)}
              </div>
            </motion.div>
          </motion.div>
          <div className={styles.main_wrapper}>
            {/* <h1>Shopping cart</h1> */}
            {cart.length === 0 ? (
              <div className={styles.empty_cart}>
                Cart is empty. <Link to="/shop">Go shopping</Link>
              </div>
            ) : (
              <div className={styles.info}>
                {cart.map((product) => (
                  <div key={product.id}>
                    <motion.div
                      style={{
                        borderColor: content && content.productCardBorderColor,
                        backgroundColor:
                          content && content.productCardBackgroundColor
                      }}
                      className={styles.info_row}
                    >
                      <div>
                        <img
                          style={{
                            borderColor:
                              content && content.productImageBorderColor
                          }}
                          src={product.thumbnailImage}
                          alt={product.name}
                          className={styles.image}
                        />
                      </div>
                      <div>
                        <Link
                          className={styles.name}
                          to={`/shop/products/${product.id}`}
                        >
                          <motion.div
                            whileHover={{
                              color: content && content.productNameActiveColor
                            }}
                            style={{
                              color: content && content.productNameColor
                            }}
                          >
                            {product.name}
                          </motion.div>
                        </Link>
                      </div>
                      <div>Qty: {product.quantity}</div>
                      <div
                        style={{ color: content && content.productPriceColor }}
                      >
                        $
                        {parseFloat(product.price) *
                          parseFloat(product.quantity)}
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            )}
            <div className={styles.checkout}>
              <table className="table">
                <tbody>
                  <tr>
                    <td>Subtotal:</td>
                    <td>
                      KES{' '}
                      {cart.reduce(
                        (a, c) =>
                          a + parseFloat(c.price) * parseFloat(c.quantity),
                        0
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Delivery</td>
                    <td>KES 100</td>
                  </tr>
                  <tr>
                    <td>Order Total</td>
                    <td>
                      KES{' '}
                      {cart.reduce(
                        (a, c) =>
                          a + parseFloat(c.price) * parseFloat(c.quantity),
                        0
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                onClick={() => onPesaPalPaymentHandler()}
                disabled={cart.length === 0}
                className={`button border_bottom mb-2 ${styles.checkout_button}`}
              >
                Pay With PesaPal
              </button>
            </div>
          </div>
        </motion.div>
      )}
      <MediaQuery minWidth={800}>
        <Footer></Footer>
      </MediaQuery>
      <MediaQuery maxWidth={800}>
        <BottomNav></BottomNav>
      </MediaQuery>
    </div>
  );
}
