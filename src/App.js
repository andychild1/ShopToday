import React from 'react';
import './App.css';
import Header from './components/header/Header';
import Products from './features/products/Products';
import CartCard from './components/cartCard/CartCard';
import Checkout from './components/checkout/Checkout';
import { useSelector } from 'react-redux';
import { selectCart } from './features/cart/cartSlice';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
const cart = useSelector(selectCart);

  return (
    <Router>
    <div className="App">
          <Header />
      <main>
        <Switch>
          <Route exact path="/">
              <Products />
          </Route>
          <Route exact path="/cart">
              <CartCard cart={cart} />
          </Route>
          <Route exact path="/checkout">
               <Checkout cart={cart.cart}/>
          </Route>
        </Switch>
      </main>
    </div>
    </Router>
  );
}

export default App;
