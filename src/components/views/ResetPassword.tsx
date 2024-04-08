"use client";
import Link from "next/link";
import React from "react";
import { Button, Form, type FormProps, Input } from "antd";
type FieldType = {
  password?: string;
  confirmPassword?: string;
};
const ResetPassword = () => {
  const [form] = Form.useForm();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };
  return (
    <>
      <span className="font-semibold text-[40px] leading-[56px] flex items-center justify-center gap-2">
        <span className="text-primary">Reset password</span>
      </span>
      <div className="w-[70%] flex flex-col gap-8">
        <span>Please type a new password.</span>
        <Form
          form={form}
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              { required: true, message: "Please input your confirmPassword!" },
            ]}
          >
            <Input.Password placeholder="Enter your confirmPassword" />
          </Form.Item>

          <Button className="w-full mt-1" type="primary" htmlType="submit">
            Reset password
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
      </div>
    </>
  );
};

export default ResetPassword;
