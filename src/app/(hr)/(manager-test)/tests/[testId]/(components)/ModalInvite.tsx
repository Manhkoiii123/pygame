/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { listTestRequest } from "@/apiRequest/test";
import ModalUpload from "@/app/(hr)/(manager-test)/tests/[testId]/(components)/ModalUpload";
import Loading from "@/components/views/Loading";
import { useMutation } from "@tanstack/react-query";
import { Button, Modal, Select, message } from "antd";
import { Span } from "next/dist/trace";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  token: string | undefined;
  key: string;
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
  const { open, setOpen, id, token, key } = props;
  console.log("🚀 ~ ModalInvite ~ key:", key);
  const [email, setEmail] = useState<string[]>([]);
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [openUploadModal, setOpenUploadModal] = useState<boolean>(false);

  const isEmailValid = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const handleChange = (value: string[]) => {
    const emailInput = String(value[value.length - 1]);
    if (emailInput.length === 0) {
      console.log("Vui định nghĩa email");
    }
    if (isEmailValid(emailInput)) {
      setEmail((prev) => [...prev, emailInput]);
    } else {
      console.log("Vui định nghĩa email");
    }
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
    setEmail(newEmail);
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
  const inviteMutation = useMutation({
    mutationFn: handleInviteRequest,
  });
  const handleInvite = () => {
    const data = new FormData();
    data.append("assessment_id", id);
    data.append("type", "1");
    email.map((item, index) => {
      data.append(`list_email[${index}]`, item);
    });
    inviteMutation.mutate(data, {
      onSuccess: () => {
        setOpen(false);
        toast.success("Mời người dùng thành công");
        setEmail([]);
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
          <span className="font-semibold text-3xl">
            Invite {key === "1" ? <>participants</> : <>candicates</>}
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
          <span className="text-base text-primary font-medium">
            Share your assessment link
          </span>
          <div className="mt-4 flex gap-0 border-2 border-gray-200 rounded-lg px-[10px] items-center cursor-pointer">
            <input
              ref={inputRef}
              type="text"
              disabled
              value={currentUrl}
              className="p-2 w-full text-gray-400 rounded-lg"
            />
            <div className="rounded-lg " onClick={handleCopy}>
              <div
                className="flex items-center gap-1"
                style={{
                  width: "max-content",
                }}
              >
                <span className="text-secondary font-medium text-base">
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
          <span className="p-2 block text-xs font-normal text-ink100">
            Only invited participants could assess the test
          </span>
        </div>
        <div className="py-4 flex items-center gap-2">
          <span className="text-base text-ink100 font-medium">
            You can also import excel file for bulk list of email
          </span>
          <div
            onClick={handleOpenUpload}
            className="flex gap-1 items-center border border-1 border-primary px-2 py-1 rounded-lg cursor-pointer"
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
        id={id}
        setOpen={setOpen}
        openUploadModal={openUploadModal}
        handleCloseModalUpload={handleCloseModalUpload}
      ></ModalUpload>
    </>
  );
};

export default ModalInvite;
