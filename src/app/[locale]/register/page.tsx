"use client";
import { useAuth } from "@/contexts/auth/AuthContext";
import type { FormProps } from "antd";
import { Button, Flex, Form, Input, Spin, Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
      <Typography.Title level={2}>{t("register")}</Typography.Title>
      <Form
        name="basic"
        style={{ maxWidth: 600, width: "100%" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item className="flex justify-center">
          <Button type="primary" htmlType="submit">
            {t("register")}
          </Button>
        </Form.Item>
      </Form>

      <Typography.Text>
        {t("already_have_account")}
        <Link href="/login" passHref>
          <Typography.Link>{t("login")}</Typography.Link>
        </Link>
      </Typography.Text>
    </Flex>
  );
};

export default RegisterForm;
