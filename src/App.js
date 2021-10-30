import React from 'react';
import './App.css';
import Header from './components/header/Header';
import Home from './components/home/Home';
import CartCard from './components/cartCard/CartCard';
import Checkout from './components/checkout/Checkout';
import { useSelector } from 'react-redux';
import { selectCart } from './features/cart/cartSlice';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { selectCategories } from './features/products/productsSlice';
import Products from './features/products/Products';
import Footer from './components/footer/Footer';
import CookieConsent from 'react-cookie-consent';


function App() {
const cart = useSelector(selectCart);
const category = useSelector(selectCategories);

  return (
    <Router>
    <div className="App">
      <main>
        <Switch>
          <Route exact path="/">
              <Header />
              <Home />
              {category ? <Products /> : null}
          </Route>
          <Route exact path="/cart">
              <CartCard cart={cart} />
          </Route>
          <Route exact path="/checkout">
               <Checkout cart={cart.cart}/>
          </Route>
        </Switch>
      </main>
      <CookieConsent >
        This site use cookies to enchance the user experience
        </CookieConsent>
      <Footer/>
    </div>
    </Router>
  );
}

export default App;
