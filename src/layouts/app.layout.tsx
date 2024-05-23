"use client";
import LanguageChanger from "@/components/LanguageChanger";
import { useAuth } from "@/contexts/auth/AuthContext";
import { UserRole } from "@/models/user.model";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
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
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  React.useEffect(() => {
    if (user) {
      router.push("/app/book");
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
    const items: MenuItem[] = [
      getItem(t("menu.book"), "book", <PieChartOutlined />),
      getItem(t("menu.loan_history"), "loan-history", <DesktopOutlined />),
    ];

    if (user && user?.role !== UserRole.USER) {
      items.push(getItem(t("menu.user_management"), "user", <UserOutlined />));
      items.push(
        getItem(
          t("menu.loan_management"),
          "loan-management",
          <FileOutlined />,
          [
            getItem(t("menu.all_loans"), "loan-management/all"),
            getItem(t("menu.pending_loans"), "loan-management/pending"),
            getItem(t("menu.returning_loans"), "loan-management/returning"),
            getItem(t("menu.overdue_loans"), "loan-management/overdue"),
          ]
        )
      );
    }

    return items;
  }, [router, t, user]);

  const selectedKey: string[] = React.useMemo(() => {
    if (pathname) {
      return [
        items
          .find(
            (item) =>
              item?.key === pathname.split("/")[3] ||
              item?.key === pathname.split("/")[2]
          )
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
        width={300}
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
              {user?.username} ({t("role." + user?.role)})
            </Typography.Text>
            <Button
              type="primary"
              size="small"
              style={{ marginLeft: "10px" }}
              onClick={logout}
            >
              {t("logout")}
            </Button>
          </Flex>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div
            style={{
              marginTop: 16,
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              maxHeight: "80vh",
              overflowY: "scroll",
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          <p>
            {t("footer")} ©{new Date().getFullYear()}
          </p>
          <LanguageChanger />
        </Footer>
      </Layout>
    </Layout>
  );
}
