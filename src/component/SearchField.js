import React from "react";
import {useHistory} from "react-router-dom";
import "../styles/styles.css";

export default function SearchField(props){
    const [searchData, setSearchData] = React.useState([]);
    const [serachKeyword, setSearchKeyword] = React.useState();
    const history = useHistory();
    let timerId;

    // React.useEffect(() => {
    //     document.addEventListener("mousedown", (event) => {
    //         if(event.target.classList[0] !== "serach-results-container" || event.target.classList[0] !== "serach-data-container"){
    //             setSearchData([]);
    //         }
    //     })
    // },[])

    const serachKeyUpdates = event => {
        const { value } = event.target;
        clearTimeout(timerId);
        timerId = setTimeout(() => searchStockSymbol(value), 1000);
    }

    const searchStockSymbol = async(value) => {
        const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${value}&apikey=ZEB6GEA970ALM0YK`;
        const searchLists = await fetch(url);
        const searchResults = await searchLists.json();
        setSearchKeyword(value);
        setSearchData(searchResults.bestMatches);
    }

    const navigateToStockDetails = value => {
        setSearchData([]);
        history.push(`/stockDetails/${value}`);
    }

    return(
        <div className="serach-results-container">
            <div className="search-container">
                <input className="search-input" type="text" placeholder= "Enter Search keyword" onChange={event => serachKeyUpdates(event)} />
                <button className="search-bth" onClick={() => navigateToStockDetails(serachKeyword)}>Search</button>
            </div>
            {searchData && searchData.length > 0 && 
                <div className="serach-data-container">
                    <ul>
                    {searchData.map(value => (
                        <li key={value["1. symbol"]} onClick={() => navigateToStockDetails(value["1. symbol"])}>
                            <label className="symbol">{value["1. symbol"]}</label>
                            <label className="name">{value["2. name"]}</label>
                        </li>
                    ))}
                    </ul>
                </div>
            }
        </div>
    )
}