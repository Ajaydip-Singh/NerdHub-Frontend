import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';
import BottomNav from '../../../components/BottomNav/BottomNav';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Header/Header';
import Socials from '../../../components/Socials/Socials';
import { getContactPageContent } from '../../../slices/pageSlices/contactPageContentSlices/contactPageContentGetSlice';
import styles from './ContactScreen.module.css';
import parse from 'html-react-parser';
import { motion } from 'framer-motion';
import { pageVariant } from '../../../animate';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';

export default function ContactScreen() {
  const contactPageContentGetSlice = useSelector(
    (state) => state.contactPageContentGetSlice
  );
  const { status, content, error } = contactPageContentGetSlice;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getContactPageContent({}));
  }, [dispatch]);

  return (
    <div>
      <Header contact></Header>
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
        <motion.div variants={pageVariant} initial="initial" animate="final">
          <section
            className={styles.hero_section}
            style={{
              backgroundImage: `url(${
                content && content.contactHeroBackgroundImage
              })`
            }}
          >
            {content && (
              <div className="ql-editor">
                {parse(content.contactMainHeading)}
              </div>
            )}
          </section>
          <div
            className={styles.main_section}
            style={{
              backgroundImage: `url(${
                content && content.contactMainBackgroundImage
              })`
            }}
          >
            <div className={`row container ${styles.wrapper}`}>
              <div className="col-md">
                {content && (
                  <div className="ql-editor">{parse(content.formText)}</div>
                )}
                <Link className="link border_bottom" to="/about">
                  Learn more about us
                </Link>
                <div className={styles.socials}>
                  <Socials></Socials>
                </div>
              </div>
              <div className="col-md">
                <form action="" className={styles.form}>
                  <div>
                    <textarea
                      className={styles.textarea}
                      placeholder="Write Message"
                      name=""
                      id=""
                      rows="5"
                    ></textarea>
                  </div>
                  <div
                    className={`row_f space-between ${styles.inputs_wrapper}`}
                  >
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="Your Name"
                    />
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="Your Email"
                    />
                  </div>
                  <div>
                    <button className={styles.submit_button} type="submit">
                      Submit message
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className={`row align-center container ${styles.wrapper}`}>
              <div className="col-md">
                <iframe
                  title="location"
                  className={styles.map}
                  style={{
                    border:
                      content && `2px solid ${content.locationFrameBorderColor}`
                  }}
                  src={content && content.locationFrame}
                  allowfullscreen=""
                  loading="lazy"
                ></iframe>
              </div>

              <div className="col-md">
                {content && (
                  <div className="ql-editor">{parse(content.locationText)}</div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
      <section></section>
      <MediaQuery minWidth={800}>
        <Footer></Footer>
      </MediaQuery>
      <MediaQuery maxWidth={800}>
        <BottomNav></BottomNav>
      </MediaQuery>
    </div>
  );
}
