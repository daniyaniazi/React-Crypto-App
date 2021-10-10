import React, { useEffect, useState } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import {
  HomeOutlined,
  BulbOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import icon from "../images/cryptocurrency.png";

const NavBar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);
  // GET WIDTH OF SCREEN
  const handleResize = () => {
    setScreenSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);
  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">CryptoVerse</Link>
        </Typography.Title>
        <Button
          shape="circle"
          type="primary"
          size="large"
          className="menu-control-container"
          onClick={() => {
            if (screenSize < 768) {
              setActiveMenu(!activeMenu);
            }
          }}
        >
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && (
        <Menu theme="dark">
          <Menu.Item
            icon={<HomeOutlined />}
            onClick={() => {
              if (screenSize < 768) {
                setActiveMenu(!activeMenu);
              }
            }}
          >
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item
            icon={<FundOutlined />}
            onClick={() => {
              if (screenSize < 768) {
                setActiveMenu(!activeMenu);
              }
            }}
          >
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          </Menu.Item>

          <Menu.Item
            icon={<MoneyCollectOutlined />}
            onClick={() => {
              if (screenSize < 768) {
                setActiveMenu(!activeMenu);
              }
            }}
          >
            <Link to="/exchanges">Exchanges</Link>
          </Menu.Item>
          <Menu.Item
            icon={<BulbOutlined />}
            onClick={() => {
              if (screenSize < 768) {
                setActiveMenu(!activeMenu);
              }
            }}
          >
            <Link to="/news">News</Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};

export default NavBar;
