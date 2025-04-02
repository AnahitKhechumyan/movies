import React from "react";

export const GoogleMap = ()=>{
    return (
        <div style={{marginTop:"80px"}}>
            <iframe
                src={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12191.863793954728!2d44.51279599468996!3d40.18757124426663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abce217b8839d%3A0x80bc65ebce1f70f!2sArmenian%20Opera%20Theatre!5e0!3m2!1sen!2s!4v1591289537386!5m2!1sen!2s"}
                style={{width:"100%", height:"60vh", frameborder:"0", border:"0"}} allowfullscreen="" aria-hidden="false"
                tabindex="0" >
            </iframe> 
        </div>
    )
};