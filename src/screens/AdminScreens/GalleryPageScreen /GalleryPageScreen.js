import Header from '../../../components/Header/Header';
import styles from './GalleryPageScreen.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../../../components/MessageBox/MessageBox';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import TextEditor from '../../../components/TextEditor/TextEditor';
import { BlockPicker } from 'react-color';
import {
  getGalleryPageContent,
  resetGetGalleryPageContent
} from '../../../slices/pageSlices/galleryPageContentSlices/galleryPageContentGetSlice';
import {
  resetUpdateGalleryPageContent,
  updateGalleryPageContent
} from '../../../slices/pageSlices/galleryPageContentSlices/galleryPageContentUpdateSlice';
import ImageUploader from '../../../components/ImageUploader/ImageUploader';

export default function GalleryPageScreen() {
  const [galleryMainHeading, setGalleryMainHeading] = useState('');
  const [galleryBackgroundImage, setGalleryBackgroundImage] = useState('');
  const [itemBorderColor, setItemBorderColor] = useState('');

  const galleryPageContentGetSlice = useSelector(
    (state) => state.galleryPageContentGetSlice
  );
  const { status, content, error } = galleryPageContentGetSlice;

  const galleryPageContentUpdateSlice = useSelector(
    (state) => state.galleryPageContentUpdateSlice
  );
  const {
    status: statusUpdate,
    content: contentUpdate,
    error: errorUpdate
  } = galleryPageContentUpdateSlice;

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetUpdateGalleryPageContent());
    };
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetGetGalleryPageContent());
    };
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateGalleryPageContent({
        galleryMainHeading,
        galleryBackgroundImage,
        itemBorderColor
      })
    );
  };

  useEffect(() => {
    if (!content) {
      dispatch(getGalleryPageContent({}));
    } else {
      setGalleryMainHeading(content.galleryMainHeading);
      setGalleryBackgroundImage(content.galleryBackgroundImage);
      setItemBorderColor(content.itemBorderColor);
    }
  }, [dispatch, content, contentUpdate]);

  return (
    <div className={styles.main_wrapper}>
      <Header admin></Header>
      <div className={styles.hero_section}>
        <h1 className={styles.heading}>Edit Gallery Page</h1>
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
                <h3>Main Heading</h3>
                <TextEditor
                  placeholder="Enter video heading"
                  value={galleryMainHeading}
                  onChange={setGalleryMainHeading}
                ></TextEditor>
              </div>
              <div className="editor_wrapper">
                <h3>Page Background Image</h3>
                <p>
                  Current Image:{' '}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={galleryBackgroundImage}
                  >
                    {galleryBackgroundImage}
                  </a>
                </p>
                <ImageUploader
                  tags={['gallery-page']}
                  name={'imageUploadSliceA'}
                  setImage={setGalleryBackgroundImage}
                ></ImageUploader>
              </div>
              <div className="editor_wrapper">
                <h3>Gallery Item Border Color</h3>
                <BlockPicker
                  color={itemBorderColor}
                  onChangeComplete={(e) => setItemBorderColor(e.hex)}
                />
              </div>

              <div className="editor_wrapper">
                {errorUpdate && (
                  <MessageBox variant="danger">
                    Failed. Gallery page not updated.
                  </MessageBox>
                )}
                {contentUpdate && (
                  <MessageBox variant="success">
                    Gallery page Updated
                  </MessageBox>
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