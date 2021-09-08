import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../redux/actions/userActions";

const Header = () => {
  const cart = useSelector((state) => state.cartReducer);
  const { cartItems } = cart;
  const user = useSelector((state) => state.userSigninReducer);
  const { userInfo } = user;

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  };
  return (
    <header className='row'>
      <div>
        <Link className='brand' to='/'>
          amazona
        </Link>
      </div>
      <div>
        <Link Link to='/cart'>
          Cart{" "}
          {cartItems.length > 0 && (
            <span className='badge'>{cartItems?.length}</span>
          )}
        </Link>
        {userInfo ? (
          <div className='dropdown'>
            <Link to='#'>
              {userInfo.name?.split(" ")[0]}{" "}
              <i className='fa fa-caret-down'></i>
            </Link>

            <ul className='dropdown-content'>
              <Link to='#signout' onClick={signoutHandler}>
                Sign out
              </Link>
            </ul>
          </div>
        ) : (
          <Link to='/signin'>Sign In</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
