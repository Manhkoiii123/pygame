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
import { game } from "@/types/listAssessment";

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
  game,
  setGame,
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
  game: game[];
  setGame: React.Dispatch<React.SetStateAction<game[]>>;
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
      children: item.option,
    }));
  }, [listTest]);
  const options = generateOptions();
  const [validateStatus, setValidateStatus] = useState<{
    [key: string]: boolean;
  }>({});
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

  const [initialValue, setInitialValue] = useState<string>("");
  useEffect(() => {
    if (selectedOption.length > 0) {
      let init = (valueCheck as string[]).reduce((acc, cur) => {
        let tmpLabel = options?.find((item) => item.value === cur)?.label!;
        if (!valueChildrenCheck.some((item) => item.startsWith(tmpLabel))) {
          return (acc += `${tmpLabel}, `);
        } else {
          return (acc += "");
        }
      }, "");
      let init2 = (valueChildrenCheck as string[]).reduce((acc, cur) => {
        return (acc += `${cur}, `);
      }, "");
      let ans = (init + init2).slice(0, -2);
      setInitialValue(ans);
    } else {
      setInitialValue("");
    }
  }, [selectedOption]);
  const handleDropdownVisibleChange = (visible: boolean) => {
    setDropdownVisible(visible);
  };
  useEffect(() => {
    setSelectedOption([
      ...valueCheck.map(String),
      ...valueChildrenCheck.map(String),
    ]);
  }, [valueCheck, valueChildrenCheck]);
  const handleSaveClick = async () => {
    await formChild.validateFields();
    handleOnChangeSelectTests(initialValue);
    valueChildrenCheck.forEach((item) => {
      const op = options.findIndex((option) => item.includes(option.label));
      let tmp: {
        label: string;
        value: string;
        children: null;
      };
      let optionTmp = "";
      if (item.includes("Vietnamese")) {
        optionTmp = "vi";
      } else if (item.includes("English")) {
        optionTmp = "en";
      }
      if (op !== -1) {
        tmp = options[op];
      }
      setGame((prev) => {
        if (prev.some((game) => game.game_id.includes(Number(tmp.value)))) {
          const tmpPrev = prev.filter(
            (item) => String(item.game_id[0]) !== tmp.value
          );
          tmpPrev.push({
            game_id: [Number(tmp.value)],
            option: [optionTmp],
          });
          return tmpPrev;
        }
        return [...prev, { game_id: [Number(tmp.value)], option: [optionTmp] }];
      });
    });
    valueCheck.forEach((item) => {
      setGame((prev) => {
        if (prev.some((game) => game.game_id.includes(Number(item))))
          return prev;
        return [...prev, { game_id: [Number(item)], option: [] }];
      });
    });
    setDropdownVisible(false);
  };
  let tmpChildrenCheck = useMemo(
    () => valueChildrenCheck,
    [valueChildrenCheck]
  );
  useEffect(() => {
    for (let i = 0; i < options.length; i++) {
      if (valueCheck.includes(options[i].value) === false) {
        tmpChildrenCheck = tmpChildrenCheck.filter(
          (item) => !item.startsWith(options[i].label)
        );
      }
    }
    setValueChilrenCheck(tmpChildrenCheck);
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
            (checkedValues as string[]).map((item) => {
              setValidateStatus({
                ...validateStatus,
                [item]: valueCheck.includes(item),
              });
            });
          };

          const onChangeRadio = (
            e: RadioChangeEvent,
            name: string,
            id: string
          ) => {
            setValueRadio(e.target.value);
            setValidateStatus({
              ...validateStatus,
              [id]:
                valueCheck.includes(id) &&
                e.target.value !== undefined &&
                e.target.value !== "",
            });

            if (e.target.value.startsWith(name)) {
              let cloneValueChildrenCheck = valueChildrenCheck.filter(
                (item) => !item.startsWith(name)
              );
              cloneValueChildrenCheck.push(e.target.value);
              setValueChilrenCheck(cloneValueChildrenCheck);
            }
          };
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
                                validator: (_, value) => {
                                  if (validateStatus[option.value] !== true) {
                                    return Promise.reject(
                                      `${option.label} is required`
                                    );
                                  }
                                  return Promise.resolve();
                                },
                              },
                            ]}
                          >
                            <Radio
                              className="!ml-8"
                              onChange={(e) =>
                                onChangeRadio(e, option.label, option.value)
                              }
                              value={`${option.label} English`}
                              checked={valueChildrenCheck.includes(
                                `${option.label} English`
                              )}
                            >
                              {option.label} in English
                            </Radio>
                            <Radio
                              className="!ml-8"
                              onChange={(e) =>
                                onChangeRadio(e, option.label, option.value)
                              }
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
