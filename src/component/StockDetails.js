import React from "react";

import Card from "./Card";
import LineChart from "./LineChart";
import Loader from "./Loader";
import "../styles/styles.css";

export default function StockDetails(props){
    const [stockDetails, setStockDetails] = React.useState({});
    const [dateTime, setDateTime] = React.useState(new Date().getTime());
    const [initialFetch, setInitialFetch] = React.useState(true);
    const [liveStockData, setLiveStockData] = React.useState({});
    const [loader, setLoader] = React.useState(true);
    
    React.useEffect(() => {
        setLoader(true);
        const stockId = props?.match?.params?.id;
        fetchStockData(stockId);
        fetchLiveStockData(stockId);
        fetchTime();
    }, [props.match,dateTime]);

    async function  fetchLiveStockData (stockId){
        console.log("time", dateTime);
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockId}&interval=5min&apikey=ZEB6GEA970ALM0YK`;
        const liveDataFetch = await fetch(url);
        const liveResult = await liveDataFetch.json();
        setLiveStockData(liveResult["Time Series (5min)"]);
        setLoader(false);
    }

    const fetchStockData = async(stockId) => {
        if(!initialFetch){
            return;
        }
        const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stockId}&apikey=ZEB6GEA970ALM0YK`;
        try{
            const details = await fetch(url);
            const resultSet = await details.json();
            setStockDetails(resultSet);
            setInitialFetch(false);
            setLoader(false);
        }catch(error){
            console.log("error fetching the stock defails");
            setLoader(false);
        }
    };

    const fetchTime = () => {
        return setTimeout(() => {
            setDateTime(new Date().getTime());
        }, 5000000);
    };

    return(
        <div className="stock-details-container">
            {loader && <Loader />}
            {!loader && Object.keys(stockDetails).length === 0 && stockDetails.constructor === Object && 
                <div className="no-records">
                    <Card>Record Not Exist for this Symbol.</Card>
                </div>
            }
            {!loader && Object.keys(stockDetails).length > 0 && stockDetails.constructor === Object && 
                <div className="main-container">
                    <Card title={stockDetails.Name}
                        subtitle = {stockDetails.Symbol}>
                        <div className="stock-desc">{stockDetails.Description}</div>
                        <div className="row-grid">
                            <div className="scurrent-price">
                                Current Price: {stockDetails.PriceToBookRatio}
                            </div>
                            <div className="traded-date">Tarded date: {stockDetails.DividendDate}</div>
                        </div>
                        <div className="row-grid">
                            <div className="industry">Industry: {stockDetails.Industry}</div>
                            <div className="peratio">PE Ratio: {stockDetails.PERatio}</div>
                        </div>
                        <div className="market-cap">Market Cap: {stockDetails.MarketCapitalization}</div>
                    </Card>
                    <Card title={`Stock Price: ${new Date()}`}>
                        <LineChart stockData={liveStockData}/>
                    </Card>
                </div>
            }
        </div>
    )
}