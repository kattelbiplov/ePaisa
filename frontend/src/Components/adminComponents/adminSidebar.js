import React,{useEffect} from 'react';
import '../../Styles/ComponentStyles/adminComponentStyles/adminSidebar.css';
import AdminCustomerService from '../../Pages/AdminPages/adminCustomer';
import Logo from '../../Assets/StaticImages/logo.png'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const AdminSidebar = () => {
  const navigate = useNavigate();

    const handleLogout = () => {
        // Remove the token from local storage
        localStorage.removeItem("token");

        // Redirect to the login page
        navigate("/login");
    };
    useEffect(() => {
      // Check if the token is present in local storage
      const token = localStorage.getItem("token");
      if (!token) {
          // Redirect to the login page if the token is not present
          navigate("/login");
      }
  }, [navigate]);
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={Logo} alt="Logo" />
       
      </div>
      <ul className="menu">
        <li><a href="/admin/home">Home</a></li>
        <li><a href="/admin/statement">Statement</a></li>
        <li><a href="/admin/modify-users">Modify Users</a></li>
        <li><a href="/admin/customer-service">Customer Service</a></li>
        <li><a href=""onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
