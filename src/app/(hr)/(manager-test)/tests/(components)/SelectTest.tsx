import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  GetProp,
  Radio,
  RadioChangeEvent,
  Select,
  TreeSelect,
} from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";

const CustomSelect = ({
  value,
  onChange,
}: {
  value: string[];
  onChange: any;
}) => {
  const options = [
    {
      label: "Option 1",
      value: "Option1",
    },
    { label: "Option 2", value: "Option2" },
    { label: "Option 3", value: "Option3" },
    { label: "Option 4", value: "Option4" },
    { label: "Option 5", value: "Option5" },
    { label: "Option 6", value: "Option6" },
  ];

  const [valueCheck, setValueCheck] = useState<CheckboxValueType[]>([]);
  const [valueRadio, setValueRadio] = useState<string>("");

  return (
    <Form.Item
      initialValue={value}
      label="Select an option"
      name="selectedOption"
      rules={[{ required: true, message: "Please select an option!" }]}
    >
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        placeholder={"Please select test"}
        showSearch={false}
        value={"ssssss"}
        options={options}
        dropdownRender={() => {
          const onChangeCheckbox: GetProp<typeof Checkbox.Group, "onChange"> = (
            checkedValues
          ) => {
            setValueCheck(checkedValues);
          };
          const handleSaveClick = () => {
            if (valueCheck.includes("Option6") && valueRadio !== "") {
              const tmpValueCheck = valueCheck.filter(
                (item) => item !== "Option6"
              );
              console.log("tmpValueCheck", tmpValueCheck);
              setValueCheck([...tmpValueCheck, valueRadio]);
            } else {
              setValueCheck([...valueCheck]);
            }

            onChange(valueCheck.map(String));
          };
          const onChangeRadio = (e: RadioChangeEvent) => {
            setValueRadio(e.target.value);
          };
          console.log("valueCheck", valueCheck);
          const checkChildren = valueCheck.includes("Option6");
          return (
            <div
              className="flex flex-col gap-2"
              style={{ borderBottom: "1px solid #e8e8e8", padding: "8px" }}
            >
              <Checkbox.Group
                className="flex flex-col gap-2"
                options={options}
                onChange={onChangeCheckbox}
              />
              {checkChildren && (
                <Radio.Group
                  className="!flex !flex-col"
                  onChange={onChangeRadio}
                  value={valueRadio}
                >
                  <Radio value={"1"}>A</Radio>
                  <Radio value={"2"}>B</Radio>
                </Radio.Group>
              )}
              <Button onClick={handleSaveClick} htmlType="button">
                Save
              </Button>
            </div>
          );
        }}
      >
        {/* {options.map((option) => (
          <Select.Option key={option.value} value={option.value}>
            {option.label}
          </Select.Option>
        ))} */}
      </Select>
    </Form.Item>
  );
};

export default CustomSelect;
