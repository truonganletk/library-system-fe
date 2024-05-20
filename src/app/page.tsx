"use client";
import { useAuth } from "@/contexts/auth/AuthContext";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Breadcrumb,
  Button,
  Flex,
  Layout,
  Menu,
  Spin,
  theme,
  Typography,
} from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

export default function Home() {
  const route = useRouter();
  const { user, logout, loading } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    if (!user && !loading) {
      route.push("/login");
    }
  }, [user, route, loading]);

  if (!user && loading) {
    return (
      <Flex className="h-screen w-screen" justify="center" align="center" gap="middle">
        <Spin size="large" />
      </Flex>
    );
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Typography className="text-xl text-white uppercase text-center py-4">
          LS
        </Typography>

        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          className="flex justify-end items-center"
          style={{ padding: 0, background: colorBgContainer }}
        >
          <Flex
            style={{
              float: "right",
              padding: "0 15px",
            }}
          >
            <Typography.Text>{user?.username}</Typography.Text>
            <Button
              type="primary"
              size="small"
              style={{ marginLeft: "10px" }}
              onClick={logout}
            >
              Logout
            </Button>
          </Flex>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Bill is a cat.
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Library System ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
}
