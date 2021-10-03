import Header from '../../../components/Header/Header';
import styles from './OrderPageScreen.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../../../components/MessageBox/MessageBox';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import TextEditor from '../../../components/TextEditor/TextEditor';
import { BlockPicker } from 'react-color';
import {
  getOrderPageContent,
  resetGetOrderPageContent
} from '../../../slices/pageSlices/orderPageContentSlices/orderPageContentGetSlice';
import {
  resetUpdateOrderPageContent,
  updateOrderPageContent
} from '../../../slices/pageSlices/orderPageContentSlices/orderPageContentUpdateSlice';
import ImageUploader from '../../../components/ImageUploader/ImageUploader';

export default function OrderPageScreen() {
  const [orderMainHeading, setOrderMainHeading] = useState('');
  const [orderBackgroundImage, setOrderBackgroundImage] = useState('');
  const [shippingInfoColor, setShippingInfoColor] = useState('');
  const [productCardBorderColor, setProductCardBorderColor] = useState('');
  const [productCardBackgroundColor, setProductCardBackgroundColor] =
    useState('');
  const [productImageBorderColor, setProductImageBorderColor] = useState('');
  const [productNameColor, setProductNameColor] = useState('');
  const [productNameActiveColor, setProductNameActiveColor] = useState('');
  const [productPriceColor, setProductPriceColor] = useState('');

  const orderPageContentGetSlice = useSelector(
    (state) => state.orderPageContentGetSlice
  );
  const { status, content, error } = orderPageContentGetSlice;

  const orderPageContentUpdateSlice = useSelector(
    (state) => state.orderPageContentUpdateSlice
  );
  const {
    status: statusUpdate,
    content: contentUpdate,
    error: errorUpdate
  } = orderPageContentUpdateSlice;

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetUpdateOrderPageContent());
    };
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetGetOrderPageContent());
    };
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateOrderPageContent({
        orderMainHeading,
        orderBackgroundImage,
        shippingInfoColor,
        productCardBorderColor,
        productCardBackgroundColor,
        productImageBorderColor,
        productNameColor,
        productNameActiveColor,
        productPriceColor
      })
    );
  };

  useEffect(() => {
    if (!content) {
      dispatch(getOrderPageContent({}));
    } else {
      setOrderMainHeading(content.orderMainHeading);
      setOrderBackgroundImage(content.orderBackgroundImage);
      setShippingInfoColor(content.shippingInfoColor);
      setProductCardBorderColor(content.productCardBorderColor);
      setProductCardBackgroundColor(content.productCardBackgroundColor);
      setProductImageBorderColor(content.productImageBorderColor);
      setProductNameColor(content.productNameColor);
      setProductNameActiveColor(content.productNameActiveColor);
      setProductPriceColor(content.productPriceColor);
    }
  }, [dispatch, content, contentUpdate]);

  return (
    <div className={styles.main_wrapper}>
      <Header admin></Header>
      <div className={styles.hero_section}>
        <h1 className={styles.heading}>Edit Order Page</h1>
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
                  placeholder="Enter order heading"
                  value={orderMainHeading}
                  onChange={setOrderMainHeading}
                ></TextEditor>
              </div>
              <div className="editor_wrapper">
                <h3>Page Background Image</h3>
                <p>
                  Current Image:{' '}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={orderBackgroundImage}
                  >
                    {orderBackgroundImage}
                  </a>
                </p>
                <ImageUploader
                  tags={['order-page']}
                  name={'imageUploadSliceA'}
                  setImage={setOrderBackgroundImage}
                ></ImageUploader>
              </div>
              <div className="editor_wrapper">
                <h3>Shipping Info Color</h3>
                <BlockPicker
                  color={shippingInfoColor}
                  onChangeComplete={(e) => setShippingInfoColor(e.hex)}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Product Card Border Color</h3>
                <BlockPicker
                  color={productCardBorderColor}
                  onChangeComplete={(e) => setProductCardBorderColor(e.hex)}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Product Card Background Color</h3>
                <BlockPicker
                  color={productCardBackgroundColor}
                  onChangeComplete={(e) => setProductCardBackgroundColor(e.hex)}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Product Image Background Color</h3>
                <BlockPicker
                  color={productImageBorderColor}
                  onChangeComplete={(e) => setProductImageBorderColor(e.hex)}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Product Name Color</h3>
                <BlockPicker
                  color={productNameColor}
                  onChangeComplete={(e) => setProductNameColor(e.hex)}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Product Name Active Color</h3>
                <BlockPicker
                  color={productNameActiveColor}
                  onChangeComplete={(e) => setProductNameActiveColor(e.hex)}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Product Price Color</h3>
                <BlockPicker
                  color={productPriceColor}
                  onChangeComplete={(e) => setProductPriceColor(e.hex)}
                />
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
