import Header from '../../../components/Header/Header';
import styles from './ShopPageScreen.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../../../components/MessageBox/MessageBox';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import TextEditor from '../../../components/TextEditor/TextEditor';
import {
  getShopPageContent,
  resetGetShopPageContent
} from '../../../slices/pageSlices/shopPageContentSlices/shopPageContentGetSlice';
import {
  resetUpdateShopPageContent,
  updateShopPageContent
} from '../../../slices/pageSlices/shopPageContentSlices/shopPageContentUpdateSlice';
import ImageUploader from '../../../components/ImageUploader/ImageUploader';

export default function ShopPageScreen() {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [comingSoon, setComingSoon] = useState('');
  const [comingSoonText, setComingSoonText] = useState('');

  const shopPageContentGetSlice = useSelector(
    (state) => state.shopPageContentGetSlice
  );
  const { status, content, error } = shopPageContentGetSlice;

  const shopPageContentUpdateSlice = useSelector(
    (state) => state.shopPageContentUpdateSlice
  );
  const {
    status: statusUpdate,
    content: contentUpdate,
    error: errorUpdate
  } = shopPageContentUpdateSlice;

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetUpdateShopPageContent());
    };
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetGetShopPageContent());
    };
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateShopPageContent({
        backgroundImage,
        comingSoon,
        comingSoonText
      })
    );
  };

  useEffect(() => {
    if (!content) {
      dispatch(getShopPageContent({}));
    } else {
      setBackgroundImage(content.backgroundImage);
      setComingSoon(content.comingSoon);
      setComingSoonText(content.comingSoonText);
    }
  }, [dispatch, content, contentUpdate]);

  return (
    <div className={styles.main_wrapper}>
      <Header admin></Header>
      <div className={styles.hero_section}>
        <h1 className={styles.heading}>Edit Shop Page</h1>
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
                <h3>Page Background Image</h3>
                <p>
                  Current Image:{' '}
                  <a target="_blank" rel="noreferrer" href={backgroundImage}>
                    {backgroundImage}
                  </a>
                </p>
                <ImageUploader
                  tags={['shop-page']}
                  name={'imageUploadSliceA'}
                  setImage={setBackgroundImage}
                ></ImageUploader>
              </div>
              <div className="editor_wrapper">
                <h3>Coming Soon</h3>
                <select
                  value={comingSoon}
                  onChange={(e) => setComingSoon(e.target.value)}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <div className="editor_wrapper">
                <h3>Coming Soon Text</h3>
                <TextEditor
                  value={comingSoonText}
                  onChange={setComingSoonText}
                  placeholder="Enter coming soon text"
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
