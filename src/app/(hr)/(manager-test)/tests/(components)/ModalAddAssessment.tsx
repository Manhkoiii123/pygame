import { Modal, Select } from "antd";
import React, { useRef, useState } from "react";
import { Button, Form, type FormProps, Input, DatePicker } from "antd";
import CustomSelect from "@/app/(hr)/(manager-test)/tests/(components)/SelectTest";

const { RangePicker } = DatePicker;
interface TProps {
  isModalOpen: boolean;
  handleCancel: () => void;
}

const ModalAddAssessment = (props: TProps) => {
  const [form] = Form.useForm();
  const { isModalOpen, handleCancel } = props;
  const onFinish: FormProps["onFinish"] = (values) => {
    console.log("Success:", values);
  };
  const handleChangeInput = () => {
    form.setFields([
      {
        name: "email",
        errors: [],
      },
    ]);
  };
  const [selectedOption, setSelectedOption] = useState<string[]>([]);
  const handleSelectChange = (e: string[]) => {
    setSelectedOption(e);
  };

  return (
    <Modal
      title={
        <span className="font-semibold text-3xl">Create new assessmanent</span>
      }
      onCancel={() => {
        handleCancel();
      }}
      open={isModalOpen}
      footer={null}
    >
      <Form
        name="basic"
        form={form}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Your assessment name"
          name="username"
          validateTrigger="onSubmit"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input onChange={handleChangeInput} placeholder="Enter your name" />
        </Form.Item>
        <CustomSelect onChange={handleSelectChange} value={selectedOption} />
        <Form.Item
          label="Hiring position"
          name="hiringPosition"
          rules={[{ required: true, message: "Please select positions!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Assessment date"
          name="date"
          rules={[{ required: false }]}
        >
          <RangePicker className="w-full" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" className="w-full" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddAssessment;
