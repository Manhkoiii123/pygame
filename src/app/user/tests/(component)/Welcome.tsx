"use client";

import { authRequest } from "@/apiRequest/auth";
import { userRequest } from "@/apiRequest/user";
import Loading from "@/components/views/Loading";
import { sessionTokenUser } from "@/lib/axios/customSession";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
interface TValues {
  email: string;
}
interface TProps {
  cookie: string | undefined;
  token: string;
}
const Welcome = (props: TProps) => {
  const { cookie, token } = props;
  useEffect(() => {
    const handleDeleteCookie = async () => {
      try {
        await authRequest.logoutUser();
      } catch (error) {
        console.error("Error setting email:", error);
      }
    };
    if (cookie) {
      handleDeleteCookie();
    }
  }, [cookie]);
  const [form] = Form.useForm();
  const router = useRouter();
  const handleUserLogin = async ({
    data,
    token,
  }: {
    data: FormData;
    token: string;
  }) => {
    const res = await userRequest.userLogin({ data, token });
    return res.data.data;
  };
  const userLoginMutation = useMutation({
    mutationFn: handleUserLogin,
  });
  const onFinish = async (values: TValues) => {
    const data = new FormData();
    data.append("email", values.email);
    userLoginMutation.mutate(
      { data, token },
      {
        onSuccess: async (res) => {
          sessionTokenUser.value = res?.access_token;
          toast.success("Đăng nhập thành công");
          try {
            await authRequest.setCookie(res?.access_token!);
          } catch (error) {
            console.error("Error setting email:", error);
          }
          router.push(`/user/tests/home`);
        },
        onError: (res: any) => {
          toast.error(res?.response.data.message);
        },
      }
    );
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
        <div className="shadow-[0px_0px_48px_-8px_#0000001A] sm:w-[500px] w-[300px] flex items-center justify-center rounded-lg">
          <Image
            src={"/banner.png"}
            alt="image_banner"
            width={400}
            height={250}
            className="w-[90%] sm:w-[400px] object-cover"
          />
        </div>
        <div className="sm:w-[500px] w-[400px] text-primary mt-3 flex flex-col gap-2">
          <div className="text-center flex flex-col gap-2">
            <span className="sm:text-5xl text-3xl font-semibold">
              Welcome to Shopee assessment
            </span>
            <span className="text-base mt-3 font-normal ">
              Thanks for your interest in this position! Please enter your email
              adress to access the assessment.
            </span>
          </div>
          <div className="sm:w-[500px] w-[400px]">
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
                  {userLoginMutation.isPending ? <Loading /> : "Submit"}
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
