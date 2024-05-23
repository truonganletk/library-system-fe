"use client";
import { Loan, LoanStatus } from "@/models/loan.model";
import { getLoansByStatus } from "@/utils/apis/loan.api";
import { Select, Table, TableColumnType } from "antd";
import dayjs from "dayjs";
import * as React from "react";
import { useTranslation } from "react-i18next";

export default function LoanPage() {
  const [loans, setLoans] = React.useState<Loan[]>([]);
  const { t } = useTranslation();

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
  ];

  return (
    <div>
      <div className="flex flex-row justify-end mb-4">
        <Select
          onChange={handleChange}
          defaultValue="all"
          style={{ width: 170 }}
        >
          <Select.Option value="all">{t("loan_status.all")}</Select.Option>
          {Object.values(LoanStatus).map((status) => (
            <Select.Option key={status} value={status}>
              {t(`loan_status.${status}`)}
            </Select.Option>
          ))}
        </Select>
      </div>
      <Table dataSource={loans} columns={columns} />
    </div>
  );
}
