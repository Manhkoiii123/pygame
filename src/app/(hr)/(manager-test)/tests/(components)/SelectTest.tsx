/* eslint-disable react-hooks/exhaustive-deps */

import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { useQuery } from "@tanstack/react-query";
import { listTestRequest } from "@/apiRequest/test";

const CustomSelect = ({
  setSelectedOption,
  selectedOption,
  handleOnChangeSelectTests,
  valueRadio,
  setValueRadio,
  formChild,
  valueCheck,
  setValueCheck,
  valueChildrenCheck,
  setValueChilrenCheck,
}: {
  selectedOption: string[];
  setSelectedOption: React.Dispatch<React.SetStateAction<string[]>>;
  handleOnChangeSelectTests: (value: string) => void;
  valueRadio: string;
  setValueRadio: React.Dispatch<React.SetStateAction<string>>;
  formChild: FormInstance<any>;
  valueCheck: CheckboxValueType[];
  setValueCheck: React.Dispatch<React.SetStateAction<CheckboxValueType[]>>;
  valueChildrenCheck: string[];
  setValueChilrenCheck: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const { data: listTest } = useQuery({
    queryKey: ["listTest"],
    queryFn: async () => {
      const res = await listTestRequest.fetchListTest();
      return res.data.data.games;
    },
  });
  const generateOptions = useCallback(() => {
    if (!listTest) return [];

    return listTest.map((item) => ({
      label: item.name,
      value: item.id.toString(),
      // children: item.option,
      children: ["a", "b"],
    }));
  }, [listTest]);
  const options = generateOptions();

  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

  const [initialValue, setInitialValue] = useState<string>("");
  useEffect(() => {
    if (selectedOption.length > 0) {
      let init = selectedOption.reduce((acc, cur) => {
        return (acc += `${
          options?.find((item) => item.value === cur)?.label
        }, `);
      }, "");
      init = init.slice(0, -2);
      setInitialValue(init);
    } else {
      setInitialValue("");
    }
  }, [selectedOption]);
  const handleDropdownVisibleChange = (visible: boolean) => {
    setDropdownVisible(visible);
  };
  useEffect(() => {
    setSelectedOption(valueCheck.map(String));
  }, [valueCheck]);

  const handleSaveClick = async () => {
    await formChild.validateFields();
    handleOnChangeSelectTests(initialValue);
    // const tmpValueCheck = valueCheck.filter(
    //   (item) => item !== "Personality Test"
    // );
    // if (valueCheck.includes("Personality Test")) {
    //   if (valueRadio !== "") {
    //     setValueCheck([...tmpValueCheck, valueRadio]);
    //   }
    // } else {
    //   if (valueRadio !== "") {
    //     if (
    //       ["Personality Test English", "Personality Test Vietnamese"].some(
    //         (value) => valueCheck.includes(value)
    //       )
    //     ) {
    //       const tmpValueCheck = valueCheck.slice(0, -1);
    //       setValueCheck([...tmpValueCheck, valueRadio]);
    //     } else {
    //       setValueCheck([...valueCheck]);
    //     }
    //   } else {
    //     setValueCheck([...tmpValueCheck]);
    //   }
    // }

    setDropdownVisible(false);
  };
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

          const onChangeRadio = (e: RadioChangeEvent, name: string) => {
            setValueRadio(e.target.value);
            if (e.target.value.startsWith(name)) {
              let cloneValueChildrenCheck = valueChildrenCheck.filter(
                (item) => !item.startsWith(name)
              );
              cloneValueChildrenCheck.push(e.target.value);
              setValueChilrenCheck(cloneValueChildrenCheck);
            }
          };
          console.log("valueChildrenCheck", valueChildrenCheck);
          return (
            <Form form={formChild} onFinish={handleSaveClick}>
              <div
                className="flex flex-col gap-2"
                style={{ borderBottom: "1px solid #e8e8e8", padding: "8px" }}
              >
                {options &&
                  options.map((option) => {
                    const checkChildren2 = valueCheck.some(
                      (item) =>
                        item === option.value && option.children !== null
                    );
                    return (
                      <>
                        <Checkbox
                          key={option.value}
                          value={option.value}
                          checked={valueCheck.includes(option.value)}
                          onChange={(e) =>
                            onChangeCheckbox(
                              e.target.checked
                                ? [...valueCheck, option.value]
                                : valueCheck.filter(
                                    (item) => item !== option.value
                                  )
                            )
                          }
                        >
                          {option.label}
                        </Checkbox>
                        {checkChildren2 && (
                          <Form.Item
                            style={{ marginBottom: "0px" }}
                            name={`${option.label}`}
                            rules={[
                              {
                                required: true,
                                message: `${option.label} is required`,
                              },
                            ]}
                          >
                            {/* <Radio.Group
                              className="!flex !flex-col !ml-8"
                              onChange={onChangeRadio}
                              value={valueRadio}
                            >
                              <Radio value={`${option.label} English`}>
                                {option.label} in English
                              </Radio>
                              <Radio value={`${option.label} Vietnamese`}>
                                {option.label} in Vietnamese
                              </Radio>
                            </Radio.Group> */}
                            <Radio
                              className="!ml-8"
                              onChange={(e) => onChangeRadio(e, option.label)}
                              value={`${option.label} English`}
                              checked={valueChildrenCheck.includes(
                                `${option.label} English`
                              )}
                            >
                              {option.label} in English
                            </Radio>
                            <Radio
                              className="!ml-8"
                              onChange={(e) => onChangeRadio(e, option.label)}
                              checked={valueChildrenCheck.includes(
                                `${option.label} Vietnamese`
                              )}
                              value={`${option.label} Vietnamese`}
                            >
                              {option.label} in Vietnamese
                            </Radio>
                          </Form.Item>
                        )}
                      </>
                    );
                  })}

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
