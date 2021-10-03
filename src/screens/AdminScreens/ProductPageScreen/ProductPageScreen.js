import Header from '../../../components/Header/Header';
import styles from './ProductPageScreen.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../../../components/MessageBox/MessageBox';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import {
  getProductPageContent,
  resetGetProductPageContent
} from '../../../slices/pageSlices/productPageContentSlices/productPageContentGetSlice';
import {
  resetUpdateProductPageContent,
  updateProductPageContent
} from '../../../slices/pageSlices/productPageContentSlices/productPageContentUpdateSlice';
import ImageUploader from '../../../components/ImageUploader/ImageUploader';

export default function ProductPageScreen() {
  const [backgroundImage, setBackgroundImage] = useState('');

  const productPageContentGetSlice = useSelector(
    (state) => state.productPageContentGetSlice
  );
  const { status, content, error } = productPageContentGetSlice;

  const productPageContentUpdateSlice = useSelector(
    (state) => state.productPageContentUpdateSlice
  );
  const {
    status: statusUpdate,
    content: contentUpdate,
    error: errorUpdate
  } = productPageContentUpdateSlice;

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetUpdateProductPageContent());
    };
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetGetProductPageContent());
    };
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProductPageContent({
        backgroundImage
      })
    );
  };

  useEffect(() => {
    if (!content) {
      dispatch(getProductPageContent({}));
    } else {
      setBackgroundImage(content.backgroundImage);
    }
  }, [dispatch, content, contentUpdate]);

  return (
    <div className={styles.main_wrapper}>
      <Header admin></Header>
      <div className={styles.hero_section}>
        <h1 className={styles.heading}>Edit Product Page</h1>
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
                  tags={['product-page']}
                  name={'imageUploadSliceA'}
                  setImage={setBackgroundImage}
                ></ImageUploader>
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
