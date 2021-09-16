import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import {
  addToCart,
  removeFromCart
} from '../../../slices/shopSlices/cartSlice';
import styles from './CartScreen.module.css';

export default function CartScreen(props) {
  const cartSlice = useSelector((state) => state.cartSlice);
  const { cart } = cartSlice;
  const dispatch = useDispatch();

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const onCheckoutHandler = () => {
    // props.history.push('/signin?redirect=shipping');
  };

  return (
    <div className={styles.screen}>
      <Header shop></Header>
      <div className={styles.hero_section}>
        <h1>Shopping Cart</h1>
      </div>
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
                <div className={styles.info_row}>
                  <div>
                    <img
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
                      {product.name}
                    </Link>
                  </div>
                  <div>
                    <select
                      value={product.quantity}
                      onChange={(e) =>
                        dispatch(
                          addToCart({
                            productId: product.id,
                            quantity: Number(e.target.value)
                          })
                        )
                      }
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>${product.price}</div>
                  <button
                    type="button"
                    className="button border_bottom"
                    onClick={() => removeFromCartHandler(product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className={styles.checkout}>
          <table className="table">
            <tbody>
              <tr>
                <td>Items:</td>
                <td>{cart.reduce((a, c) => a + c.quantity, 0)}</td>
              </tr>
              <tr>
                <td>Subtotal:</td>
                <td>
                  KES {cart.reduce((a, c) => a + c.price * c.quantity, 0)}
                </td>
              </tr>
            </tbody>
          </table>
          <button
            onClick={onCheckoutHandler}
            disabled={cart.length === 0}
            className={`button border_bottom ${styles.checkout_button}`}
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
