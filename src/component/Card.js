import React from "react";
import "../styles/styles.css";

export default function Card(props){
    const {title, subtitle} = props;
    return(
        <div className="card-container">
           <div className="header">
               <h3 className="text">{title}</h3>
               {subtitle && <h5 className="text">{subtitle}</h5>}
           </div>
           <div className="card-body">
               {props.children}
           </div>
        </div>
    )
}