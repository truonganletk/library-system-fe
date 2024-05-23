"use client";
import { createLoan } from "@/utils/apis/loan.api";
import type { FormProps } from "antd";
import { Button, DatePicker, Form, Input, Modal, notification } from "antd";
import { useTranslation } from "react-i18next";

const { RangePicker } = DatePicker;

export interface IBorrowBookModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  book_id?: number;
  book_title?: string;
}

type FieldType = {
  dates: [Date, Date];
};

const { useForm } = Form;

export default function BorrowBookModal({
  isModalOpen,
  onClose,
  book_id,
  book_title,
}: IBorrowBookModalProps) {
  const [form] = useForm<FieldType>();
  const { t } = useTranslation();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const data = {
        start_date: new Date(values.dates[0]),
        due_date: new Date(values.dates[1]),
        book_id,
      };
      await createLoan(data);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  if (!book_id || !book_title) return null;

  return (
    <Modal
      title={t("modal.borrow_book")}
      open={isModalOpen}
      onCancel={onClose}
      footer={[]}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label={t("modal.book_title")}
          name="book_title"
          initialValue={book_title}
        >
          <Input value={book_title} readOnly />
        </Form.Item>

        <Form.Item label={t("modal.date")} name="dates">
          <RangePicker />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {t("modal.submit")}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
