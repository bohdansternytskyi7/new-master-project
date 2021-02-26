import { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Route, Switch, Redirect } from 'react-router-dom';
import { checkUserSession } from './redux/user/user.actions';
import { hideCart } from './redux/cart/cart.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { selectCartHidden } from './redux/cart/cart.selectors';
import Header from './components/header/header.component';
import HomePage from './pages/home/home.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';
import SignInSignUp from './pages/sign-in-sign-up/sign-in-sign-up.component';
import './App.css';

const App = ({ checkUserSession, cartHidden, currentUser, hideCart }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  const handleClick = (e) => {
    if (cartHidden) return;
    if (!e.target.closest('.cart-icon') && !e.target.closest('.cart-dropdown'))
      hideCart();
  };

  return (
    <div onClick={handleClick}>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route path='/shop' component={ShopPage} />
        <Route path='/contact' component={HomePage} />
        <Route
          exact
          path='/signin'
          render={() => (currentUser ? <Redirect to='/' /> : <SignInSignUp />)}
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartHidden: selectCartHidden,
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  hideCart: () => dispatch(hideCart()),
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
