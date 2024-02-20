import React from "react";
import BannerImg from '../Assets/StaticImages/webbankbanner.png';
//import BannerImage from '../Assets/StaticImages/epaisabanner.png'
const Banner=()=>{
    return(
        <>
        <img src={BannerImg} alt="banner"  style={{width:'100%'}}/>
        </>
    );
}
export default Banner;