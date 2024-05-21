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
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { user, logout, loading } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const pathname = usePathname();

  React.useEffect(() => {
    if (user) {
      router.push("/app/user");
    } else {
      router.push("/login");
    }
  }, [user, router]);

  const items = React.useMemo<MenuItem[]>(() => {
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
        onClick: () => {
          if (children) return;
          router.push(`/app/${key}`);
        },
      } as MenuItem;
    }
    return [
      getItem("User", "user", <UserOutlined />),
      getItem("Book", "book", <PieChartOutlined />),
      getItem("Loan History", "loan-history", <DesktopOutlined />),
      getItem("Loan Management", "loan-management", <FileOutlined />, [
        getItem("All Loans", "loan-management/all"),
        getItem("Pending Loans", "loan-management/pending"),
        getItem("Returning Loans", "loan-management/returning"),
        getItem("Overdue Loans", "loan-management/overdue"),
      ]),
    ];
  }, [router]);

  const selectedKey: string[] = React.useMemo(() => {
    if (pathname) {
      return [
        items
          .find((item) => item?.key === pathname.split("/")[2])
          ?.key?.toString() || "user",
      ];
    }
    return ["user"];
  }, [items, pathname]);

  if (!user && loading) {
    return (
      <Flex
        className="h-screen w-screen"
        justify="center"
        align="center"
        gap="middle"
      >
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
          selectedKeys={selectedKey}
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
            <Typography.Text>
              {user?.username} ({user?.role})
            </Typography.Text>
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
            {pathname &&
              pathname
                .replace("/", "")
                .split("/")
                .map((item) => (
                  <Breadcrumb.Item key={item}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Breadcrumb.Item>
                ))}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Library System ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
}
