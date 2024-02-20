// Footer.js
import React from 'react';
import '../Styles/ComponentStyles/Footer.css';
import Logo from '../Assets/StaticImages/logo.webp'
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <img src={Logo} alt='logo' />
                </div>
                <div className="footer-right">
                    <div className='footer-right-left1'>
                    <ul>
                        <li><a href="#">About</a></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Contact Us</a></li>
                    </ul>
                    </div>
                    <div className='footer-right-right1'>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Contact Us</a></li>
                    </ul>
                    </div>
                    
                </div>
            </div>
        </footer>
    );
};

export default Footer;
