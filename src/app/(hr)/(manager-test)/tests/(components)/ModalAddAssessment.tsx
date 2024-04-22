import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { Button, Form, type FormProps, Input, DatePicker } from "antd";
import CustomSelect from "@/app/(hr)/(manager-test)/tests/(components)/SelectTest";
import SelectPosition from "@/app/(hr)/(manager-test)/tests/(components)/SelectPosition";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import dayjs from "dayjs";
import { listTestRequest } from "@/apiRequest/test";
import { TDataCreateassessment, game } from "@/types/listAssessment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Loading from "@/components/views/Loading";
const { RangePicker } = DatePicker;
interface TProps {
  isModalOpen: boolean;
  handleCancel: () => void;
}

const ModalAddAssessment = (props: TProps) => {
  const handleCreateAssessment = async (data: FormData) => {
    const res = await listTestRequest.createAssessment(data);
    return res.data.data.item;
  };
  const createAssessmentMutation = useMutation({
    mutationFn: handleCreateAssessment,
  });
  const [form] = Form.useForm();
  const [formChild] = Form.useForm();
  const { isModalOpen, handleCancel } = props;
  const queryClient = useQueryClient();
  const onFinish: FormProps["onFinish"] = async (values) => {
    console.log("🚀 ~ constonFinish:FormProps= ~ values:", values);
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
    const valueNumberCheck: number[] = valueCheck.map((item) => Number(item)); //game_id

    const data: TDataCreateassessment = {
      name: values.name,
      job_function: jobFunction,
      job_position: jobPosition,
      game: game,
      start_date: date[0],
      end_date: date[1],
    };

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("job_function", data.job_function);
    formData.append("job_position", data.job_position);
    formData.append("start_date", data.start_date);
    formData.append("end_date", data.end_date);
    data.game.map((item: any, index) => {
      formData.append(`game[${index}][game_id]`, item.game_id.toString());
      formData.append(`game[${index}][option]`, item.option);
    });
    createAssessmentMutation.mutate(formData, {
      onSuccess: async (res) => {
        toast.success("Tạo thành công");
        onReset();
        handleCancel();
        setValueCheck([]);
        setValueChilrenCheck([]);
        queryClient.invalidateQueries({
          queryKey: ["listAssessment"],
        });
      },
    });
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
  const [game, setGame] = useState<game[]>([]);

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
          game={game}
          setGame={setGame}
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
            {createAssessmentMutation.isPending ? (
              <Loading></Loading>
            ) : (
              "Create"
            )}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddAssessment;
