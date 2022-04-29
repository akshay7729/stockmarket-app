import React, { useState } from "react";
import StockCard from "./StockCard";

const StockComponent = () => {
  const [stocks, setStocks] = useState([
    "AAPL",
    "NFLX",
    "GOOG",
    "AMZN",
    "TSLA",
  ]);

  return (
    <div>
      {stocks.length &&
        stocks.map((stock) => (
          <div key={stock}>
            <StockCard stock={stock} />
          </div>
        ))}
    </div>
  );
};

export default StockComponent;
