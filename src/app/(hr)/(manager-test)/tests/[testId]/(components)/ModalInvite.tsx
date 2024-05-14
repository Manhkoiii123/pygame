/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { listTestRequest } from "@/apiRequest/test";
import ModalUpload from "@/app/(hr)/(manager-test)/tests/[testId]/(components)/ModalUpload";
import Loading from "@/components/views/Loading";
import { useMutation } from "@tanstack/react-query";
import { Button, Modal, Select, Tag, message } from "antd";
import Image from "next/image";
import React, { use, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  token: string | undefined;
  keyOpen: string;
};
const ModalInvite = (props: TProps) => {
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Link was copied",
      duration: 1,
    });
  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Copy failed",
      duration: 1,
    });
  };
  const { open, setOpen, id, token, keyOpen } = props;

  const [email, setEmail] = useState<string[]>([]);
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [errorEmail, setErrorEmail] = useState<string[]>([]);
  const [emailInvalid, setEmailInvalid] = useState<string[]>([]);
  const [openUploadModal, setOpenUploadModal] = useState<boolean>(false);
  const isEmailValid = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const customTagRender = ({ label }: { label: any }) => {
    return (
      <div
        style={{ marginRight: 3 }}
        className={`flex gap-2 items-center border rounded-lg px-2 py-1 ${
          errorEmail.includes(label) || emailInvalid.includes(label)
            ? "border-red-400"
            : "border-gray-400"
        } `}
      >
        {label}
        <div onClick={() => handleDeselect(label)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
    );
  };

  const handleChange = (value: string[]) => {
    const emailInput = String(value[value.length - 1]);
    setEmail((prev) => [...prev, emailInput]);
  };

  const handleCopy = () => {
    if (inputRef?.current) {
      navigator.clipboard
        .writeText(inputRef?.current?.value)
        .then(() => {
          success();
        })
        .catch(() => {
          error();
        });
    }
  };
  useEffect(() => {
    const originalUrl = window.location.href;
    const newUrl =
      originalUrl.replace(`/tests/${id}`, "/user/tests") + `?token=${token!}`;

    setCurrentUrl(newUrl);
  }, []);

  const handleDeselect = (value: string) => {
    const newEmail = email.filter((item) => item !== value);
    const newErrorEmail = errorEmail.filter((item) => item !== value);
    const newEmailInvalid = emailInvalid.filter((item) => item !== value);
    setEmail(newEmail);
    setErrorEmail(newErrorEmail);
    setEmailInvalid(newEmailInvalid);
  };
  const handleOpenUpload = () => {
    setOpen(false);
    setOpenUploadModal(true);
  };
  const handleCloseModalUpload = () => {
    setOpen(true);
    setOpenUploadModal(false);
  };
  const handleInviteRequest = async (data: FormData) => {
    const res = await listTestRequest.inviteCandicate(data);
    return res;
  };
  const handleCheckEmailRequest = async (data: FormData) => {
    const res = await listTestRequest.CheckEmailCandicate(data);
    return res;
  };
  const inviteMutation = useMutation({
    mutationFn: handleInviteRequest,
  });
  const checkEmailMutation = useMutation({
    mutationFn: handleCheckEmailRequest,
  });
  const handleInvite = () => {
    const data = new FormData();
    data.append("assessment_id", id);
    data.append("type", keyOpen);
    const emailCorrect = email.filter((item) => {
      if (isEmailValid(item)) {
        return item;
      } else {
        setEmailInvalid((prev) => [...prev, item]);
      }
    });
    emailCorrect.map((item, index) => {
      data.append(`list_email[${index}]`, item);
    });
    checkEmailMutation.mutate(data, {
      onSuccess: (res) => {
        setErrorEmail(res.data.data.error_emails);
        if (res.data.data.error_emails.length === 0) {
          inviteMutation.mutate(data, {
            onSuccess: () => {
              setOpen(false);
              toast.success("Mời người dùng thành công");
              setEmail([]);
            },
          });
        }
      },
    });
  };
  return (
    <>
      {contextHolder}
      <Modal
        width={800}
        centered
        title={
          <span className="text-3xl font-semibold">
            Invite {keyOpen === "1" ? "Candicates" : "Employees"}
          </span>
        }
        open={open}
        onCancel={() => {
          setOpen(false);
          setEmail([]);
        }}
        footer={null}
      >
        <div className="flex items-center justify-between gap-2 my-4">
          <Select
            mode="tags"
            style={{ width: "100%", padding: "4px 0" }}
            onChange={handleChange}
            tokenSeparators={[","]}
            open={false}
            suffixIcon={null}
            value={email}
            placeholder="Please enter email"
            onDeselect={handleDeselect}
            tagRender={customTagRender}
          />
          <Button
            type="primary"
            className="w-[100px]"
            htmlType="button"
            onClick={handleInvite}
          >
            {inviteMutation.isPending ? <Loading /> : "Invite"}
          </Button>
        </div>
        <div className="pt-5">
          <span className="text-base font-medium text-primary">
            Share your assessment link
          </span>
          <div className="mt-4 flex gap-0 border-2 border-gray-200 rounded-lg px-[10px] items-center cursor-pointer">
            <input
              ref={inputRef}
              type="text"
              disabled
              value={currentUrl}
              className="w-full p-2 text-gray-400 rounded-lg"
            />
            <div className="rounded-lg " onClick={handleCopy}>
              <div
                className="flex items-center gap-1"
                style={{
                  width: "max-content",
                }}
              >
                <span className="text-base font-medium text-secondary">
                  Copy link
                </span>
                <Image
                  src={"/duplicate.png"}
                  alt="copy"
                  width={24}
                  height={24}
                ></Image>
              </div>
            </div>
          </div>
          <span className="block p-2 text-xs font-normal text-ink100">
            Only invited participants could assess the test
          </span>
        </div>
        <div className="flex items-center gap-2 py-4">
          <span className="text-base font-medium text-ink100">
            You can also import excel file for bulk list of email
          </span>
          <div
            onClick={handleOpenUpload}
            className="flex items-center gap-1 px-2 py-1 border rounded-lg cursor-pointer border-1 border-primary"
          >
            <span className="text-base fotn-font-medium text-pri500">
              Upload here
            </span>
            <Image
              src={"/upload.png"}
              alt="upload"
              width={24}
              height={24}
            ></Image>
          </div>
        </div>
      </Modal>
      <ModalUpload
        keyOpen={keyOpen}
        id={id}
        setOpen={setOpen}
        openUploadModal={openUploadModal}
        handleCloseModalUpload={handleCloseModalUpload}
      ></ModalUpload>
    </>
  );
};

export default ModalInvite;
