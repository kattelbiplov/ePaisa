import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import '../Styles/PagesStyles/Dashboard.css'
import Card from 'react-bootstrap/Card';
import { Chart } from 'primereact/chart';
import maleProfile from '../Assets/StaticImages/maleProfile.jpeg';
import femaleProfile from '../Assets/StaticImages/femaleProfile.png'
import { VirtualScroller } from 'primereact/virtualscroller';
import { classNames } from 'primereact/utils';
import InnerNavBar from "../Components/InnerNavBar";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [items] = useState(Array.from({ length: 100 }).map((_, i) => `NPR. ${i}`));
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
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

                        // Update the state with the user data
                        setUserData(userData);

                        // Check the user's role
                        if (userData.role !== 'admin') {
                            // If the role is not admin, continue rendering the dashboard
                            const documentStyle = getComputedStyle(document.documentElement);
                            const textColor = documentStyle.getPropertyValue('--text-color');
                            const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
                            const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
                            const data = {
                                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                datasets: [
                                    {
                                        label: 'Income',
                                        backgroundColor: documentStyle.getPropertyValue('--green-500'),
                                        borderColor: documentStyle.getPropertyValue('--green-500'),
                                        data: [65, 59, 80, 81, 56, 55, 40]
                                    },
                                    {
                                        label: 'Expenses',
                                        backgroundColor: documentStyle.getPropertyValue('--red-500'),
                                        borderColor: documentStyle.getPropertyValue('--red-500'),
                                        data: [28, 48, 40, 19, 86, 27, 90]
                                    }
                                ]
                            };
                            const options = {
                                maintainAspectRatio: false,
                                aspectRatio: 0.8,
                                plugins: {
                                    legend: {
                                        labels: {
                                            fontColor: textColor
                                        }
                                    }
                                },
                                scales: {
                                    x: {
                                        ticks: {
                                            color: textColorSecondary,
                                            font: {
                                                weight: 500
                                            }
                                        },
                                        grid: {
                                            display: false,
                                            drawBorder: false
                                        }
                                    },
                                    y: {
                                        ticks: {
                                            color: textColorSecondary
                                        },
                                        grid: {
                                            color: surfaceBorder,
                                            drawBorder: false
                                        }
                                    }
                                }
                            };

                            setChartData(data);
                            setChartOptions(options);
                        } else {
                            // If the role is admin, redirect to the login page
                           // navigate("/login");
                           navigate("/admin/home")
                        }
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

        fetchUserData();
    }, [navigate]);

    const itemTemplate = (item, options) => {
        const className = classNames('flex align-items-center p-2', {
            'surface-hover': options.odd
        });

        return (
            <div className={className} style={{ height: options.props.itemSize + 'px' }}>
                {item}
            </div>
        );
    };

    return (
        <>
            <div className="dashboard-part">
                <div className="dashboard-left">
                    <Sidebar />
                </div>
                <div className="dashboard-right">
                    <InnerNavBar />
                    <div className="right-bottom">
                        {
                            userData && (
                                <div className="right-profile">
                                    <Card style={{ width: '18rem', padding: '20px', background: '#007ea4', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '25px' }}>
                                        <Card.Img variant="top" src={userData.gender === 'Male' ? maleProfile : femaleProfile} style={{ borderRadius: '50%', height: '150px', width: '140px', margin: '0 auto' }} />
                                        <Card.Body style={{ paddingTop: '30px' }}>
                                            <Card.Title>{userData.firstName} {userData.middleName} {userData.lastName}</Card.Title>
                                            <Card.Text>
                                                {userData.address}
                                            </Card.Text>
                                            <Card.Text>
                                                {userData.mobileNumber}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                            )
                        }
                        {userData && (
                            <div className="right-balance">
                                <p>Available Balance</p>
                                <h3>NPR. {userData.balance}</h3>
                            </div>
                        )}

                        <div className="right-statement">
                            <div className="card flex flex-wrap justify-content-center gap-5" style={{ borderRadius: '25px' }}>
                                <div>
                                    <div style={{ backgroundColor: '#007ea4', color: 'white', padding: '10px', fontWeight: 'bold' }}><span className="font-bold block mb-2">Statements</span></div>

                                    <VirtualScroller items={items} itemSize={50} itemTemplate={itemTemplate} className="border-1 surface-border border-round" style={{ width: '200px', height: '250px' }} delay={150} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right-chart" style={{ marginTop: '20px' }}>
                        <Chart type="bar" data={chartData} options={chartOptions} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
