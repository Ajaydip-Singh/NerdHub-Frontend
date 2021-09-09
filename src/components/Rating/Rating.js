import styles from './Rating.module.css';

export default function Rating(props) {
  const { rating, numReviews, caption } = props;
  return (
    <div className={styles.rating}>
      <span>
        <i
          className={
            rating >= 1
              ? 'fa fa-star'
              : rating >= 0.5
              ? 'fa fa-star-half-alt'
              : 'far fa-star outline'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 2
              ? 'fa fa-star'
              : rating >= 1.5
              ? 'fa fa-star-half-alt'
              : 'far fa-star outline'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 3
              ? 'fa fa-star'
              : rating >= 2.5
              ? 'fa fa-star-half-alt'
              : 'far fa-star outline'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 4
              ? 'fa fa-star'
              : rating >= 3.5
              ? 'fa fa-star-half-alt'
              : 'far fa-star outline'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 5
              ? 'fa fa-star'
              : rating >= 4.5
              ? 'fa fa-star-half-alt'
              : 'far fa-star outline'
          }
        ></i>
      </span>
      {caption ? (
        <span>{caption}</span>
      ) : (
        <span>{`${numReviews} reviews`}</span>
      )}
    </div>
  );
}
