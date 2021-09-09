import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { uploadImageCreator } from '../../slices/uploadSlices/imageUploadSlice';
import LoadingBox from '../LoadingBox/LoadingBox';
import MessageBox from '../MessageBox/MessageBox';

export default function ImageUploader(props) {
  const { name, setImage } = props;

  const imageUploadSlice = useSelector((state) => state[name]);
  const { status, file, error } = imageUploadSlice;

  const dispatch = useDispatch();

  const uploadHandler = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    const uploadImage = uploadImageCreator(`${name}/uploadImage`);

    dispatch(uploadImage(formData));
  };

  useEffect(() => {
    return () => {
      // dispatch(resetUploadImage());
    };
  }, [dispatch]);

  useEffect(() => {
    if (file) {
      setImage(file.image.url);
    }
  }, [file, setImage]);

  return (
    <div>
      {status === 'loading' ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <input type="file" onChange={uploadHandler}></input>
      )}
    </div>
  );
}
