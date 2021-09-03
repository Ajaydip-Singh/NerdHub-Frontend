import MediaQuery from 'react-responsive';
import BottomNav from '../../../components/BottomNav/BottomNav';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Header/Header';
import styles from './MembershipScreen.module.css';
import { Player } from 'video-react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAboutPageContent } from '../../../slices/pageSlices/aboutPageContentSlices/aboutPageContentGetSlice';
import parse from 'html-react-parser';
import { motion } from 'framer-motion';
import { pageVariant, sectionVariant, videoVariant } from '../../../animate';

export default function MembershipScreen() {
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
      <Header membership></Header>

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
            {content ? (
              <div className="ql-editor">{parse(content.aboutMainHeading)}</div>
            ) : (
              <h1 className={styles.heading}>Membership</h1>
            )}
          </motion.div>
        </motion.section>
        <motion.div
          variants={sectionVariant}
          whileHover="hover"
          transition={{ duration: 1.2 }}
        >
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
                <motion.div whileHover={{ scale: 0.9 }}>
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
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Magni consectetur, dolor illum aperiam repellat
                        numquam iure, laudantium sunt tenetur aut quasi eum vel
                        maxime deleniti corporis quod nemo totam optio.
                      </p>
                    )}
                  </div>
                </motion.div>
                <div className={styles.image_container}>
                  <motion.img
                    whileHover={{ scale: 0.8 }}
                    drag
                    dragConstraints={{
                      top: 10,
                      left: 10,
                      right: 10,
                      bottom: 10
                    }}
                    dragElastic={1}
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
