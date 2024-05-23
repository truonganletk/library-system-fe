"use client";
import { Loan, LoanStatus } from "@/models/loan.model";
import { getLoansByStatus } from "@/utils/apis/loan.api";
import { capitalizeFirstLetter } from "@/utils/string";
import { Select, Table, TableColumnType } from "antd";
import dayjs from "dayjs";
import * as React from "react";

export default function LoanPage() {
  const [loans, setLoans] = React.useState<Loan[]>([]);

  React.useEffect(() => {
    const fetchLoans = async () => {
      const response = await getLoansByStatus("all");
      setLoans(response);
    };
    fetchLoans();
  }, []);

  const handleChange = (value: LoanStatus | "all") => {
    const fetchLoans = async () => {
      const response = await getLoansByStatus(value);
      setLoans(response);
    };
    fetchLoans();
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
  ];

  return (
    <div>
      <div className="flex flex-row justify-end mb-4">
        <Select
          onChange={handleChange}
          defaultValue="all"
          style={{ width: 120 }}
        >
          <Select.Option value="all">All</Select.Option>
          {Object.values(LoanStatus).map((status) => (
            <Select.Option key={status} value={status}>
              {capitalizeFirstLetter(status)}
            </Select.Option>
          ))}
        </Select>
      </div>
      <Table dataSource={loans} columns={columns} />
    </div>
  );
}
