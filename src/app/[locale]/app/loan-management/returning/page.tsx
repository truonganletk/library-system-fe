"use client";
import { Loan } from "@/models/loan.model";
import { acceptLoan, getLoansByStatus } from "@/utils/apis/loan.api";
import { Button, Table, TableColumnType } from "antd";
import dayjs from "dayjs";
import * as React from "react";
import { useTranslation } from "react-i18next";

export default function LoanPage() {
  const [loans, setLoans] = React.useState<Loan[]>([]);
  const { t } = useTranslation();

  const fetchLoans = async () => {
    const response = await getLoansByStatus("returning");
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
      title: t("table.book_title"),
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
      title: t("table.start_date"),
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
      title: t("table.due_date"),
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
      title: t("table.actions"),
      dataIndex: "id",
      key: "id",
      render: (value, record) => (
        <Button type="primary" onClick={() => handleAcceptLoan(record.id)}>
          {t("accept")}
        </Button>
      ),
    },
  ];

  React.useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <div>
      <Table dataSource={loans} columns={columns} />
    </div>
  );
}
