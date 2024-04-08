"use client";
import React from "react";
import { Button, Checkbox, Form, type FormProps, Input } from "antd";

import Link from "next/link";
type FieldType = {
  email?: string;
  password?: string;
};
const LoginPage = () => {
  const [form] = Form.useForm();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
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
          <Input onChange={handleChangeInput} placeholder="example@gmail.com" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Button className="w-full" type="primary" htmlType="submit">
          Login
        </Button>
      </Form>
      <Link href={"/forgot-password"} className="ml-auto">
        <span className="text-secondary text-lg font-normal text-left underline">
          Forgot password?
        </span>
      </Link>
    </>
    //   </div>
    // </div>
  );
};

export default LoginPage;
