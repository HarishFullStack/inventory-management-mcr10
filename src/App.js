import { Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import { Dashboard } from './pages/Dashboard';
import { Departments } from './pages/Departments';
import { Products } from './pages/Products';
import { Product } from './pages/Product';
import { ProductManagement } from './pages/ProductManagement';

function App() {
  return (
    <div className="App container-fluid ">
      <div className='row main' >
      <div className='col-md-2 bg-dark'>
      <ul className="nav flex-column p-3 m-auto">
        <li className="nav-item fs-1 mt-5">
          <NavLink className={({ isActive }) => (isActive ? "selected" : "")} to='/'>Dashboard</NavLink>
        </li>
        <li className="nav-item fs-1 mt-5">
          <NavLink className={({ isActive }) => (isActive ? "selected" : "")} to='/departments'>Departments</NavLink>
        </li>
        <li className="nav-item fs-1 mt-5">
          <NavLink className={({ isActive }) => (isActive ? "selected" : "")} to='/products'>Products</NavLink>
        </li>
      </ul>
      </div>
      <div className='col-md-10'>
        <Routes>
          <Route path="/" element={<Dashboard/>}>Dashboard</Route>
          <Route path="/departments" element={<Departments/>}>Departments</Route>
          <Route path="/products/:department" element={<Products/>}>Products</Route>
          <Route path="/products/" element={<Products/>}>Products</Route>
          <Route path="/product-management" element={<ProductManagement/>}>Products</Route>
          <Route path="/product/:productId" element={<Product/>}>Products</Route>
        </Routes>
      </div>
      </div>
    </div>
  );
}

export default App;
