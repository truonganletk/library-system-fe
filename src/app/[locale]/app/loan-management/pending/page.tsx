"use client";
import { Loan } from "@/models/loan.model";
import { acceptLoan, getLoansByStatus } from "@/utils/apis/loan.api";
import { Button, Table, TableColumnType } from "antd";
import dayjs from "dayjs";
import * as React from "react";

export default function LoanPage() {
  const [loans, setLoans] = React.useState<Loan[]>([]);

  const fetchLoans = async () => {
    const response = await getLoansByStatus("pending");
    setLoans(response);
  };

  const handleAcceptLoan = async (id: number) => {
    try {
      await acceptLoan(id);
      fetchLoans();
    } catch (error) {
      console.log(error);
    }
  };

  const columns: TableColumnType<Loan>[] = [
    {
      title: "Book Title",
      dataIndex: "book.title",
      key: "book.title",
      render: (value, record) => <p>{record.book.title}</p>,
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
      render: (value) => <p>{dayjs(value).format("DD/MM/YYYY")}</p>,
    },
    {
      title: "Due Date",
      dataIndex: "due_date",
      key: "due_date",
      render: (value) => <p>{dayjs(value).format("DD/MM/YYYY")}</p>,
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (value, record) => (
        <Button type="primary" onClick={() => handleAcceptLoan(record.id)}>
          Accept
        </Button>
      ),
    },
  ];

  React.useEffect(() => {
    fetchLoans();
  }, []);

  return <Table dataSource={loans} columns={columns} />;
}
