import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import '../Styles/PagesStyles/SendMoney.css'
import InnerNavBar from '../Components/InnerNavBar';
import { Button } from 'primereact/button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
const SendMoney = () => {
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    receiver: "",
    amount: "",
    remarks: "",
  });
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
    
      if (!token) {
        // Redirect to the login page if the token is not present
        navigate("/login");
        return;
      }

      const response = await fetch("http://localhost:5500/api/users/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseData = await response.json();

        // Check for the 'success' property in the response
        if (responseData.success && responseData.data) {
          const userData = responseData.data;

          // Log the user data to the console
          console.log("Fetched User Data:", userData);

          // Update the state with the user data
          setUserData(userData);
        } else {
          console.error("Unexpected response shape:", responseData);
        }
      } else {
        // Handle error response
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  useEffect(() => {
    // Fetch user data when the component mounts
    fetchUserData();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const amount = parseFloat(formData.amount);

      if (formData.receiver === userData.mobileNumber) {
        console.error("Cannot send money to your own account");
        toast.error("Cannot send money to your own account");
        return;
      }
      if (formData.amount > userData.balance) {
        console.error("Insufficient balance");
        toast.error("Insufficient balance");
        return;
      }
      const response = await fetch("http://localhost:5500/api/users/send-money", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiver: formData.receiver,
          sender: userData.mobileNumber,
          amount: amount,
          remarks: formData.remarks,
        }),
    });
      if (response.status === 200) {
        const responseData = await response.json();
        console.log("Transaction successful:", responseData.data);
        toast.success('Transaction Successful')
        navigate('/accounts')
      } else if(response.status === 401){
      toast.error('Receiver not found')
    }else if(response.status === 500) {
      toast.error('Internal server error');
    }
  }
    catch (error) {
    console.error("Error sending money:", error);
  }
};

return (
  <>
    <div className="sendmoney-part">
      <div className="sendmoney-left">
        <Sidebar />
      </div>
      <div className="sendmoney-right">
        <InnerNavBar />
        <h1 style={{ textAlign: 'center', paddingTop: '20px' }}>Send Money</h1>
        <div className="send-part">
          <p style={{ fontWeight: 'bold' }}>From Account</p>
          {userData && (
            <div className="send-from">
              <h4>{userData.firstName} {userData.middleName} {userData.lastName}</h4>
              <p>{userData.mobileNumber}</p>
            </div>
          )}

          <div className="send-money-form">
            <p style={{ fontWeight: 'bold' }}>To Account</p>
            <Form onSubmit={handleFormSubmit}>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control type="number" placeholder="Enter Mobile Number" name="receiver" value={formData.receiver}
                  onChange={handleInputChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Amount</Form.Label>
                <Form.Control type="number" placeholder="Amount" name="amount" value={formData.amount}
                  onChange={handleInputChange}onKeyPress={(e) => {
                    // Allow only digits and backspace
                    if (e.key !== 'Backspace' && !/^\d$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }} />
              </Form.Group>
              <Form.Label>Remarks</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter Remarks"
                style={{ height: '100px' }} name="remarks" value={formData.remarks}
                onChange={handleInputChange}
              />
              <Button label="Send Money" icon="pi pi-check" iconPos="right" type="submit" style={{ marginTop: '20px', backgroundColor: '#007ea4' }} />
            </Form>
          </div>
        </div>

      </div>
    </div>
  </>
);
}

export default SendMoney