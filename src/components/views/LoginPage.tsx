"use client";
import React from "react";
import { Button, Form, type FormProps, Input } from "antd";

import Link from "next/link";
import { authHrRequest } from "@/apiRequest/hr/auth";
import { TLogin } from "@/types/auth";
import { BASE_URL } from "@/utils/axios/customize";
type FieldType = {
  email?: string;
  password?: string;
};
const LoginPage = () => {
  const [form] = Form.useForm();
  const onFinish: FormProps["onFinish"] = async (values: TLogin) => {
    // console.log(BASE_URL);
    const data: TLogin = {
      email: values.email,
      password: values.password,
    };
    const res = await authHrRequest.login(data);
    console.log("🚀 ~ constonFinish:FormProps", res);
  };

  const handleChangeInput = () => {
    form.setFields([
      {
        name: "email",
        errors: [],
      },
    ]);
  };

  return (
    <>
      <span className="font-semibold text-[40px] leading-[56px] flex items-center justify-center gap-2">
        <span className="text-primary">Welcome To </span>
        <span className="text-secondary">Pytalent</span>
      </span>
      <div className="w-[70%] flex flex-col gap-8">
        <Form
          form={form}
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            validateTrigger="onSubmit"
            rules={[
              {
                type: "email",
                message: "Email address is invalid",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input
              onChange={handleChangeInput}
              placeholder="example@gmail.com"
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Button className="w-full mt-1" type="primary" htmlType="submit">
            Login
          </Button>
        </Form>
        <Link href={"/forgot-password"} className="ml-auto">
          <span className="text-secondary text-lg font-normal text-left underline">
            Forgot password?
          </span>
        </Link>
      </div>
    </>
  );
};

export default LoginPage;
