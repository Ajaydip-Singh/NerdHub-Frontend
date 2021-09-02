import MediaQuery from 'react-responsive';
import BottomNav from '../../../components/BottomNav/BottomNav';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Header/Header';
import styles from './AboutScreen.module.css';
import { Player } from 'video-react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAboutPageContent } from '../../../slices/pageSlices/aboutPageContentSlices/aboutPageContentGetSlice';
import parse from 'html-react-parser';
import { motion } from 'framer-motion';
import { pageVariant, videoVariant } from '../../../animate';

export default function AboutScreen() {
  const aboutPageContentGetSlice = useSelector(
    (state) => state.aboutPageContentGetSlice
  );
  const { content } = aboutPageContentGetSlice;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAboutPageContent({}));
  }, [dispatch]);

  return (
    <div className={styles.screen}>
      <Header about></Header>

      <motion.div
        variants={pageVariant}
        initial="initial"
        animate="final"
        className={styles.main_wrapper}
        style={{
          backgroundImage: 'url(images/fighters.jpeg)'
        }}
      >
        <motion.section
          className={styles.hero_section}
          initial={{ opacity: 0, x: '-100vw' }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
        >
          <div>
            {content ? (
              <div className="ql-editor">{parse(content.aboutMainHeading)}</div>
            ) : (
              <h1 className={styles.heading}>About</h1>
            )}
          </div>
        </motion.section>
        <section className={styles.video_section}>
          <div className={styles.video_container}>
            <motion.div
              className={styles.video}
              variants={videoVariant}
              whileHover="hover"
              transition="transition"
              style={{
                border: content
                  ? `2px solid ${content.videoBorderColor}`
                  : `2px solid #000`,
                boxShadow: content
                  ? `6px 6px 6px ${content.videoBoxShadowColor}`
                  : `6px 6px 6px #000;`
              }}
            >
              <Player
                poster={
                  content ? content.videoThumbnail : `/images/knife_dark.jpeg`
                }
                src={
                  content
                    ? content.videoUrl
                    : `https://media.w3.org/2010/05/sintel/trailer_hd.mp4`
                }
              ></Player>
            </motion.div>
          </div>
        </section>
        <section>
          <div
            className={`row container align-center space-evenly ${styles.wrapper}`}
          >
            <div className={styles.info_wrapper}>
              <div>
                {content ? (
                  <div className="ql-editor">
                    {parse(content.sectionOneHeading)}
                  </div>
                ) : (
                  <h1>What we do</h1>
                )}
                {content ? (
                  <div className="ql-editor">
                    {parse(content.sectionOneText)}
                  </div>
                ) : (
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Magni consectetur, dolor illum aperiam repellat numquam
                    iure, laudantium sunt tenetur aut quasi eum vel maxime
                    deleniti corporis quod nemo totam optio.
                  </p>
                )}
              </div>
              <div className={styles.image_container}>
                <img
                  src="/logo512.png"
                  className={styles.logo}
                  alt="Nerdhub Logo"
                />
              </div>
            </div>
            <div className={styles.info_wrapper}>
              <div className={styles.image_container}>
                <img
                  src="/images/gaming_room.jpeg"
                  className={styles.image}
                  alt="Nerdhub Logo"
                />
              </div>
              <div>
                {content ? (
                  <div className="ql-editor">
                    {parse(content.sectionTwoHeading)}
                  </div>
                ) : (
                  <h1>Our Mission</h1>
                )}
                {content ? (
                  <div className="ql-editor">
                    {parse(content.sectionTwoText)}
                  </div>
                ) : (
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Magni consectetur, dolor illum aperiam repellat numquam
                    iure, laudantium sunt tenetur aut quasi eum vel maxime
                    deleniti corporis quod nemo totam optio.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </motion.div>
      <MediaQuery minWidth={800}>
        <Footer></Footer>
      </MediaQuery>
      <MediaQuery maxWidth={800}>
        <BottomNav></BottomNav>
      </MediaQuery>
    </div>
  );
}
