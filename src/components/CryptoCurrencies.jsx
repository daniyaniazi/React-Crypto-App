import React, { useState } from "react";
import { Link } from "react-router-dom";
import millify from "millify";
import { Card, Row, Col, Input } from "antd";
import useGetCryptosQuery from "../services/cryptoApi";

const CryptoCurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(cryptoList?.data?.coins);

  console.log(cryptoList, cryptos);
  if (isFetching) return "Loding...";
  return (
    <>
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => {
          return (
            <Col
              xs={24}
              sm={12}
              lg={6}
              key={currency.id}
              className="crypto-card"
            >
              <Link to={`/crypto/${currency.id}`}>
                <Card
                  title={`${currency.rank}. ${currency.name}`}
                  extra={
                    <img className="crypto-image" src={currency.iconUrl} />
                  }
                  hoverable
                >
                  <p>Price: {millify(currency.price)}</p>
                  <p>Market Cap: {millify(currency.marketCap)}</p>
                  <p>DailyChange: {millify(currency.change)}%</p>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default CryptoCurrencies;
