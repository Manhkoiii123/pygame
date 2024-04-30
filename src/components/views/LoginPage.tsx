"use client";
import React, { useContext } from "react";
import { Button, Form, type FormProps, Input } from "antd";
import Link from "next/link";
import { authHrRequest } from "@/apiRequest/hr/auth";
import { AuthResponse, TLogin, User } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Loading from "@/components/views/Loading";
import { AppContext } from "@/lib/context.wrapper";
import { authRequest } from "@/apiRequest/hrAuth";
import { setAccessTokenFromLs, setProfileFromLS } from "@/utils/auth/auth";
import { sessionTokenHr } from "@/lib/axios/customSession";

type FieldType = {
  email?: string;
  password?: string;
};
const LoginPage = () => {
  const loginMutation = useMutation({
    mutationFn: (body: TLogin) => authHrRequest.login(body),
  });

  const { setProfile, setIsAuthenticate } = useContext(AppContext);
  const router = useRouter();
  const [form] = Form.useForm();
  const onFinish: FormProps["onFinish"] = async (values: TLogin) => {
    const data: TLogin = {
      email: values.email,
      password: values.password,
    };
    loginMutation.mutate(data, {
      onSuccess: async (res) => {
        toast.success(res.data.message);
        setProfile(res?.data?.data as User);
        setIsAuthenticate(true);
        setProfileFromLS(res?.data?.data);
        setAccessTokenFromLs(res?.data?.data.access_token);
        sessionTokenHr.value = res?.data?.data.access_token;
        await authRequest.setAccessToken(
          res?.data?.data.access_token as string
        );
        router.push("/tests");
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message);
      },
    });
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

          <Button
            className="w-full mt-1 mx-auto"
            type="primary"
            htmlType="submit"
          >
            {loginMutation.isPending ? <Loading /> : "Login"}
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
