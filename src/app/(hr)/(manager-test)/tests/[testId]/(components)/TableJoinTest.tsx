"use client";
import { Select, Table, TableProps } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import "./select.css";
import { TTestAssessment } from "@/types/listTest";
import { useQuery } from "@tanstack/react-query";
import { listTestRequest } from "@/apiRequest/test";
import Image from "next/image";
import Loading from "@/components/views/Loading";
import * as XLSX from "xlsx";
const TableJoinTest = ({
  listTest,
  assId,
}: {
  listTest: TTestAssessment[] | undefined;
  assId: number;
}) => {
  const [selectTypeUser, setSelectTypeUser] = useState(1);
  const [sortField, setSortField] = useState("");
  const [sortType, setSortType] = useState("");
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
          name: `rank_${item.name
            .split(" ")
            .filter((item) => item !== "challenge")
            .join("_")
            .toLocaleLowerCase()}_game`,
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
  const handleExportData = () => {
    if (listCandicate && listCandicate.length > 0) {
      const tmp = listCandicate.map(
        (item: { [key: string]: string | number | boolean }) => {
          let newListCandicate: { [key: string]: string | number | boolean } =
            {};
          for (let key in item) {
            let newKey = key
              .split("_")
              .map((item) => item[0].toUpperCase() + item.slice(1))
              .join(" ");
            // console.log(item[key]);
            newListCandicate[newKey] = item[key];
          }
          return newListCandicate;
        }
      );
      console.log("🚀 ~ tmp ~ tmp:", tmp);
      const worksheet = XLSX.utils.json_to_sheet(tmp);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "ExportDataCandicate.xlsx");
    }
  };
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
          className="flex items-center justify-center gap-2 cursor-pointer "
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
          <span className="flex justify-center text-base font-medium text-primary">
            {text}
          </span>
        );
      },
    },
    ...listTest!.map((item) => {
      return {
        title: (
          <div
            className="flex items-center justify-center gap-2 cursor-pointer"
            onClick={() =>
              handleSort(
                `${item.name
                  .split(" ")
                  .filter((item) => item !== "challenge")
                  .join("_")
                  .toLocaleLowerCase()}_game`,
                sortItem
              )
            }
          >
            {`${item.name
              .split(" ")
              .filter((item) => item !== "challenge")
              .join(" ")}`}
            {sortItem.find((item2) =>
              item2.name.includes(
                `${item.name
                  .split(" ")
                  .filter((item) => item !== "challenge")
                  .join("_")
                  .toLocaleLowerCase()}_game`
              )
            )?.type === "" && <span></span>}
            {sortItem.find((item2) =>
              item2.name.includes(
                `${item.name
                  .split(" ")
                  .filter((item) => item !== "challenge")
                  .join("_")
                  .toLocaleLowerCase()}_game`
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
                `${item.name
                  .split(" ")
                  .filter((item) => item !== "challenge")
                  .join("_")
                  .toLocaleLowerCase()}_game`
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

        dataIndex: `${item.name
          .split(" ")
          .filter((item) => item !== "challenge")
          .join("_")
          .toLocaleLowerCase()}_game`,
        key: `${item.name
          .split(" ")
          .filter((item) => item !== "challenge")
          .join("_")
          .toLocaleLowerCase()}_game`,
        render: (text: string) => {
          return (
            <span className="flex justify-center text-base font-medium text-primary">
              {text}
            </span>
          );
        },
      };
    }),
    {
      title: (
        <div
          className="flex items-center justify-center gap-2 cursor-pointer "
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
          <span className="flex justify-center text-base font-medium text-primary">
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
      render: (text, record) => {
        return (
          <div className="flex justify-center text-base font-medium cursor-pointer text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
              />
            </svg>
          </div>
        );
      },
    },
    {
      title: <span className="flex justify-center">Hiring stage</span>,
      key: "hiring_stage",
      width: "160px",
      dataIndex: "hiring_stage",
      render: (text) => {
        return (
          <span className="flex justify-center text-base font-medium text-primary">
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
    <div className="flex flex-col gap-4 p-4 mt-10 border border-gray-200 rounded-lg border-1 ">
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
          <div
            onClick={() => handleExportData()}
            className="px-3 py-1 border-2 cursor-pointer border-primary rounded-3xl text-secondary"
          >
            Export Result
          </div>
        </div>
        <div
          onClick={() => handleOpenChange()}
          className="border-[1px] border-primary px-2 py-1 w-fit rounded-lg flex items-center gap-3 "
        >
          <span className="text-xl font-medium text-primary ">View By :</span>
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
                        <span className="text-base font-normal text-primary">
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
      </>
      {isLoading && <Loading />}
      {!isLoading && listCandicate && listCandicate?.length > 0 && (
        <Table
          columns={columns}
          dataSource={listCandicate}
          pagination={false}
        />
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
