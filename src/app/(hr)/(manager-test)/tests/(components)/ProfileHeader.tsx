"use client";
import { authHrRequest } from "@/apiRequest/hr/auth";
import { authRequest } from "@/apiRequest/hrAuth";
import MenuDropdown from "@/app/(hr)/(manager-test)/tests/[testId]/(components)/MenuDropdown";
import { AppContext } from "@/lib/context.wrapper";

import { TDropdown } from "@/types/dropdown";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, FormProps, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
type FieldType = {
  password?: string;
  new_password?: string;
  new_password_confirmation?: string;
};
const ProfileHeader = () => {
  const router = useRouter();
  const { profile, reset } = useContext(AppContext);
  const [open, setOpen] = useState<boolean>(false);
  const logoutMutation = useMutation({
    mutationFn: () => authHrRequest.logout(),
    onSuccess: async () => {
      reset();
      await authRequest.logoutDeleteCookie();
      router.push("/login");
    },
  });
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  const changePasswordReq = async (data: FormData) => {
    const res = await authHrRequest.changePassword(data);
    return res.data.data;
  };
  const changePasswordMutation = useMutation({
    mutationFn: (data: FormData) => changePasswordReq(data),
  });
  const dropdownInvite: TDropdown[] = [
    {
      key: "1",
      label: "Logout",
      onClick: () => {
        handleLogout();
      },
    },
    {
      key: "2",
      label: "Change password",
      onClick: () => {
        setOpen(true);
      },
    },
  ];
  const [form] = useForm();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const data = new FormData();
    data.append("password", values.password!);
    data.append("new_password", values.new_password!);
    data.append("new_password_confirmation", values.new_password_confirmation!);
    changePasswordMutation.mutate(data, {
      onSuccess: (res) => {
        setOpen(false);
        form.resetFields();
        toast.success("Cập nhật thành công");
      },
      onError: (err: any) => {
        form.setFields([
          {
            name: "password",
            errors: [err?.response?.data?.message],
          },
        ]);
      },
    });
  };
  const handleChangeInput = () => {
    form.setFields([
      {
        name: "password",
        errors: [],
      },
      {
        name: "new_password_confirmation",
        errors: [],
      },
    ]);
  };
  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };
  return (
    <div className="flex items-center justify-center gap-2">
      <span className="text-[20px] leading-[28px] font-medium  text-secondary">
        {profile?.email}
      </span>

      <MenuDropdown items={dropdownInvite}>
        <Image
          src={"/avatar.png"}
          width={50}
          height={50}
          alt="avatar"
          className="rounded-full cursor-pointer"
        />
      </MenuDropdown>
      <Modal
        title={
          <span className="text-2xl text-primary font-medium mb-10">
            Change password
          </span>
        }
        open={open}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          style={{ maxWidth: "100%" }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<FieldType>
            label={
              <span className="text-base text-primary font-normal">
                Type your current password
              </span>
            }
            name="password"
          >
            <Input.Password onChange={handleChangeInput} />
          </Form.Item>

          <Form.Item<FieldType>
            label={
              <span className="text-base text-primary font-normal">
                Type your current password
              </span>
            }
            name="new_password"
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<FieldType>
            label={
              <span className="text-base text-primary font-normal">
                Retype your new password
              </span>
            }
            name="new_password_confirmation"
            dependencies={["new_password"]}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("new_password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The confirm pasword that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password onChange={handleChangeInput} />
          </Form.Item>

          <Form.Item>
            <Button className="w-full" type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProfileHeader;
