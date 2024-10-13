import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import '../Styles/PagesStyles/Account.css'
import maleProfile from '../Assets/StaticImages/maleProfile.jpeg';
import femaleProfile from '../Assets/StaticImages/femaleProfile.png'
import InnerNavBar from "../Components/InnerNavBar";
import { useNavigate } from "react-router-dom";
import QRCodeComponent from "../Components/QRCodeComponent";
import '../Styles/ComponentStyles/QRCode.css'
const Account = () => {
    
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [qrCodeData, setQRCodeData] = useState(null);
    const handleShareDetails = () => {
        if (userData) {
          // Assuming you have some dynamic data to set for the QR code
          const dynamicData = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            mobileNumber: userData.mobileNumber,
            // Add more fields as needed
          };
    
          // Convert the dynamic data to a JSON string (or any format you prefer)
          const jsonString = JSON.stringify(dynamicData);
    
          // Set the QR code data in the state
          setQRCodeData(jsonString);
    
          // Open a modal or perform any action to display the QR code with dynamic data
          console.log('QR Code Data:', jsonString);
        }
      };
    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                // Redirect to the login page if the token is not present
                navigate("/login");
                return;
            }

            const response = await fetch("http://localhost:8000/api/users/profile", {
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
                    console.log("User Gender:", userData.gender);
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
        // Check if the token is present in local storage
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            fetchUserData();
        }
    }, [navigate]);
    return (
        <>
            <div className="account-part">
                <div className="account-left">
                    <Sidebar />
                </div>
                <div className="account-right">

                    <InnerNavBar />
                    <h6 style={{ textAlign: 'center', fontSize: '22px', paddingTop: '10px', paddingBottom: '10px' }}>Accounts</h6>
                    <div className="account-right-all">

                        <div className="account-upper">
                            <div className="account-profile">
                                <div className="account-profile-img">
                                    {userData && (
                                        <img src={userData.gender === 'Male' ? maleProfile : femaleProfile} />
                                    )}
                                </div>

                                <div className="account-profile-info">
                                    {userData && (
                                        <>
                                            <h4 style={{ fontWeight: "bold" }}>
                                                {userData.firstName} {userData.lastName}
                                            </h4>
                                            <h6 style={{ backgroundColor: "red", padding: "4px", color: "white", width: "63px" }}>ACTIVE</h6>
                                            <p style={{ fontWeight: "bold" }}>{userData.mobileNumber}</p>
                                        </>
                                    )}
                                </div>



                            </div>
                            <div className="account-upper-low">
                                {userData && (
                                    <div className="account-detail">
                                        <p>Youth Saving Account</p>
                                        <p>{userData.firstName} {userData.middleName} {userData.lastName}</p>
                                        <p>NPR. <span style={{ fontWeight: 'bold', fontSize: '22px' }}>{userData.balance}</span></p>
                                    </div>
                                )}

                                <div className="account-detail-share">
                                    <button onClick={handleShareDetails}>Share Details</button>
                                </div>
                            </div>

                        </div>
                        <div className="account-feature">
                            <ul>
                         
                                <li>
                               
                                    <a href="/account/statement" style={{ color: 'black', textDecoration: 'none' }}>Statements</a></li>
                                <li><a href="/send-money" style={{ color: 'black', textDecoration: 'none' }}>Send Money</a></li>
                            </ul>
                        </div>
                        <div className="account-option">
                            <h4>All Accounts</h4>
                            <ul>
                                <li className="fixed-list"><a href="/fixed-deposit">Fixed Deposit</a></li>
                                <li className="recurring-list"><a href="#">Recurring Deposit</a></li>
                                <li className="loans-list"><a href="#">Loans</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {qrCodeData && (
        <div className="qr-code-modal">
            <div className="modal-overlay" />
            <QRCodeComponent value={qrCodeData} onClose={() => setQRCodeData(null)} />
          {/* Add any additional content or close button for the modal */}
        </div>
      )}

        </>
    );
}

export default Account