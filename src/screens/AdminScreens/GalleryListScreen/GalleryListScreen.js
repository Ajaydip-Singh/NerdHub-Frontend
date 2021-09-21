import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../../components/Header/Header';
import ImageUploader from '../../../components/ImageUploader/ImageUploader';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import { getGallery } from '../../../slices/gallerySlices/galleryGetSlice';
// import {
// deleteGallery,
// } from '../../../slices/gallerySlices/galleryImageDeleteSlice';
import styles from './GalleryListScreen.module.css';

export default function GalleryListScreen(props) {
  const [uploadImages, setUploadImages] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const galleryGetSlice = useSelector((state) => state.galleryGetSlice);
  const { status, gallery, error } = galleryGetSlice;

  // const galleryImageDeleteSlice = useSelector(
  //   (state) => state.galleryImageDeleteSlice
  // );
  // const {
  //   status: statusDelete,
  //   gallery: galleryDelete,
  //   error: errorDelete
  // } = galleryImageDeleteSlice;

  const createHandler = () => {
    // dispatch(createGallery({}));
  };
  const dispatch = useDispatch();
  const deleteHandler = (gallery) => {
    if (window.confirm(`Are you sure you want to delete ${gallery.name}`)) {
      // dispatch(deleteGallery(gallery._id));
    }
  };

  // // Cleanup gallery page on unmount
  // useEffect(() => {
  //   return () => {
  //     if (galleryDelete) {
  //       dispatch(resetDeleteGallery());
  //     }
  //   };
  // }, [dispatch, galleryDelete]);
  useEffect(() => {
    dispatch(getGallery({}));
  }, [dispatch]);

  return (
    <div>
      <Header admin events_page></Header>
      <div className={styles.hero_section}>
        <h1 className={styles.heading}>Gallery Images List</h1>
      </div>
      <div className="table_wrapper">
        {/* {statusDelete === 'loading' && <LoadingBox></LoadingBox>}
        {galleryDelete && (
          <MessageBox variant="success">Gallery Deleted Succesfully</MessageBox>
        )}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>} */}
        <div className={styles.upload_images}>
          <h5>Upload Images</h5>
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            className={styles.input}
            type="text"
            placeholder="Enter tag name to upload images"
          />
          <ImageUploader
            tags={[tagInput]}
            gallery={true}
            name={'multipleImagesUploadSlice'}
            setImage={setUploadImages}
            multiple={true}
            disabled={tagInput ? false : true}
          ></ImageUploader>
          {uploadImages.length !== 0 && (
            <MessageBox variant="success">Images Uploaded</MessageBox>
          )}
        </div>

        {status === 'loading' ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Url</th>
                <th>PublicId</th>
                <th>Tags</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {gallery.map((gallery) => (
                <tr key={gallery._id}>
                  <td>{gallery.url}</td>
                  <td>{gallery.publicId}</td>
                  <td>{gallery.tags}</td>
                  <td>
                    <button
                      className="small"
                      type="button"
                      onClick={() => deleteHandler(gallery)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
