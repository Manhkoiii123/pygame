"use client";
import { Button, Divider, Modal, Upload, UploadProps, message } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import * as XLSX from "xlsx";
interface TProps {
  openUploadModal: boolean;
  handleCloseModalUpload: () => void;
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
  const [dataExcel, setDataExcel] = useState<TFile[]>([]);
  // 0 là ch up
  // 1 là đang up
  // 2 là đã up thành công
  // -1 up thất bại
  const [statusUpload, setStatusUpload] = useState<number>(0);
  const [fileName, setFileName] = useState<string>("");
  const { openUploadModal, handleCloseModalUpload } = props;

  const dummyRequest = (options: UploadRequestOption<any>) => {
    const { file, onSuccess } = options;
    setTimeout(() => {
      onSuccess("ok");
    }, 1000);
  };
  const propsUpload: UploadProps = {
    name: "file",
    multiple: false,
    maxCount: 1,
    accept:
      ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
    customRequest: dummyRequest as any,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        setStatusUpload(1);
        if (info.fileList && info.fileList.length > 0) {
          const file = info.fileList[0].originFileObj as File;
          setFileName(file.name);
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
            // cái kiểu dữ liệu của cái này sẽ là cái mà cần up lên chắc chỉ có mỗi email ko thôi
            if (json && json.length > 0) setDataExcel(json as TFile[]);
          };
        }
      } else if (status === "error") {
        setStatusUpload(-1);
        message.error(`${info.file.name} file upload failed.`);
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
      onCancel={handleCloseModalUpload}
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
      {dataExcel.length > 0 && (
        <div className="mt-4 flex flex-col border border-1 border-gray-300 p-4 rounded-lg h-[200px] overflow-y-auto">
          <span className="font-medium text-base text-primary">
            File Upload
          </span>
          <Divider />
          <div className="grid grid-cols-2 gap-2">
            {dataExcel.map((item, index) => {
              return (
                <div key={index} className="flex items-center gap-4">
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
