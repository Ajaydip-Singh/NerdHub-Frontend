import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../../components/Header/Header';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import {
  createProduct,
  resetCreateProduct
} from '../../../slices/productSlices/productCreateSlice';
import {
  deleteProduct,
  resetDeleteProduct
} from '../../../slices/productSlices/productDeleteSlice';
import { getProducts } from '../../../slices/productSlices/productsGetSlice';
import { formatDate, stripHtml } from '../../../utils';
import styles from './ProductsListScreen.module.css';

export default function ProductsListScreen(props) {
  const productsGetSlice = useSelector((state) => state.productsGetSlice);
  const { status, products, error } = productsGetSlice;

  const productDeleteSlice = useSelector((state) => state.productDeleteSlice);
  const {
    status: statusDelete,
    product: productDelete,
    error: errorDelete
  } = productDeleteSlice;

  const productCreateSlice = useSelector((state) => state.productCreateSlice);
  const {
    status: statusCreate,
    product: productCreate,
    error: errorCreate
  } = productCreateSlice;

  const createHandler = () => {
    dispatch(createProduct({}));
  };
  const dispatch = useDispatch();
  const deleteHandler = (product) => {
    if (window.confirm(`Are you sure you want to delete ${product.name}`)) {
      dispatch(deleteProduct(product._id));
    }
  };

  // Cleanup products page on unmount
  useEffect(() => {
    return () => {
      if (productDelete) {
        dispatch(resetDeleteProduct());
      }
    };
  }, [dispatch, productDelete]);

  useEffect(() => {
    return () => {
      if (productCreate) {
        dispatch(resetCreateProduct());
      }
    };
  }, [dispatch, productCreate]);

  useEffect(() => {
    dispatch(getProducts({}));
  }, [dispatch, productDelete, productCreate]);

  return (
    <div>
      <Header admin events_page></Header>
      <div className={styles.hero_section}>
        <h1 className={styles.heading}>Products Page</h1>
      </div>
      <div className="table_wrapper">
        {productCreate && (
          <MessageBox variant="success">Product Created Succesfully</MessageBox>
        )}
        {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}

        {statusDelete === 'loading' && <LoadingBox></LoadingBox>}
        {productDelete && (
          <MessageBox variant="success">Product Deleted Succesfully</MessageBox>
        )}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        <button type="button" onClick={createHandler} className={styles.button}>
          {statusCreate === 'loading' ? (
            <LoadingBox></LoadingBox>
          ) : (
            'Create product'
          )}
        </button>
        {status === 'loading' ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <button
                      className="small"
                      type="button"
                      onClick={() =>
                        props.history.push(
                          `/products-admin/${product._id}/edit`
                        )
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="small"
                      type="button"
                      onClick={() => deleteHandler(product)}
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