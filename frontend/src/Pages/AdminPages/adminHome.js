import React, { useEffect, useState } from "react";
import AdminSidebar from "../../Components/adminComponents/adminSidebar";
import InnerNavBar from "../../Components/InnerNavBar";
import '../../Styles/PagesStyles/adminPagesStyle/adminHome.css';
import { useNavigate } from "react-router-dom";
const AdminHome = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const fetchAllUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log('Token:', token);
            const response = await fetch('http://localhost:5500/api/users/allUsers', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('Response:', response);
            if (response.ok) {
                const responseData = await response.json();
                console.log('Response Data:', responseData);
                if (responseData.success) {
                    // Filter out admin users
                    const filteredData = responseData.data.filter(user => user.role !== 'admin');
                    setData(filteredData);
                    // setData(responseData.data);
                } else {
                    console.error('Failed to fetch all users:', responseData.message);
                }
            } else {
                console.error('Failed to fetch all users');
            }
        } catch (error) {
            console.error('Error fetching all users:', error.message);
            console.error(error.stack);
        }
    };
    useEffect(() => {
        fetchAllUsers();
    }, []);
    return (
        <>
            <div className="adminHome-part">
                <div className="adminHome-left">
                    <AdminSidebar />
                </div>
                <div className="adminHome-right">
                    <InnerNavBar />
                    <div className="user-list">
                    <h4 style={{ textAlign: 'center', paddingTop: '20px' }}>Users</h4>
                    <div className="table-container">
            <div className="table-container">
  {data && data.length > 0 ? (
    <table className="table">
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Phone Number</th>
          <th>Email</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.firstName} {item.middleName} {item.lastName}</td>
            <td>{item.mobileNumber}</td>
            <td>{item.email}</td>
            <td>{item.balance}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>No data available</p>
  )}
</div>

            </div>
                    </div>
          
                </div>
                
            </div>
        </>
    );
}
export default AdminHome;