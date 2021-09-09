import { Link } from 'react-router-dom';
import Rating from './Rating';
import styles from './Product.module.css';

export default function Product(props) {
  const { product } = props;

  return (
    <div key={product._id} className={styles.card}>
      <Link to={`/shop/product/${product._id}`}>
        <img className={styles.medium} src={product.image} alt={product.name} />
      </Link>
      <div className={styles.card_body}>
        <Link to={`/shop/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <div className={styles.price}>${product.price}</div>
      </div>
    </div>
  );
}
