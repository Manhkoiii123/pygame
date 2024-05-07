"use client";
import { Select, Table, TableProps } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import "./select.css";
import { TTestAssessment } from "@/types/listTest";
import { useQuery } from "@tanstack/react-query";
import { listTestRequest } from "@/apiRequest/test";
import Image from "next/image";
import Loading from "@/components/views/Loading";

const TableJoinTest = ({
  listTest,
  assId,
}: {
  listTest: TTestAssessment[] | undefined;
  assId: number;
}) => {
  const [selectTypeUser, setSelectTypeUser] = useState(1);
  const [open, setOpen] = useState(false);
  const [labelSelectOptionSort, setLabelSelectOptionSort] =
    useState("applications");
  const [valueSelectOptionSort, setValueSelectOptionSort] = useState(2);
  const handleOpenChange = () => {
    setOpen(!open);
  };
  const [columnTabel, setColumnTabel] = useState<
    {
      title: React.ReactNode;
      dataIndex: string;
      key: string;
    }[]
  >([]);
  useEffect(() => {
    const tmp = listTest?.map((item) => {
      return {
        title: <span className="flex justify-center">{item.name}</span>,
        dataIndex: `${item.name.split(" ")[0].toLocaleLowerCase()}_game`,
        key: `${item.name.split(" ")[0].toLocaleLowerCase()}_game`,
        render: (text: string) => {
          return (
            <span className="font-medium text-base text-primary flex justify-center">
              {text}
            </span>
          );
        },
      };
    });
    setColumnTabel(tmp!);
  }, [listTest]);
  const handleFetchCandicate = async () => {
    const data = {
      type: selectTypeUser,
      option: valueSelectOptionSort,
      //   sort_field: "desc",
      //   sort_type: "email",
      //   hiring_stage: 1,
      assessment_id: assId,
    };
    const res = await listTestRequest.getCandicateInvateTest(data);
    return res.data.data.result;
  };
  const { data: listCandicate, isLoading } = useQuery({
    queryKey: [
      "listCandicate",
      selectTypeUser,
      valueSelectOptionSort,
      //   sort_field,
      //   sort_type,
      //   hiring_stage,
      listTest && listTest[0].pivot.assessment_id,
    ],
    queryFn: () => handleFetchCandicate(),
  });
  const columns: TableProps<any>["columns"] = [
    {
      title: <span className="flex justify-center">Email</span>,
      dataIndex: "email",
      key: "email",
      render: (text) => {
        return (
          <span className="font-medium text-base text-primary flex justify-center">
            {text}
          </span>
        );
      },
    },
    ...columnTabel,
    {
      title: <span className="flex justify-center">Grading</span>,
      dataIndex: "grading",
      key: "grading",
      render: (text) => {
        return (
          <span className="font-medium text-base text-primary flex justify-center">
            {text}
          </span>
        );
      },
    },
    {
      title: <span className="flex justify-center">Note</span>,
      key: "note",
      dataIndex: "note",
    },
    {
      title: <span className="flex justify-center">Hiring stage</span>,
      key: "hiring_stage",
      dataIndex: "hiring_stage",
      render: (text) => {
        return (
          <span className="font-medium text-base text-primary flex justify-center">
            {text}
          </span>
        );
      },
    },
  ];

  const optionSort = useMemo(
    () => [
      {
        value: 1, //all
        label: "all",
      },
      {
        value: 2, //candicate
        label: "application",
      },
      {
        value: 3,
        label: "employees",
      },
    ],
    []
  );
  if (!listTest) return null;
  return (
    <div className="mt-10 border border-1 border-gray-200 rounded-lg p-4 flex flex-col gap-4 ">
      {isLoading && <Loading />}
      {!isLoading && listCandicate && listCandicate?.length > 0 && (
        <>
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <span
                className={`${
                  selectTypeUser === 1
                    ? "text-secondary underline"
                    : "text-primary"
                } cursor-pointer font-medium text-xl`}
                onClick={() => setSelectTypeUser(1)}
              >
                Applications
              </span>
              <span
                className={`${
                  selectTypeUser === 2
                    ? "text-secondary underline"
                    : "text-primary"
                } cursor-pointer font-medium text-xl`}
                onClick={() => setSelectTypeUser(2)}
              >
                Employees
              </span>
            </div>
            <div className="px-3 py-1 border-primary rounded-3xl border-2 cursor-pointer text-secondary">
              Export Result
            </div>
          </div>
          <div
            onClick={() => handleOpenChange()}
            className="border-[1px] border-primary px-2 py-1 w-fit rounded-lg flex items-center gap-3 "
          >
            <span className="text-primary font-medium text-xl ">View By :</span>
            <Select
              className="custom"
              value={`Rank among ${labelSelectOptionSort}`}
              showSearch={false}
              style={{ minWidth: 300 }}
              open={open}
              dropdownRender={() => {
                return (
                  <>
                    {optionSort.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="px-2 py-3 cursor-pointer hover:bg-[#F2F9FF]"
                          onClick={() => {
                            setValueSelectOptionSort(item.value);
                            setLabelSelectOptionSort(item.label);
                          }}
                        >
                          <span className="text-primary font-normal text-base">
                            Percentile rank with {item.label}
                          </span>
                        </div>
                      );
                    })}
                  </>
                );
              }}
            />
          </div>
          <Table
            columns={columns}
            dataSource={listCandicate}
            pagination={false}
          />
        </>
      )}
      {(!isLoading && !listCandicate) ||
        (!isLoading && listCandicate?.length === 0 && (
          <div className="flex items-center justify-center">
            <Image src={"/Nodata.png"} alt="No data" width={400} height={400} />
          </div>
        ))}
    </div>
  );
};

export default TableJoinTest;
