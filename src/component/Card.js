import React from "react";
import "../styles/styles.css";

export default function Card(props){
    const {title, subtitle, handleClick} = props;

    const handleCardClick = () => {
        if(handleClick){
           return handleClick();
        }else{
            return;
        }
    }
    return(
        <div className="card-container" onClick={() => handleCardClick()}>
           <div className="header">
               {title && <h3 className="text">{title}</h3>}
               {subtitle && <h5 className="text">{subtitle}</h5>}
           </div>
           <div className="card-body">
               {props.children}
           </div>
        </div>
    )
}