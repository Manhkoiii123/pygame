"use client";
import { authRequest } from "@/apiRequest/auth";
import { Button, Form, Input } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
interface TValues {
  email: string;
}
interface TProps {
  id: string;
}
const Welcome = (props: TProps) => {
  const { id } = props;
  const [form] = Form.useForm();
  const router = useRouter();
  const onFinish = async (values: TValues) => {
    try {
      await authRequest.setEmail(values.email);
    } catch (error) {
      console.error("Error setting email:", error);
    }
    router.push(`/user/tests/${id}/home`);
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
    <div>
      <div className="flex items-center justify-center flex-col">
        <div className="shadow-[0px_0px_48px_-8px_#0000001A] w-[500px] flex items-center justify-center rounded-lg">
          <Image
            src={"/banner.png"}
            alt="image_banner"
            width={400}
            height={250}
          />
        </div>
        <div className="w-[500px] text-primary mt-3 flex flex-col gap-2">
          <div className="text-center flex flex-col gap-2">
            <span className="text-5xl font-semibold">
              Welcome to Shopee assessment
            </span>
            <span className="text-base mt-3 font-normal ">
              Thanks for your interest in this position! Please enter your email
              adress to access the assessment.
            </span>
          </div>
          <div className="w-[500px]">
            <Form
              form={form}
              name="basic"
              validateTrigger="onSubmit"
              autoComplete="off"
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
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
                  className="p-2 border-[#DEDDDD] "
                  placeholder="example@gmail.com"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full bg-primary h-[44px] rounded-lg text-center text-white hover:bg-primary hover:text-white hover:shadow-none "
                >
                  Continue
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
// border: 1px solid #DEDDDD