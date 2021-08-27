import React from "react";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

import Card from "./Card";
import "../styles/styles.css";

export default function Dashboard(props){
    const history = useSelector(state => state.viewHistory.history);
    const navHistory = useHistory();

    const navigateToStockDetails = (value) => {
        navHistory.push(`/stockDetails/${value}`)
    }
    
    return(
        <div className="viewed-history">
             {history.map((value, index) => <
                 Card 
                    key={index} 
                    subtitle={value} 
                    handleClick={() => navigateToStockDetails(value)}></Card>
                )
            }
        </div>
    )
}