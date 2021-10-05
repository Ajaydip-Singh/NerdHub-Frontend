import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './ProductImage.module.css';

export default function ProductImage(props) {
  const { imageThumbnail, images, name, borderColor } = props;

  const [fullscreen, setFullscreen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(imageThumbnail);

  return (
    <div>
      <div
        className={fullscreen ? styles.fullscreen : ''}
        onClick={() => {
          fullscreen ? setFullscreen(false) : setFullscreen(true);
        }}
      >
        <motion.img
          transition={{ duration: 0.5 }}
          whileHover={{
            scale: 1.01
          }}
          className={`${styles.product_image} ${
            fullscreen ? styles.image_fullscreen : styles.image_normal
          }`}
          style={{
            border: borderColor
              ? `2px solid ${borderColor}`
              : '2px solid #50d450'
          }}
          src={selectedImage}
          alt={name}
        />
      </div>
      {images && (
        <div className={styles.small_images_container}>
          <motion.button
            className={styles.image_button}
            style={{
              border: borderColor
                ? `2px solid ${borderColor}`
                : '2px solid #50d450'
            }}
            whileHover={{
              scale: 1.04,
              border: borderColor
                ? `2px solid ${borderColor}`
                : `2px solid #50d450`
            }}
          >
            <img
              onClick={() => setSelectedImage(imageThumbnail)}
              className={styles.small_image}
              src={imageThumbnail}
              alt="Product"
            />
          </motion.button>
          {images &&
            images.length !== 0 &&
            images.map((image, index) => (
              <motion.button
                className={styles.image_button}
                style={{
                  border: borderColor
                    ? `2px solid ${borderColor}`
                    : '2px solid #50d450'
                }}
                whileHover={{
                  scale: 1.04,
                  border: borderColor
                    ? `2px solid ${borderColor}`
                    : '2px solid #50d450'
                }}
              >
                <img
                  onClick={() => setSelectedImage(images[index])}
                  className={styles.small_image}
                  src={image}
                  alt="Product"
                />
              </motion.button>
            ))}
        </div>
      )}
    </div>
  );
}
