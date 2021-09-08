import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceorderScreen from "./screens/PlaceorderScreen";

const App = () => {
  return (
    <Router>
      <div className='grid-container'>
        <Header />
        <main>
          <Route path='/product/:id'>
            <ProductScreen />
          </Route>
          <Route path='/cart/:productId?'>
            <CartScreen />
          </Route>
          <Route path='/signin'>
            <SigninScreen />
          </Route>
          <Route path='/register'>
            <RegisterScreen />
          </Route>
          <Route path='/shipping'>
            <ShippingAddressScreen />
          </Route>
          <Route path='/paymentMethod'>
            <PaymentMethodScreen />
          </Route>
          <Route path='/placeorder'>
            <PlaceorderScreen />
          </Route>
          <Route exact path='/'>
            <HomeScreen />
          </Route>
        </main>
        <footer className='row center'>All right reserved &copy; 2021</footer>
      </div>
    </Router>
  );
};

export default App;
