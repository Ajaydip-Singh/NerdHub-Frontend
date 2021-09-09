import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating';
import styles from './Product.module.css';
import { motion } from 'framer-motion';

export default function Product(props) {
  const { product } = props;

  return (
    <motion.div
      key={product._id}
      className={styles.card}
      whileHover={{
        scale: 1.02
      }}
    >
      <Link to={`/shop/product/${product._id}`}>
        <img className={styles.medium} src={product.image} alt={product.name} />
      </Link>
      <div className={styles.card_body}>
        <h2 className={styles.product_name}>{product.name}</h2>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <div className={styles.price}>${product.price}</div>
      </div>
    </motion.div>
  );
}
