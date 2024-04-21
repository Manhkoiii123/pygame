import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { Button, Form, type FormProps, Input, DatePicker } from "antd";
import CustomSelect from "@/app/(hr)/(manager-test)/tests/(components)/SelectTest";
import SelectPosition from "@/app/(hr)/(manager-test)/tests/(components)/SelectPosition";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;
interface TProps {
  isModalOpen: boolean;
  handleCancel: () => void;
}

const ModalAddAssessment = (props: TProps) => {
  const [form] = Form.useForm();
  const [formChild] = Form.useForm();
  const { isModalOpen, handleCancel } = props;

  const onFinish: FormProps["onFinish"] = (values) => {
    const jobFunction = values.positionRecruiting[0];
    let jobPosition;
    if (jobFunction !== "Other") {
      jobPosition = values.positionRecruiting[1].split(" ").splice(1).join(" ");
    } else {
      jobPosition = values.otherPosition;
    }
    const date = values.date.map((item: any) => {
      const formattedDate = item
        ? dayjs(item).format("DD-MM-YYYY HH:mm:ss")
        : dayjs().format("DD-MM-YYYY HH:mm:ss");
      return formattedDate;
    });
    const data = {
      name: values.name,
      job_function: jobFunction,
      job_position: jobPosition,
      games: valueCheck,
      options: valueChildrenCheck,
      startDate: date[0],
      endDate: date[1],
    };
    console.log("🚀 ~ ModalAddAssessment ~ data:", data);
  };
  const handleChangeInput = () => {
    form.setFields([
      {
        name: "username",
        errors: [],
      },
    ]);
  };
  const onReset = () => {
    form.resetFields();
    formChild.resetFields();
  };
  const handleOnChangeSelectTests = (value: string) => {
    form.setFieldValue("selectedOption", value);
  };
  const [selectedOption, setSelectedOption] = useState<string[]>([]);
  const [valueRadio, setValueRadio] = useState<string>("");
  const [valueCheck, setValueCheck] = useState<CheckboxValueType[]>([]);
  const [valueChildrenCheck, setValueChilrenCheck] = useState<string[]>([]);
  //senior
  const [jobPosition, setJobPosition] = useState<string>("");
  // developer
  const [jobFunction, setJobFunction] = useState<string>("");

  return (
    <Modal
      title={
        <span className="font-semibold text-3xl">Create new assessmanent</span>
      }
      onCancel={() => {
        onReset();
        handleCancel();
        setValueCheck([]);
        setValueChilrenCheck([]);
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
          name="name"
          validateTrigger="onSubmit"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input onChange={handleChangeInput} placeholder="Enter your name" />
        </Form.Item>
        <CustomSelect
          valueCheck={valueCheck}
          setValueCheck={setValueCheck}
          formChild={formChild}
          valueRadio={valueRadio}
          setValueRadio={setValueRadio}
          handleOnChangeSelectTests={handleOnChangeSelectTests}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          valueChildrenCheck={valueChildrenCheck}
          setValueChilrenCheck={setValueChilrenCheck}
        />
        <SelectPosition
          setJobPosition={setJobPosition}
          jobPosition={jobPosition}
          jobFunction={jobFunction}
          setJobFunction={setJobFunction}
        />
        <Form.Item
          label="Assessment date"
          name="date"
          rules={[{ required: false }]}
        >
          <RangePicker format={"DD-MM-YYYY"} className="w-full" />
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
