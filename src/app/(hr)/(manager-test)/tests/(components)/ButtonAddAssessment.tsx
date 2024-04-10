"use client";
import ModalAddAssessment from "@/app/(hr)/(manager-test)/tests/(components)/ModalAddAssessment";
import { Button, Modal } from "antd";
import Image from "next/image";
import React, { useState } from "react";

const ButtonAddAssessment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        style={{
          display: "flex",
          padding: "4px 8px",
        }}
        onClick={showModal}
        icon={<Image src={"/filled.png"} alt="add" width={24} height={24} />}
      >
        Create new assessment
      </Button>
      <ModalAddAssessment
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default ButtonAddAssessment;
