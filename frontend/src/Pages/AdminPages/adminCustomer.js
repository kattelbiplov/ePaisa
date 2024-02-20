import React from "react";
import InnerNavBar from "../../Components/InnerNavBar";
import AdminSidebar from "../../Components/adminComponents/adminSidebar";
import '../../Styles/PagesStyles/adminPagesStyle/adminCustomer.css';
const AdminCustomerService = () => {
    return (
        <>
            <div className="customerAdmin-part">
                <div className="customerAdmin-left">
                    <AdminSidebar />
                </div>
                <div className="customerAdmin-right">
                    <InnerNavBar />
                    <div>
                        <h1 style={{textAlign:'center'}}>Customer Service</h1>
                    </div>
                </div>
            </div>

        </>
    );
}
export default AdminCustomerService;