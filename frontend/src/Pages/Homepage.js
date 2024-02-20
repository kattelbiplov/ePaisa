import React,{ useState } from "react";
import '../Styles/PagesStyles/Homepage.css'
import ServiceImage from '../Assets/StaticImages/epaisamini.png'
import Registration from './Registration'
import Banner from "../Components/Banner";
import Navbars from '../Components/Navbar';
const Homepage=()=>{

    const serviceListItmes=[
        "Current balance in your account on real time basis",
        "Transaction search",
        "Checking daily transaction in account",
        "Fund transfer within and between other Banks",
        "Future dated payment instructions within own accounts or within group accounts",
        "Statement download",
        "Loan Information"
    ]
    return(
        <>
        <Navbars />
        <Banner />
        {/* <div className="homeConatiner">
            <h3>For Individual Customer</h3>
            <p>At Kumari Bank, we facilitate banking with a click of a mouse and where you can keep track of your account from anywhere in the world. Kumari Bank Limited has a robust, instant, secure and reliable banking solution in place for its clients.</p>
            <button className="homeLoginButton">iBanking Login</button>

            <div className="homeServiceCard">
                <div className="homeServiceCardLeft">
                    <h3>Services we offer:</h3>
                    <ul>
                    {serviceListItmes.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}


                    </ul>
                </div>
                <div className="homeServiceCardRight">
                    <img src={ServiceImage} alt="service" />
                </div>
            </div>
            <p style={{marginTop:'20px'}}><span style={{color:'red'}}>Note *  </span>All we need from your side is to fill in an application form for online banking service to acquire your user ID, subsequent to which your login credentials will be informed to you via email or SMS. 

</p>
        </div> */}
        </>
    );
}
export default Homepage