"use client";
import { BookStatus } from "@/models/book.model";
import { createBook } from "@/utils/apis/book.api";
import type { FormProps } from "antd";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Select,
} from "antd";
import { useTranslation } from "react-i18next";
export interface ICreateBookModalProps {
  isModalOpen: boolean;
  onClose: () => void;
}

type FieldType = {
  title: string;
  author: string;
  publisher: string;
  year: number;
  description: string;
  genre: string;
  status: BookStatus;
};

export default function CreateBookModal({
  isModalOpen,
  onClose,
}: ICreateBookModalProps) {
  const { t } = useTranslation();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      await createBook(values);
      notification.success({
        message: "Book created successfully",
        duration: 2,
      });
      onClose();
    } catch (error) {
      notification.error({
        message: "Book creation failed",
        description: "Please try again",
        duration: 2,
      });
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      title={t("modal.create_book")}
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
      >
        <Form.Item
          label={t("modal.title")}
          name="title"
          rules={[{ required: true, message: "Please input your title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t("modal.author")}
          name="author"
          rules={[{ required: true, message: "Please input your author!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t("modal.publisher")}
          name="publisher"
          rules={[{ required: true, message: "Please input your publisher!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t("modal.year")}
          name="year"
          rules={[
            { required: true, message: "Please input your year!" },
            {
              type: "number",
              message: "Please input a valid year!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label={t("modal.description")}
          name="description"
          rules={[
            { required: true, message: "Please input your description!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t("modal.genre")}
          name="genre"
          rules={[{ required: true, message: "Please input your genre!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={t("modal.status")}
          label="Status"
          rules={[{ required: true, message: "Please input your status!" }]}
        >
          <Select>
            {Object.values(BookStatus).map((status) => (
              <Select.Option key={status} value={status}>
                {status}
              </Select.Option>
            ))}
          </Select>
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
