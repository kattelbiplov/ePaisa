import React, { useEffect, useState } from "react";
import AdminSidebar from "../../Components/adminComponents/adminSidebar";
import InnerNavBar from "../../Components/InnerNavBar";
import '../../Styles/PagesStyles/adminPagesStyle/adminHome.css';

import { useNavigate } from "react-router-dom";

const AdminModifyUsers = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const fetchAllUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5500/api/users/allUsers', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                
            });
            if (response.ok) {
                const responseData = await response.json();
                if (responseData.success) {
                    const filteredData = responseData.data.filter(user => user.role !== 'admin');
                    setData(filteredData);
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

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            await deleteUserData(userId);
            fetchAllUsers(); // Refresh the user list after deletion
        }
    };

    const deleteUserData = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5500/api/users/deleteUser/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                console.error('Failed to delete user:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting user:', error.message);
        }
    };
    
 

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
                            {data && data.length > 0 ? (
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Full Name</th>
                                            <th>Phone Number</th>
                                            <th>Email</th>
                                            <th>Balance</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.firstName} {item.middleName} {item.lastName}</td>
                                                <td>{item.mobileNumber}</td>
                                                <td>{item.email}</td>
                                                <td>{item.balance}</td>
                                                <td>
                                              
                                                    <button onClick={() => handleDeleteUser(item._id)}>Delete</button>
                                                </td>
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
            
        </>
    );
}

export default AdminModifyUsers;
