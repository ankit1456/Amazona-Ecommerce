import { useEffect } from "react";
import Product from "../components/Product";
import MessageBox from "./../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "./../redux/actions/productActions";
import ContentLoader from "react-content-loader";
import Skeleton from "react-loading-skeleton";

const HomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts);
  }, [dispatch]);

  const productList = useSelector((state) => state.productListReducer);
  const { loading, error, products } = productList;

  return (
    <div>
      {loading ? (
        // [...Array(20)].map(()=> <Skeleton height={150} width={150} />
        <LoadingBox />
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <div className='row center'>
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
