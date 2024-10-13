import React, { useState } from "react";
import Navbars from "../Components/Navbar";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { toast } from 'react-toastify';
import { Calendar } from 'primereact/calendar';
import { Navigate, useNavigate } from "react-router-dom";
const Registration = () => {
    const navigate=useNavigate();
    const [date, setDate] = useState(null);
    const [formData, setFormData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        mobileNumber: "",
        gender: "Male",
        dob: "",
        address: "",
        email: "",
        password: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'dob') {
            // Format the date as "yyyy-mm-dd" for HTML date input
            const formattedDate = value.split('/').reverse().join('-');
            setFormData({ ...formData, [name]: formattedDate });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const response = await fetch('http://localhost:8000/api/users/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.status === 201) {
                // User registration successful
                toast.success('success');
                navigate('/login')
            } else if (response.status === 409) {
                // User already exists
                toast.error('User already exists. Please use a different mobile number.');
            } else {
                // Handle other cases, e.g., display error messages to the user
                toast.error('Registration failed.');
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Error:', error);
        }
    };

    return (
        <>
            <Navbars />
            <div style={{
                background: 'linear-gradient(to right, rgba(1, 118, 154, 1) 0%, rgba(255, 203, 5, 0.8) 100%)',
                padding: '15px 0',
                color: '#fff',
                fontSize: '13px'
            }}>
                <Container>
                    <h3 style={{ marginTop: '30px', marginBottom: '60px', textAlign: 'center' }}>Online Account Registration Form</h3>

                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridfirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter First Name" required value={formData.firstName}
                                    onChange={handleInputChange} name="firstName" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridmiddleName">
                                <Form.Label>Middle Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Middle Name" value={formData.middleName}
                                    onChange={handleInputChange} name="middleName" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridlastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Last Name" required value={formData.lastName}
                                    onChange={handleInputChange} name="lastName" />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridmobileNumber">
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control type="number" placeholder="Enter Mobile Number" value={formData.mobileNumber}
                                    onChange={handleInputChange} name="mobileNumber" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridGender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridDOB">
                                <div style={{ marginBottom: '0px' }}>
                                    <Form.Label>Date of Birth</Form.Label>
                                </div>
                                <Form.Control
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                        </Row>

                        <Row className="mb-3">
                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label>Address</Form.Label>
                                <Form.Control placeholder="Enter Full Address" value={formData.address}
                                    onChange={handleInputChange} name="address" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={formData.email}
                                    onChange={handleInputChange} name="email" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={formData.password}
                                    onChange={handleInputChange} name="password" />
                            </Form.Group>
                        </Row>

                        <Button type="submit" className="mt-3 mb-3" style={{ backgroundColor: '#e4b400', color: 'black', outline: 'none', width: '120px', border: 'none' }}>
                            Submit
                        </Button>
                    </Form>
                </Container>
            </div>
            <div>
                <Container>
                    <h3 style={{ color: '#007ea4', paddingTop: '20px', paddingBottom: "10px" }}>Disclaimer</h3>
                    <p>अनलाइन एप्लिकेशन मार्फत खोलिएका खाताहरूमा कुनैपनि बेला रकम जम्मा गर्न मिल्छ। खातावाल स्वयं बैंकको शाखामा आफ्नो परिचय खुल्ने सक्कल कागजात लिएर गएपछि मात्र खाता सक्रिय हुनेछ। खाता सक्रिय भए पश्चात् मात्र खातामा भएको रकम निकाल्न मिल्नेछ।</p>
                    <p>An accountholder can make deposits anytime to his/her Bank account opened via online application. However, the amount in the account can be withdrawn only after the account is activated. Accounts opened through online application will be activated only after the accountholder visits the Bank for identity verification along with his/her valid ID documents.</p>
                </Container>
            </div>
        </>
    );
}

export default Registration