import './App.css';
import Navbar from './components/Navbar/Navbar';
import OrderList from './components/OrderList/OrderList';
import OrderForm from './components/OrderForm/OrderForm';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/OrderList" element={<OrderList />} />
          <Route path="/OrderForm" element={<OrderForm />} />
          <Route path="/OrderForm/:id" element={<OrderForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
