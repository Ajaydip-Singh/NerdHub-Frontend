import MediaQuery from 'react-responsive';
import { motion } from 'framer-motion';
import BottomNav from '../../../components/BottomNav/BottomNav';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Header/Header';
import styles from './GalleryScreen.module.css';
import { pageVariant, sectionVariant } from '../../../animate';
import { useEffect } from 'react';
import ProductImage from '../../../components/ProductImage/ProductImage';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getGallery } from '../../../slices/gallerySlices/galleryGetSlice';
import { getGalleryTags } from '../../../slices/gallerySlices/galleryTagsGetSlice';
import { useParams } from 'react-router';
import Pages from '../../../components/Pages/Pages';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';

export default function GalleryScreen(props) {
  const { pageNumber = '1', tag = 'all' } = useParams();

  const galleryGetSlice = useSelector((state) => state.galleryGetSlice);
  const { status, gallery, pages, error } = galleryGetSlice;

  const galleryTagsGetSlice = useSelector((state) => state.galleryTagsGetSlice);
  const { tags } = galleryTagsGetSlice;

  const submitHandler = () => {
    '';
  };

  const dispatch = useDispatch();

  const getFilterUrl = (filter) => {
    let filterPageNumber;
    if (filter.tag && filter.tag !== tag) {
      filterPageNumber = 1;
    } else {
      filterPageNumber = filter.pageNumber || pageNumber;
    }

    const filterTag = filter.tag || tag;

    return `/gallery/${filterTag}/${filterPageNumber}`;
  };

  useEffect(() => {
    dispatch(getGalleryTags({}));
    dispatch(
      getGallery({
        pageNumber,
        tag: tag === 'all' ? '' : tag
      })
    );
  }, [dispatch, tag, pageNumber]);

  return (
    <div>
      <Header gallery></Header>
      <motion.div variants={pageVariant} initial="initial" animate="final">
        <div
          className={styles.main_wrapper}
          style={{
            backgroundImage: 'url(/images/destruction_long.jpeg)',
            width: '100%'
          }}
        >
          <motion.section
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
              <h1>Gallery</h1>
            </motion.div>
          </motion.section>
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 1 }}
            className={styles.filterbox}
          >
            <div className={styles.wrapper}>
              <form className={styles.search} onSubmit={submitHandler}>
                <div className={styles.filter_button_wrapper}>
                  <select
                    className={`${styles.search_button} ${styles.filter_button}`}
                    value={tag}
                    onChange={(e) =>
                      props.history.push(getFilterUrl({ tag: e.target.value }))
                    }
                  >
                    <option value="all">All Categories</option>
                    {tags &&
                      tags.map((tag) => <option value={tag}>{tag}</option>)}
                  </select>
                </div>
              </form>
            </div>
          </motion.div>
          <div className={styles.gallery_wrapper}>
            {status === 'loading' ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <motion.div
                variants={pageVariant}
                initial="initial"
                animate="final"
                className={styles.gallery}
              >
                {gallery &&
                  gallery.map((image) => (
                    <ProductImage imageThumbnail={image.url}></ProductImage>
                  ))}
              </motion.div>
            )}
          </div>

          <Pages
            filterUrl={getFilterUrl}
            currentPage={pageNumber}
            pages={pages}
          ></Pages>
        </div>
        <MediaQuery minWidth={800}>
          <Footer></Footer>
        </MediaQuery>
        <MediaQuery maxWidth={800}>
          <BottomNav gallery></BottomNav>
        </MediaQuery>
      </motion.div>
    </div>
  );
}
