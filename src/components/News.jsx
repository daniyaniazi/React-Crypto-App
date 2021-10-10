import React, { useState } from "react";

import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import useGetCryptoNewsQuery from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const { Text, Title } = Typography;
const { Option } = Select;
const demoImageUrl =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";
const News = ({ simplified }) => {
  const count = simplified ? 6 : 12;
  const [category, setCategory] = useState("Cryptocurrency");
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    category: category,
    count: count,
  });

  if (isFetching || !cryptoNews?.value) return <Loader />;
  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col md={{ span: 8, offset: 16 }} xs={{ span: 24 }} sm={{ span: 24 }}>
          <Select
            style={{ width: "100%" }}
            showSearch
            className="select-news"
            placeholder="Select a news category"
            optionFilterProp="children"
            onChange={(value) => setCategory(value)}
            filterOption={(input, option) => {
              console.log(input, option);
              return (
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              );
            }}
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((coin) => (
              <Option value={coin.name}>{coin.name}</Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews.value.map((news, i) => {
        return (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                    {news.name}
                  </Title>
                  <img
                    src={news?.image?.thumbnail?.contentUrl || demoImageUrl}
                    alt="img"
                    style={{ maxHeight: "80px" }}
                  />
                </div>
                <p>
                  {news.description > 100
                    ? `${news.description.substring(0, 50)} ...`
                    : news.description}
                </p>

                <div className="provider-container">
                  <Avatar
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImageUrl
                    }
                    alt="img"
                  />
                  <Text className="provider-name">
                    {news.provider[0]?.name}
                  </Text>
                  <Text>
                    {moment(news.datePublished).startOf("ss").fromNow()}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default News;
