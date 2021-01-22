import { Route, Switch } from 'react-router-dom';
import Header from './components/header/header.component';
import HomePage from './pages/home/home.component';
import ShopPage from './pages/shop/shop.component';
import SignInSignUp from './pages/sign-in-sign-up/sign-in-sign-up.component';
import './App.css';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path='/signin' component={SignInSignUp} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/' component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
