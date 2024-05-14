/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { listTestRequest } from "@/apiRequest/test";
import { useMutation } from "@tanstack/react-query";
import { Divider, Modal, Progress, Upload, UploadProps, message } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
interface TProps {
  openUploadModal: boolean;
  handleCloseModalUpload: () => void;
  id: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  keyOpen: string;
}

type UploadRequestOption<T> = {
  file: File;
  onSuccess: (response: T) => void;
};
interface TFile {
  email: string;
}
const { Dragger } = Upload;
const ModalUpload = (props: TProps) => {
  const [errorEmail, setErrorEmail] = useState<string[]>([]);
  const [dataExcel, setDataExcel] = useState<TFile[]>([]);
  const [statusUpload, setStatusUpload] = useState<number | undefined>(0);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState<string>("");
  const { openUploadModal, handleCloseModalUpload, id, setOpen, keyOpen } =
    props;
  const handleInviteRequest = async (data: FormData) => {
    const res = await listTestRequest.inviteCandicate(data);
    return res;
  };
  const inviteMutation = useMutation({
    mutationFn: handleInviteRequest,
  });
  const handleCheckEmailRequest = async (data: FormData) => {
    const res = await listTestRequest.CheckEmailCandicate(data);
    return res;
  };
  const checkEmailMutation = useMutation({
    mutationFn: handleCheckEmailRequest,
  });
  const handleInvite = () => {
    const data = new FormData();
    data.append("assessment_id", id);
    data.append("type", keyOpen);
    dataExcel.map((item, index) => {
      data.append(`list_email[${index}]`, item.email);
    });
    checkEmailMutation.mutate(data, {
      onSuccess: (res) => {
        setErrorEmail(res.data.data.error_emails);
        if (res.data.data.error_emails.length === 0) {
          inviteMutation.mutate(data, {
            onSuccess: () => {
              setOpen(false);
              toast.success("Mời người dùng thành công");
            },
          });
        } else {
          setStatusUpload(-1);
        }
      },
    });
  };
  useEffect(() => {
    if (dataExcel && dataExcel.length > 0) handleInvite();
  }, [dataExcel]);

  const propsUpload: UploadProps = {
    name: "file",
    multiple: false,
    showUploadList: false,
    maxCount: 1,
    accept:
      ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",

    onChange(info) {
      const { status, percent } = info.file;
      const file = info.fileList[0].originFileObj as File;
      setFileName(file.name);
      if (status === "uploading") {
        setStatusUpload(1);
        setProgress(percent || 0);
      }
      if (status === "done") {
        setStatusUpload(2);
        if (info.fileList && info.fileList.length > 0) {
          const reader = new FileReader();
          reader.readAsArrayBuffer(file);
          reader.onload = function (e) {
            const data = new Uint8Array(reader.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: "array" });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const json = XLSX.utils.sheet_to_json(sheet, {
              header: ["email"],
              range: 1,
            });
            if (json && json.length > 0) setDataExcel(json as TFile[]);
          };
        }
      } else if (status === "error") {
        setStatusUpload(-1);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  return (
    <Modal
      footer={null}
      centered
      width={800}
      title={
        <span className="font-semibold text-3xl mb-8 block">
          Import participants email list
        </span>
      }
      open={openUploadModal}
      onCancel={() => {
        handleCloseModalUpload();
        setStatusUpload(0);
        setDataExcel([]);
        setFileName("");
      }}
    >
      <Dragger
        {...propsUpload}
        style={{
          backgroundColor: `${statusUpload === -1 ? "#FFF7F5" : "#F0F9FB"}`,
        }}
      >
        {statusUpload === 0 && (
          <div className="flex flex-col gap-2 items-center p-10">
            <p className="ant-upload-text">
              Drag and drop .xls or .xlsx file here or
            </p>
            <div className="bg-pri100 py-2 px-8 rounded-lg">
              <span className="text-secondary font-medium text-base">
                Select file
              </span>
            </div>
          </div>
        )}
        {statusUpload === 1 && (
          <div className="flex items-center flex-col gap-2">
            <span className="font-medium text-base text-primary">
              {fileName}
            </span>
            <Progress className="w-5/6" percent={progress} showInfo={false} />
          </div>
        )}
        {statusUpload === 2 && (
          <div className="flex items-center flex-col gap-2">
            <Image
              src="/uploadSuccess.png"
              alt="upload"
              width={60}
              height={60}
            />
            <span className="font-medium text-base text-primary">
              {fileName}
            </span>
            <span className="font-medium text-base text-secondary">
              Upload list participants successfully!
            </span>
          </div>
        )}
        {statusUpload === -1 && (
          <div className="flex items-center flex-col gap-2">
            <Image src="/uploadFail.png" alt="upload" width={60} height={60} />
            <span className="font-medium text-base text-primary">
              {fileName}
            </span>
            <span className="font-medium text-base text-[#DD0F05]">
              Upload failed, please try again!
            </span>
          </div>
        )}
      </Dragger>
      <span className="font-normal text-base text-primary mt-4 block">
        Your excel file upload must only contains collumn A for list of
        participants email, no header. Upload participants using your own file
        or{" "}
        <a
          onClick={(e) => e.stopPropagation()}
          href={"/data/template.xlsx"}
          download={"/data/template.xlsx"}
          className="text-secondary font-medium cursor-pointer"
        >
          Download sample file
        </a>
        .
      </span>
      {statusUpload === -1 && dataExcel.length > 0 && (
        <div className="mt-4 flex flex-col border border-1 border-gray-300 p-4 rounded-lg h-[200px] overflow-y-auto">
          <span className="font-medium text-base text-primary">
            File Upload
          </span>
          <Divider />
          <div className="grid grid-cols-2 gap-2">
            {dataExcel.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`flex items-center gap-4 ${
                    errorEmail.includes(item.email)
                      ? "text-red-500"
                      : "text-primary"
                  }`}
                >
                  <span>{index + 1}</span> - <span>{item.email}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ModalUpload;
