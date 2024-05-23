"use client";
import { Book } from "@/models/book.model";
import { Loan, LoanStatus } from "@/models/loan.model";
import { getLoansByUser, returnLoan } from "@/utils/apis/loan.api";
import { Button, Table, TableColumnType } from "antd";
import * as React from "react";
import dayjs from "dayjs";
import { capitalizeFirstLetter } from "@/utils/string";

export default function LoanPage() {
  const [loans, setLoans] = React.useState<Loan[]>([]);

  const fetchLoans = async () => {
    const response = await getLoansByUser();
    setLoans(
      response.sort(
        (a: Loan, b: Loan) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
    );
  };

  React.useEffect(() => {
    fetchLoans();
  }, []);

  const handleReturnLoan = async (id: number) => {
    try {
      await returnLoan(id);
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
      render(value) {
        return (
          <div>
            <p>{capitalizeFirstLetter(value)}</p>
          </div>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (value, record) => (
        <div>
          {record.status === LoanStatus.Borrowing && (
            <Button type="primary" onClick={() => handleReturnLoan(record.id)}>
              Return
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={loans} columns={columns} />
    </div>
  );
}
