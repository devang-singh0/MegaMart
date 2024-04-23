import './App.css';
import { Header } from './components/header/header';
import Footer from './components/footer/footer';
import { Route, Routes } from 'react-router-dom';
import Home from './routes/home.jsx';
import Product from './components/product/product.jsx';
import Basket from './components/basket/basket.jsx';
import User from './routes/user.jsx';
import Gallery from './components/gallery/gallery.jsx';
import Orders from './components/orders/orders.jsx';
function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path='/' Component={Home}></Route>
        <Route path='/Product/:id' Component={Product}></Route>
        <Route path='/cart' Component={Basket}></Route>
        <Route path='/user' Component={User}></Route>
        <Route path='/products' Component={Gallery}></Route>
        <Route path='/products/:category' Component={Gallery}></Route>
        <Route path='/orders' Component={Orders}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
