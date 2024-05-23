"use client";
import { useAuth } from "@/contexts/auth/AuthContext";
import type { FormProps } from "antd";
import { Button, Flex, Form, Input, Spin, Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type FieldType = {
  username: string;
  password: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const RegisterForm: React.FC = () => {
  const { register, user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/app");
    }
  }, [router, user]);

  if (loading) {
    return (
      <Flex
        className="h-screen w-screen"
        justify="center"
        align="center"
        gap="middle"
      >
        <Spin size="large" />
      </Flex>
    );
  }

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    register(values.username, values.password);
  };

  return (
    <Flex className="h-screen flex flex-col items-center justify-center">
      <Typography.Title level={2}>Register</Typography.Title>
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

        <Form.Item className="flex justify-center">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Typography.Text>
        Already have an account?{" "}
        <Link href="/login" passHref>
          <Typography.Link>Login</Typography.Link>
        </Link>
      </Typography.Text>
    </Flex>
  );
};

export default RegisterForm;
