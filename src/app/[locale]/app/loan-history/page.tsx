"use client";
import { Loan, LoanStatus } from "@/models/loan.model";
import { getLoansByUser, returnLoan } from "@/utils/apis/loan.api";
import { capitalizeFirstLetter } from "@/utils/string";
import { Button, Table, TableColumnType } from "antd";
import dayjs from "dayjs";
import * as React from "react";
import { useTranslation } from "react-i18next";

export default function LoanPage() {
  const [loans, setLoans] = React.useState<Loan[]>([]);
  const { t } = useTranslation();
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
      title: t("table.status"),
      dataIndex: "status",
      key: "status",
      render(value) {
        return (
          <div>
            <p>{t(`loan_status.${value}`)}</p>
          </div>
        );
      },
    },
    {
      title: t("table.actions"),
      dataIndex: "id",
      key: "id",
      render: (value, record) => (
        <div>
          {record.status === LoanStatus.Borrowing && (
            <Button type="primary" onClick={() => handleReturnLoan(record.id)}>
              {t("return")}
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
