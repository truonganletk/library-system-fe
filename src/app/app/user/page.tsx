"use client";
import { useAuth } from "@/contexts/auth/AuthContext";
import { UserRole } from "@/models/user.model";
import { getUsers } from "@/utils/apis/user.api";
import { Flex, Table } from "antd";
import * as React from "react";

export interface IUserPageProps {}

export default function UserPage(props: IUserPageProps) {
  const { user } = useAuth();
  const [users, setUsers] = React.useState([]);

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
      title: "Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ];

  return (
    <div>
      <Table dataSource={users} columns={columns} />
    </div>
  );
}
