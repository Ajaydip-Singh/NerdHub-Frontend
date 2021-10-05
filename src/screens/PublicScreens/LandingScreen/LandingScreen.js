import React, { useState } from 'react';
import styles from './LandingScreen.module.css';
import ReactPlayer from 'react-player';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

export default function LandingScreen(props) {
  const [playing, setPlaying] = useState(false);

  const isSmallerScreen = useMediaQuery({ query: '(max-width: 474px)' });
  const onEnded = () => {
    props.history.push('/home');
  };

  return (
    <div className={styles.wrapper}>
      {!playing ? (
        <motion.img
          whileHover={{ scale: 1.2 }}
          onClick={() => setPlaying(true)}
          drag
          dragElastic={2}
          dragConstraints={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
          className={styles.logo}
          src="/logo512.png"
          alt="Nerdhub Logo"
        />
      ) : (
        <div className={styles.video}>
          <ReactPlayer
            url={
              !isSmallerScreen
                ? 'https://res.cloudinary.com/nerdhub-house-kenya/video/upload/v1633356272/NH1_oz4v8m.mp4'
                : 'https://res.cloudinary.com/nerdhub-house-kenya/video/upload/v1633360658/NH1_oz4v8m-c_fill_h_900_w_475_zxmy3e.mp4'
            }
            height="100vh"
            width="100vw"
            playing={playing}
            onEnded={onEnded}
          />
        </div>
      )}
    </div>
  );
}
