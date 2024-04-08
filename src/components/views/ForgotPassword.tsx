"use client";
import React from "react";
import { Button, Checkbox, Form, type FormProps, Input } from "antd";

import Link from "next/link";
import { useRouter } from "next/navigation";
type FieldType = {
  email?: string;
};
const ForgotPassword = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    router.push("/check-email");
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
      <span className="block font-normal text-base pe-10">
        Enter your email address and we will send you instructions to reset your
        password.
      </span>
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

        <Button className="w-full" type="primary" htmlType="submit">
          Send reset email
        </Button>
      </Form>
      <Link href={"/login"} className="ml-auto">
        <span>
          Take me back to{" "}
          <span className="text-secondary text-lg font-normal text-left underline">
            Login
          </span>
        </span>
      </Link>
    </>
  );
};

export default ForgotPassword;
