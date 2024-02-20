import React from "react";
import Sidebar from "../Components/Sidebar";
import InnerNavBar from "../Components/InnerNavBar";
const CustomerService = () => {
    return (
        <>
            <div className="fd-part">
                <div className="fd-left">
                    <Sidebar />
                </div>
                <div className="fd-right">
                    <InnerNavBar />
                </div>
            </div>

        </>
    );
}
export default CustomerService;