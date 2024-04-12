/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  FormInstance,
  GetProp,
  Radio,
  RadioChangeEvent,
  Select,
} from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";

const CustomSelect = ({
  setSelectedOption,
  selectedOption,
  handleOnChangeSelectTests,
  valueRadio,
  setValueRadio,
  formChild,
  valueCheck,
  setValueCheck,
}: {
  selectedOption: string[];
  setSelectedOption: React.Dispatch<React.SetStateAction<string[]>>;
  handleOnChangeSelectTests: (value: string) => void;
  valueRadio: string;
  setValueRadio: React.Dispatch<React.SetStateAction<string>>;
  formChild: FormInstance<any>;
  valueCheck: CheckboxValueType[];
  setValueCheck: React.Dispatch<React.SetStateAction<CheckboxValueType[]>>;
}) => {
  const options = useMemo(() => {
    return [
      {
        label: "Verbal test",
        value: "Verbal test",
      },
      { label: "Numerical test", value: "Numerical test" },
      { label: "Logical test", value: "Logical test" },
      { label: "Visual test", value: "Visual test" },
      { label: "Personality test", value: "Personality Test" },
    ];
  }, []);

  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

  const [initialValue, setInitialValue] = useState<string>("");
  useEffect(() => {
    if (selectedOption.length > 0) {
      const init = selectedOption.join(", ");
      setInitialValue(init);
    } else {
      setInitialValue("");
    }
  }, [selectedOption]);
  useEffect(() => {
    handleOnChangeSelectTests(initialValue);
  }, [initialValue]);
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
      rules={[
        {
          required: true,
          message: "Complete this field to create assessment !",
        },
      ]}
    >
      <Select
        className="selectTest"
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
            await formChild.validateFields();
            const tmpValueCheck = valueCheck.filter(
              (item) => item !== "Personality Test"
            );
            if (valueCheck.includes("Personality Test")) {
              if (valueRadio !== "") {
                setValueCheck([...tmpValueCheck, valueRadio]);
              }
            } else {
              if (valueRadio !== "") {
                if (
                  [
                    "Personality Test English",
                    "Personality Test Vietnamese",
                  ].some((value) => valueCheck.includes(value))
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
            // await handleOnChangeSelectTests(initialValue);
            setDropdownVisible(false);
          };

          const onChangeRadio = (e: RadioChangeEvent) => {
            setValueRadio(e.target.value);
          };
          const checkChildren = [
            "Personality Test",
            "Personality Test English",
            "Personality Test Vietnamese",
          ].some((value) => valueCheck.includes(value));

          return (
            <Form
              form={formChild}
              onFinish={handleSaveClick}
              // initialValues={{ selectedOption: valueCheck }}
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
                      <Radio value={"Personality Test English"}>
                        Personality test in English
                      </Radio>
                      <Radio value={"Personality Test Vietnamese"}>
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
