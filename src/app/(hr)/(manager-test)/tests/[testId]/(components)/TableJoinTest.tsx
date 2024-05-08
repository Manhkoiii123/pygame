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
  const withColumn = useMemo(() => {
    return 65 / listTest?.length!;
  }, [listTest]);
  const [selectTypeUser, setSelectTypeUser] = useState(1);
  const [sortField, setSortField] = useState("");
  console.log("🚀 ~ sortField:", sortField);
  const [sortType, setSortType] = useState("");
  console.log("🚀 ~ sortType:", sortType);
  const [sortItem, setSortItem] = useState<
    | {
        name: string;
        type: string;
      }[]
    | []
  >([]);
  const [open, setOpen] = useState(false);
  const [labelSelectOptionSort, setLabelSelectOptionSort] =
    useState("applications");
  const [valueSelectOptionSort, setValueSelectOptionSort] = useState(2);
  const handleOpenChange = () => {
    setOpen(!open);
  };
  const handleSort = (
    name: string,
    sortItem:
      | {
          name: string;
          type: string;
        }[]
      | []
  ) => {
    const tmpItem = sortItem.find((item) => item.name.includes(name));
    if (tmpItem?.type === "") {
      setSortItem((prev) => {
        return prev.map((item) => {
          if (item.name.includes(name)) {
            return {
              name: tmpItem.name,
              type: "asc",
            };
          }
          return {
            name: item.name,
            type: "",
          };
        });
      });
    } else if (tmpItem?.type === "asc") {
      setSortItem((prev) => {
        return prev.map((item) => {
          if (item.name.includes(name)) {
            return {
              name: tmpItem.name,
              type: "desc",
            };
          }
          return {
            name: item.name,
            type: "",
          };
        });
      });
    } else if (tmpItem?.type === "desc") {
      setSortItem((prev) => {
        return prev.map((item) => {
          if (item.name.includes(name)) {
            return {
              name: tmpItem.name,
              type: "",
            };
          }
          return {
            name: item.name,
            type: "",
          };
        });
      });
    }

    const tmp2 =
      tmpItem?.type === "" ? "asc" : tmpItem?.type === "asc" ? "desc" : "";
    setSortField(name);
    setSortType(tmp2!);
  };
  useEffect(() => {
    let tmp2 =
      listTest?.map((item) => {
        return {
          name: `rank_${item.name.split(" ")[0].toLocaleLowerCase()}_game`,
          type: "", // "" || desc || asc
        };
      }) || [];
    tmp2.push({
      name: "grading",
      type: "",
    });
    tmp2.push({
      name: "email",
      type: "",
    });
    setSortItem(tmp2);
  }, [listTest]);

  const handleFetchCandicate = async () => {
    const data = {
      type: selectTypeUser,
      option: valueSelectOptionSort,
      sort_field: sortField,
      sort_type: sortType,
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
      sortField,
      sortType,
      //   hiring_stage,
      listTest && listTest[0].pivot.assessment_id,
    ],
    queryFn: () => handleFetchCandicate(),
  });

  const columns: TableProps<any>["columns"] = [
    {
      title: (
        <div
          className="flex justify-center items-center gap-2 cursor-pointer  "
          onClick={() => handleSort(`email`, sortItem)}
        >
          Email{" "}
          {sortItem.find((item) => item.name === "email")?.type === "" && (
            <span></span>
          )}
          {sortItem.find((item) => item.name === "email")?.type === "desc" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#DEDDDD"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
              />
            </svg>
          )}
          {sortItem.find((item) => item.name === "email")?.type === "asc" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18"
              />
            </svg>
          )}
        </div>
      ),
      dataIndex: "email",
      width: "250px",
      key: "email",
      render: (text) => {
        return (
          <span className="font-medium text-base text-primary flex justify-center">
            {text}
          </span>
        );
      },
    },
    // ...columnTabel,
    ...listTest!.map((item) => {
      return {
        title: (
          <div
            className="flex justify-center items-center gap-2 cursor-pointer"
            onClick={() =>
              handleSort(
                `${item.name.split(" ")[0].toLocaleLowerCase()}_game`,
                sortItem
              )
            }
          >
            {item.name.split(" ")[0]}
            {sortItem.find((item2) =>
              item2.name.includes(
                `${item.name.split(" ")[0].toLocaleLowerCase()}_game`
              )
            )?.type === "" && <span></span>}
            {sortItem.find((item2) =>
              item2.name.includes(
                `${item.name.split(" ")[0].toLocaleLowerCase()}_game`
              )
            )?.type === "desc" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#DEDDDD"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                />
              </svg>
            )}
            {sortItem.find((item2) =>
              item2.name.includes(
                `${item.name.split(" ")[0].toLocaleLowerCase()}_game`
              )
            )?.type === "asc" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18"
                />
              </svg>
            )}
          </div>
        ),

        dataIndex: `${item.name.split(" ")[0].toLocaleLowerCase()}_game`,
        key: `${item.name.split(" ")[0].toLocaleLowerCase()}_game`,
        // width: String(withColumn) + "%",
        render: (text: string) => {
          return (
            <span className="font-medium text-base text-primary flex justify-center">
              {text}
            </span>
          );
        },
      };
    }),
    {
      title: (
        <div
          className="flex justify-center items-center gap-2 cursor-pointer "
          onClick={() => handleSort(`grading`, sortItem)}
        >
          Grading{" "}
          {sortItem.find((item) => item.name === "grading")?.type === "" && (
            <span></span>
          )}
          {sortItem.find((item) => item.name === "grading")?.type ===
            "desc" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#DEDDDD"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
              />
            </svg>
          )}
          {sortItem.find((item) => item.name === "grading")?.type === "asc" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18"
              />
            </svg>
          )}
        </div>
      ),
      dataIndex: "grading",
      width: "160px",
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
      width: "40px",
      dataIndex: "note",
    },
    {
      title: <span className="flex justify-center">Hiring stage</span>,
      key: "hiring_stage",
      width: "160px",
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
