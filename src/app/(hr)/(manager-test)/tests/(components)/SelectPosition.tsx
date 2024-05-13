import React, { useState } from "react";
import { Cascader, Form, FormInstance, Input } from "antd";
import type { SingleCascaderProps } from "antd/es/cascader";
import { Span } from "next/dist/trace";

interface Option {
  value: string;
  label: string;
  children?: Option[];
}
interface TProps {
  form: FormInstance<any>;
  setJobPosition: React.Dispatch<React.SetStateAction<string>>;
  jobPosition: string;
  jobFunction: string;
  setJobFunction: React.Dispatch<React.SetStateAction<string>>;
}

const options: Option[] = [
  {
    value: "Developer",
    label: "Developer",
    children: [
      {
        value: "Developer C-level executive",
        label: "C-level executive",
      },
      {
        value: "Developer Director",
        label: "Director",
      },
      {
        value: "Developer Manager",
        label: "Manager",
      },
      {
        value: "DeveloperManager Junior / Trainee",
        label: "Junior / Trainee",
      },
      {
        value: "Developer Intern",
        label: "Intern",
      },
    ],
  },

  {
    value: "Other",
    label: "Other",
  },
];

const displayRender = (labels: string[]) => {
  return (
    <span>
      {labels.map((item, index) => {
        return (
          <>
            <span key={index}>{item}</span>
            <span>{index === labels.length - 1 ? "" : " - "}</span>
          </>
        );
      })}
    </span>
  );
};

const SelectPosition = (props: TProps) => {
  const { form } = props;
  const handleChangeSelect = () => {
    form.setFields([
      {
        name: "positionRecruiting",
        errors: [],
      },
    ]);
  };
  const [otherCheck, setOtherCheck] = useState<boolean>(false);
  const onChange: SingleCascaderProps<Option>["onChange"] = (value) => {
    handleChangeSelect();
    if (value.length === 1) {
      setOtherCheck(true);
    } else {
      setOtherCheck(false);
    }
  };
  return (
    <>
      <Form.Item
        label="Position recruiting"
        name="positionRecruiting"
        rules={[{ required: true, message: "Please select positions!" }]}
      >
        <Cascader
          placeholder="please select positions"
          options={options}
          expandTrigger="click"
          displayRender={displayRender}
          onChange={onChange}
        />
      </Form.Item>
      {otherCheck && (
        <Form.Item
          label="Specify “Other” position"
          className="mt-4"
          name="otherPosition"
          rules={[{ required: false }]}
        >
          <Input placeholder="Please input other position" className="w-full" />
        </Form.Item>
      )}
    </>
  );
};

export default SelectPosition;
