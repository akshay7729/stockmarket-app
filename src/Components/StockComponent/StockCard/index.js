import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

const StockCard = ({ stock }) => {
  const [currentStock, setCurrentStock] = useState();
  const [prev, setPrev] = useState();

  const handleDollarChange = (current, prev) => {
    const getFloat = parseFloat(current - prev);
    const isPositive = current - prev > 0 ? true : false;
    return [getFloat.toFixed(1), isPositive];
  };

  const handlePercentageChange = (current, prev) => {
    const isPositive = current - prev > 0 ? true : false;
    const calcPercentage = ((current - prev) / current) * 100;
    return [calcPercentage.toFixed(1), isPositive];
  };

  useEffect(() => {
    const getCurrentStockInterval = setInterval(() => {
      axios
        .get(
          `https://cloud.iexapis.com/stable/tops?token=pk_48dc79bb50f04565a67b58c09a1edfc6&symbols=${stock}`
        )
        .then((response) => {
          setCurrentStock(response.data[0]);
        })
        .catch((error) => console.log("err", error));
    }, 1000);

    axios
      .get(
        `https://cloud.iexapis.com/stable/stock/${stock}/previous?token=pk_48dc79bb50f04565a67b58c09a1edfc6`
      )
      .then((response) => {
        setPrev(response.data);
      })
      .catch((error) => console.log("err", error));

    return () => {
      clearInterval(getCurrentStockInterval);
    };
  }, []);
  return (
    <Fragment>
      {currentStock ? (
        <div className="stockCard">
          <div className="content content-1">
            <div className="content-img">
              <img
                src={`https://storage.googleapis.com/iex/api/logos/${stock}.png`}
              />
            </div>
          </div>
          <div className="content content-2">
            <div className="content-desc">
              <div>
                <h4>{stock}</h4>
              </div>
              <div className="description">
                <p>Description</p>
              </div>
            </div>
          </div>
          <div className="content content-3">
            <div className="content-desc">
              <div>
                <h5>${currentStock.lastSalePrice}</h5>
              </div>
              <div>
                <div className="value-container">
                  <div className="value">
                    {currentStock && prev ? (
                      <span
                        className={
                          handleDollarChange(
                            currentStock.lastSalePrice,
                            prev.close
                          )[1]
                            ? "green"
                            : "red"
                        }
                      >
                        {handleDollarChange(
                          currentStock.lastSalePrice,
                          prev.close
                        )[1] ? (
                          <FontAwesomeIcon icon={faArrowUp} />
                        ) : (
                          <FontAwesomeIcon icon={faArrowDown} />
                        )}
                        {
                          handleDollarChange(
                            currentStock.lastSalePrice,
                            prev.close
                          )[0]
                        }
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="value value-right">
                    {currentStock && prev ? (
                      <span
                        className={
                          handlePercentageChange(
                            currentStock.lastSalePrice,
                            prev.close
                          )[1]
                            ? "green"
                            : "red"
                        }
                      >
                        {
                          handlePercentageChange(
                            currentStock.lastSalePrice,
                            prev.close
                          )[0]
                        }
                        %
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default StockCard;
