import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/Sidebar';
import InnerNavBar from '../Components/InnerNavBar';
import '../Styles/PagesStyles/Statement.css';
import { useNavigate } from 'react-router-dom';

const Statement = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const fetchStatement = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:8000/api/users/statement', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Response:', response);

      if (response.ok) {
        const responseData = await response.json();
        console.log('Response Data:', responseData);
        if (responseData.success) {
          setData(responseData.data);
        } else {
          console.error('Failed to fetch statement:', responseData.message);
        }
      } else {
        console.error('Failed to fetch statement');
      }
    } catch (error) {
      console.error('Error fetching statement:', error);
    }
  };

  useEffect(() => {
    fetchStatement();
  }, []); // Empty dependency array, so it runs once on mount

  console.log('Data:', data);

  return (
    <>
      <div className="statement-part">
        <div className="statement-left">
          <Sidebar />
        </div>
        <div className="statement-right">
          <InnerNavBar />
          <div className="statement">
            <h4 style={{ textAlign: 'center', paddingTop: '20px' }}>Statement</h4>
            <div className="table-container">
            <div className="table-container">
  {data && data.length > 0 ? (
    <table className="table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Sender</th>
          <th>Amount</th>
          <th>Receiver</th>
          <th>Remarks</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
           <td>{new Date(item.createdAt).toLocaleDateString('en-CA')}</td>

            <td>{item.sender}</td>
            <td>{item.amount}</td>
            <td>{item.receiver}</td>
            <td>{item.remarks}</td>
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
};

export default Statement;
