import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import InnerNavBar from "../Components/InnerNavBar";
import '../Styles/PagesStyles/CustomerService.css';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
const CustomerService = () => {
    const navigate = useNavigate();
  // Define state variables to store form data
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    email: "",
  });
  const [image, setImage] = useState(null); // State variable to store uploaded image

  // Handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image input change
  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get the first file from the list of selected files
    setImage(file); // Set the image state to the selected file
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/users/customer-service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.status === 201) {
        // Customer service request created successfully
        toast.success('Customer service request submitted successfully');
        navigate('/'); // Redirect to home page or any other page
        console.log('services submitted')
      } else {
        // Handle other cases, e.g., display error messages to the user
        toast.error('Failed to submit customer service request');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error:', error);
      toast.error('Failed to submit customer service request. Please try again later.');
    }

    // You can perform any action with the form data and image here, such as sending them to a server
    console.log("Form submitted:", formData);
    console.log("Image:", image);
    // Clear form fields and image state
    setFormData({
      subject: "",
      description: "",
      email: "",
    });
    setImage(null);
  };

  return (
    <>
      <div className="fd-part">
        <div className="fd-left">
          <Sidebar />
        </div>
        <div className="fd-right">
          <InnerNavBar />
          <h1 style={{ textAlign: "center", marginBottom: "50px", marginTop: "20px" }}>Customer Service</h1>
          <form onSubmit={handleSubmit} className="customer-service-form">
            <div>
              <label htmlFor="subject">Subject:</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="image">Upload Image:</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*" // Specify accepted file types (in this case, images)
                onChange={handleImageChange} // Handle file input change
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CustomerService;
