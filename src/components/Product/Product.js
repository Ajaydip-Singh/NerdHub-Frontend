import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating';
import styles from './Product.module.css';
import { motion } from 'framer-motion';
import parse from 'html-react-parser';
import { stripHtml } from '../../utils';

export default function Product(props) {
  const { product } = props;

  return (
    <motion.div
      key={product._id}
      className={styles.card}
      style={{
        border: `2px solid ${product.borderColor}`,
        backgroundColor: product.backgroundColor
      }}
      whileHover={{
        scale: 1.03,
        borderColor: product.borderHoverColor
      }}
    >
      <Link to={`/shop/product/${product._id}`}>
        <img
          className={styles.medium}
          src={product.image}
          alt={stripHtml(product.name)}
        />
      </Link>
      <div className={styles.card_body}>
        <div className="ql-editor">
          <p className={styles.product_name}>{parse(product.name)}</p>
        </div>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <div className="ql-editor">{parse(product.displayPrice)}</div>
      </div>
    </motion.div>
  );
}
