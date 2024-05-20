"use client";
import { getUsers } from "@/utils/apis/user.api";
import { Table } from "antd";
import * as React from "react";

export interface IUserPageProps {}

export default function UserPage(props: IUserPageProps) {
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers();
      setUsers(response);
    };
    fetchUsers();
  }, []);

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
