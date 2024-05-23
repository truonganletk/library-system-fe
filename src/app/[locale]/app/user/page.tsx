"use client";
import { useAuth } from "@/contexts/auth/AuthContext";
import { UserRole } from "@/models/user.model";
import { getUsers } from "@/utils/apis/user.api";
import { Flex, Table } from "antd";
import * as React from "react";
import { useTranslation } from "react-i18next";

export interface IUserPageProps {}

export default function UserPage(props: IUserPageProps) {
  const { user } = useAuth();
  const [users, setUsers] = React.useState([]);
  const { t } = useTranslation();

  React.useEffect(() => {
    const fetchUsers = async () => {
      if (user?.role === UserRole.USER) {
        return;
      }
      const response = await getUsers();
      setUsers(response);
    };
    fetchUsers();
  }, [user?.role]);

  if (user?.role === UserRole.USER) {
    return (
      <Flex className="text-red-500" justify="center" align="center">
        Do not have permission
      </Flex>
    );
  }

  const columns = [
    {
      title: t("table.name"),
      dataIndex: "username",
      key: "username",
    },
    {
      title: t("table.role"),
      dataIndex: "role",
      key: "role",
      render: (value: UserRole) => <p>{t(`role.${value}`)}</p>,
    },
  ];

  return (
    <div>
      <Table dataSource={users} columns={columns} />
    </div>
  );
}
