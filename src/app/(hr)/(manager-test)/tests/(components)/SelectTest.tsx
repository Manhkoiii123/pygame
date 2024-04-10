import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  GetProp,
  Radio,
  RadioChangeEvent,
  Select,
} from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";

const CustomSelect = ({
  setSelectedOption,
  selectedOption,
}: {
  selectedOption: string[];
  setSelectedOption: any;
}) => {
  const options = useMemo(() => {
    return [
      {
        label: "Verbal test",
        value: "Verbaltest",
      },
      { label: "Numerical test", value: "Numericaltest" },
      { label: "Logical test", value: "Logicaltest" },
      { label: "Visual test", value: "Visualtest" },
      { label: "Personality test", value: "Personalitytest" },
    ];
  }, []);

  const [valueCheck, setValueCheck] = useState<CheckboxValueType[]>([]);
  const [valueRadio, setValueRadio] = useState<string>("");
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [form] = Form.useForm();
  const handleDropdownVisibleChange = (visible: boolean) => {
    setDropdownVisible(visible);
  };
  useEffect(() => {
    setSelectedOption(valueCheck.map(String));
  }, [valueCheck]);

  return (
    <Form.Item
      label="Select an option"
      name="selectedOption"
      rules={[{ required: true, message: "Please select an option!" }]}
    >
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        placeholder={"Please select test"}
        showSearch={false}
        options={options}
        onDropdownVisibleChange={handleDropdownVisibleChange}
        open={dropdownVisible}
        dropdownRender={() => {
          const onChangeCheckbox: GetProp<typeof Checkbox.Group, "onChange"> = (
            checkedValues
          ) => {
            setValueCheck(checkedValues);
          };

          const handleSaveClick = async () => {
            await form.validateFields();
            const tmpValueCheck = valueCheck.filter(
              (item) => item !== "Personalitytest"
            );
            if (valueCheck.includes("Personalitytest")) {
              if (valueRadio !== "") {
                setValueCheck([...tmpValueCheck, valueRadio]);
              }
            } else {
              if (valueRadio !== "") {
                if (
                  ["PersonalitytestEnglish", "PersonalitytestVietnamese"].some(
                    (value) => valueCheck.includes(value)
                  )
                ) {
                  const tmpValueCheck = valueCheck.slice(0, -1);
                  setValueCheck([...tmpValueCheck, valueRadio]);
                } else {
                  setValueCheck([...valueCheck]);
                }
              } else {
                setValueCheck([...tmpValueCheck]);
              }
            }
            setDropdownVisible(false);
          };

          const onChangeRadio = (e: RadioChangeEvent) => {
            setValueRadio(e.target.value);
          };
          const checkChildren = [
            "Personalitytest",
            "PersonalitytestEnglish",
            "PersonalitytestVietnamese",
          ].some((value) => valueCheck.includes(value));

          return (
            <Form
              form={form}
              onFinish={handleSaveClick}
              initialValues={{ selectedOption: valueCheck }}
            >
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
                  <Form.Item
                    name="selectedChildrenOption"
                    rules={[
                      {
                        required: true,
                        message: "Please select a personality test!",
                      },
                    ]}
                  >
                    <Radio.Group
                      className="!flex !flex-col !ml-8"
                      onChange={onChangeRadio}
                      value={valueRadio}
                    >
                      <Radio value={"PersonalitytestEnglish"}>
                        Personality test in English
                      </Radio>
                      <Radio value={"PersonalitytestVietnamese"}>
                        Personality test in Vietnamese
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                )}
                <Button onClick={handleSaveClick} htmlType="button">
                  Save
                </Button>
              </div>
            </Form>
          );
        }}
      ></Select>
    </Form.Item>
  );
};

export default CustomSelect;
