import Header from '../../../components/Header/Header';
import styles from './HomePageScreen.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../../../components/MessageBox/MessageBox';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import TextEditor from '../../../components/TextEditor/TextEditor';
import { BlockPicker } from 'react-color';
import {
  getHomePageContent,
  resetGetHomePageContent
} from '../../../slices/pageSlices/homePageContentSlices/homePageContentGetSlice';
import {
  resetUpdateHomePageContent,
  updateHomePageContent
} from '../../../slices/pageSlices/homePageContentSlices/homePageContentUpdateSlice';

export default function HomePageScreen() {
  const [videoHeading, setVideoHeading] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoBorderColor, setVideoBorderColor] = useState('');
  const [videoBoxShadowColor, setVideoBoxShadowColor] = useState('');
  const [contactBackgroundColor, setContactBackgroundColor] = useState('');
  const [contactText, setContactText] = useState('');

  const homePageContentGetSlice = useSelector(
    (state) => state.homePageContentGetSlice
  );
  const { status, content, error } = homePageContentGetSlice;

  const homePageContentUpdateSlice = useSelector(
    (state) => state.homePageContentUpdateSlice
  );
  const {
    status: statusUpdate,
    content: contentUpdate,
    error: errorUpdate
  } = homePageContentUpdateSlice;

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetUpdateHomePageContent());
    };
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetGetHomePageContent());
    };
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateHomePageContent({
        videoHeading,
        videoUrl,
        videoBorderColor,
        videoBoxShadowColor,
        contactBackgroundColor,
        contactText
      })
    );
  };

  useEffect(() => {
    if (!content) {
      dispatch(getHomePageContent({}));
    } else {
      setVideoHeading(content.videoHeading);
      setVideoUrl(content.videoUrl);
      setVideoBorderColor(content.videoBorderColor);
      setVideoBoxShadowColor(content.videoBoxShadowColor);
      setContactBackgroundColor(content.contactBackgroundColor);
      setContactText(content.contactText);
    }
  }, [dispatch, content, contentUpdate]);

  return (
    <div className={styles.main_wrapper}>
      <Header admin></Header>
      <div className={styles.hero_section}>
        <h1 className={styles.heading}>Edit Home Page</h1>
      </div>
      <div className={styles.wrapper}>
        {status === 'loading' ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <form onSubmit={submitHandler}>
            <div className={styles.editor_wrapper}>
              <div className="editor_wrapper">
                <h3>Video Heading</h3>
                <TextEditor
                  placeholder="Enter video heading"
                  value={videoHeading}
                  onChange={setVideoHeading}
                ></TextEditor>
              </div>
              <div className="editor_wrapper">
                <h3>Video Url</h3>
                <input
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="Enter video url"
                ></input>
              </div>
              <div className="editor_wrapper">
                <h3>Video Border Color</h3>
                <BlockPicker
                  color={videoBorderColor}
                  onChangeComplete={(e) => setVideoBorderColor(e.hex)}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Video Box Shadow Color</h3>
                <BlockPicker
                  color={videoBoxShadowColor}
                  onChangeComplete={(e) => setVideoBoxShadowColor(e.hex)}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Contact Background Color</h3>
                <BlockPicker
                  color={contactBackgroundColor}
                  onChangeComplete={(e) => setContactBackgroundColor(e.hex)}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Contact Text</h3>
                <TextEditor
                  placeholder="Enter contact text"
                  value={contactText}
                  onChange={setContactText}
                ></TextEditor>
              </div>

              <div className="editor_wrapper">
                {errorUpdate && (
                  <MessageBox variant="danger">
                    Failed. Event not updated.
                  </MessageBox>
                )}
                {contentUpdate && (
                  <MessageBox variant="success">Event Updated</MessageBox>
                )}
                <button className={styles.button} type="submit">
                  {statusUpdate === 'loading' ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    `Update`
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}