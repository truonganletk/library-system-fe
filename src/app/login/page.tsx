"use client";
import { useAuth } from "@/contexts/auth/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Flex, Form, Input, Typography } from "antd";

type FieldType = {
  username: string;
  password: string;
  remember?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const LoginForm: React.FC = () => {
  const { login, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [router, user]);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    login(values.username, values.password, () => {});
  };

  return (
    <Flex className="h-screen flex flex-col items-center justify-center">
      <Typography.Title level={2}>Login</Typography.Title>
      <Form
        name="basic"
        labelCol={{ span: 5 }}
        style={{ maxWidth: 600, width: "100%" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 5, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item className="flex justify-center">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default LoginForm;
