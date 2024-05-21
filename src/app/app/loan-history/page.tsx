"use client";
import { Book } from "@/models/book.model";
import { Loan } from "@/models/loan.model";
import { getLoansByUser } from "@/utils/apis/loan.api";
import { Table, TableColumnType } from "antd";
import * as React from "react";
import dayjs from "dayjs";

export default function LoanPage() {
  const [loans, setLoans] = React.useState<Loan[]>([]);

  React.useEffect(() => {
    const fetchLoans = async () => {
      const response = await getLoansByUser();
      setLoans(response);
    };
    fetchLoans();
  }, []);

  const columns: TableColumnType<Loan>[] = [
    {
      title: "Book Title",
      dataIndex: "book.title",
      key: "book.title",
      render(value, record, index) {
        return (
          <div>
            <p>{record.book.title}</p>
          </div>
        );
      },
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
      render(value) {
        return (
          <div>
            <p>{dayjs(value).format("DD/MM/YYYY")}</p>
          </div>
        );
      },
    },
    {
      title: "Due Date",
      dataIndex: "due_date",
      key: "due_date",
      render(value) {
        return (
          <div>
            <p>{dayjs(value).format("DD/MM/YYYY")}</p>
          </div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <div>
      <Table dataSource={loans} columns={columns} />
    </div>
  );
}
