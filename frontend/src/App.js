import './App.css';
import Navbars from './Components/Navbar';
import Homepage from './Pages/Homepage';
import Login from './Pages/Login';
import Registration from './Pages/Registration';
import Dashboard from './Pages/Dashbboard';
import { Route, Routes } from 'react-router-dom';
import Account from './Pages/Account';
import SendMoney from './Pages/SendMoney';
import Statement from './Pages/Statement';
import FixedDeposit from './Pages/FixedDeposit';
//import Admin from './Pages/Admin';
import AdminHome from './Pages/AdminPages/adminHome';
import AdminStatement from './Pages/AdminPages/adminStatement';
import CustomerService from './Pages/CustomerService';
import AdminModifyUsers from './Pages/AdminPages/adminModifyUsers';
import AdminCustomerService from './Pages/AdminPages/adminCustomer';
function App() {
  return (
    
      <>
        
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/accounts" element={<Account />} />
          <Route path="/send-money" element={<SendMoney />} />
          <Route path="/account/statement" element={<Statement />} />
          <Route path="/fixed-deposit" element={<FixedDeposit />} />
          <Route path="/customer-service" element={<CustomerService />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/modify-users" element={<AdminModifyUsers />} />
          <Route path='/admin/statement' element={<AdminStatement />} />
          <Route path='/admin/customer-service' element={<AdminCustomerService />} />
        </Routes>
      </>
   
  );
}

export default App;
