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
      title="Create New Book"
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
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input your title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Author"
          name="author"
          rules={[{ required: true, message: "Please input your author!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Publisher"
          name="publisher"
          rules={[{ required: true, message: "Please input your publisher!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Year"
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
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please input your description!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Genre"
          name="genre"
          rules={[{ required: true, message: "Please input your genre!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="status"
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
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
