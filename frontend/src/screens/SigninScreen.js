import React, { useEffect, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { signin } from '../actions/userActions';
import { signin } from "./../redux/actions/userActions";

const SigninScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const history = useHistory();

  const userSignin = useSelector((state) => state.userSigninReducer);
  const { loading, userInfo, error } = userSignin;
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  return (
    <div className='signin__form'>
      <form onSubmit={submitHandler}>
        <ul className='form-container'>
          <h1>Sign In</h1>

          <li>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
          </li>
          <li>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              id='email'
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </li>
          <li>
            <button type='submit' className='primary block'>
              Signin
            </button>
          </li>
          <li>New to amazona?</li>
          <li>
            <Link
              to={
                redirect === "/" ? "register" : `register?redirect/${redirect}`
              }
              className='button secondary text-center'
            >
              Create your amazona account
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
};
export default SigninScreen;
