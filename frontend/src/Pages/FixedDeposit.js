import React from "react";
import '../Styles/PagesStyles/FixedDeposit.css'
import Sidebar from "../Components/Sidebar";
import InnerNavBar from "../Components/InnerNavBar";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
const FixedDeposit = () => {
    return (
        <>
            <div className="fd-part">
                <div className="fd-left">
                    <Sidebar />
                </div>
                <div className="fd-right">
                    <InnerNavBar />
                    <div className="fd">
                        <h4 style={{ textAlign: 'center', paddingTop: '20px' }}>Fixed Deposit Calculator</h4>
                    </div>
                    
                    <div className="fd-calc">
                        <div className="fd-form">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Principal Amount"
                                className="mb-3"
                            >
                            <Form.Control type="number" placeholder="Principal Amount" />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingPassword" label="Interest Rate %">
                                <Form.Control type="number" placeholder="Intersr Rate %" />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingPassword" label=" Tenure in years %" style={{marginTop:'15px'}}>
                                <Form.Control type="number" placeholder="Tenure in years %" />
                            </FloatingLabel>
                            <button style={{marginTop:'20px', backgroundColor:'rgb(4, 97, 126)', border:'none', color:'white', padding:'10px', width:'120px'}}>Calculate</button>
                        </div>
                        <div className="fd-result">
                            <div className="fd-result-up">
                                <p>Total Amount</p>
                            <p>NPR. <span style={{fontWeight:'bold'}}>4200</span></p>
                            </div>
                            <div className="fd-result-down">
                                <p>Interest Amount</p>
                                <p>NPR. <span style={{fontWeight:'bold'}}>4200</span></p>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FixedDeposit