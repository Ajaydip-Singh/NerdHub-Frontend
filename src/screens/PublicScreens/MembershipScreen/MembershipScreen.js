import MediaQuery from 'react-responsive';
import BottomNav from '../../../components/BottomNav/BottomNav';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Header/Header';
import styles from './MembershipScreen.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import parse from 'html-react-parser';
import { motion } from 'framer-motion';
import { pageVariant, sectionVariant } from '../../../animate';
import { getMembershipPageContent } from '../../../slices/pageSlices/membershipPageContentSlices/membershipPageContentGetSlice';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';

export default function MembershipScreen() {
  const membershipPageContentGetSlice = useSelector(
    (state) => state.membershipPageContentGetSlice
  );
  const { status, content, error } = membershipPageContentGetSlice;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMembershipPageContent({}));
  }, [dispatch]);

  return (
    <div className={styles.screen}>
      <Header membership></Header>
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
          variants={pageVariant}
          initial="initial"
          animate="final"
          className={styles.main_wrapper}
          style={{
            backgroundImage: `url(${
              content && content.membershipBackgroundImage
            })`
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
              {content && (
                <div className="ql-editor">
                  {parse(content.membershipMainHeading)}
                </div>
              )}
            </motion.div>
          </motion.section>
          <div>
            <section>
              <div className={styles.wrapper}>
                <div className="ql-editor">
                  {content && parse(content.membershipMainContent)}
                </div>
              </div>
            </section>
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
