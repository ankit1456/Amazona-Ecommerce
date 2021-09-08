import Ratings from "./../components/Ratings";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "./../components/LoadingBox";
import MessageBox from "./../components/MessageBox";
import { useEffect, useState } from "react";
import { detailsProduct } from "./../redux/actions/productActions";
import { addToCart } from "./../redux/actions/cartActions";

const ProductScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [qty, setqty] = useState(1);
  const productDetails = useSelector((state) => state.productDetailsReducer);
  const { product, error, loading } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    if (id) {
      dispatch(addToCart(id, qty * 1));
    }
  };
  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <div>
          <Link to='/'>&larr; Back to home</Link>
          <div className='row top'>
            <div className='col-2'>
              <img className='large' src={product.image} alt={product.name} />
            </div>
            <div className='col-1'>
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <Ratings
                    rating={product.rating}
                    numReviews={product.numReviews}
                  />
                </li>
                <li>Price : ${product.price}</li>
                <li>
                  <p>{product.description}</p>{" "}
                </li>
              </ul>
            </div>
            <div className='col-1'>
              <div className='card card-body'>
                <ul>
                  <li>
                    <div className='row'>
                      <div>Price</div>
                      <div className='price'>${product.price}</div>
                    </div>
                  </li>

                  <li>
                    <div className='row'>
                      <div>Status</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className='success'>In stock</span>
                        ) : (
                          <span className='danger'>Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>

                  {product.countInStock > 0 && (
                    <>
                      <li>
                        <div className='row'>
                          <div>qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setqty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (el) => (
                                  <option key={el + 1} value={el + 1}>
                                    {el + 1}{" "}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={addToCartHandler}
                          className='primary block'
                        >
                          Add to Cart
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
