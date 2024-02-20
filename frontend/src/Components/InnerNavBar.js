import React,{ useState, useEffect } from "react";
import '../Styles/ComponentStyles/InnerNavBar.css'
const InnerNavBar=()=>{
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000); // Update every 1000 milliseconds (1 second)

        return () => clearInterval(interval); // Clean up the interval on unmount
    }, []);
    return(
        <>
        <div className="right-top">
                        <p style={{ fontWeight: 'bold' }}>Welcome to Web Bank </p>
                        <p>Current Time:  {currentTime.toLocaleTimeString()}</p>
                    </div>
        </>
    );
}
export default InnerNavBar;