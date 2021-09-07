import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  resetUploadImage,
  uploadImage
} from '../../slices/uploadSlices/imageUploadSlice';
import LoadingBox from '../LoadingBox/LoadingBox';
import MessageBox from '../MessageBox/MessageBox';

export default function ImageUploader(props) {
  const { image, setImage } = props;

  const imageUploadSlice = useSelector((state) => state.imageUploadSlice);
  const { status, file, error } = imageUploadSlice;

  const dispatch = useDispatch();

  const uploadHandler = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    console.log(formData.entries);

    dispatch(uploadImage(formData));
  };

  useEffect(() => {
    return () => {
      dispatch(resetUploadImage());
    };
  }, [dispatch]);

  useEffect(() => {
    if (image) {
      setImage(file);
    }
  }, [file, image, setImage]);

  return (
    <div>
      {status === 'loading' ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <input type="file" required onChange={uploadHandler}></input>
      )}
    </div>
  );
}
