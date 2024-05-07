"use client";
import { listTestRequest } from "@/apiRequest/test";
import DropdownInvite from "@/app/(hr)/(manager-test)/tests/[testId]/(components)/DropdownInvite";
import DropdownMore from "@/app/(hr)/(manager-test)/tests/[testId]/(components)/DropdownMore";
import ListTestInAssessment from "@/app/(hr)/(manager-test)/tests/[testId]/(components)/ListTestInAssessment";
import TableJoinTest from "@/app/(hr)/(manager-test)/tests/[testId]/(components)/TableJoinTest";
import Loading from "@/components/views/Loading";
import { convertDate, sosanhDate } from "@/utils/user/user";
import { useQuery } from "@tanstack/react-query";
import { Divider } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

const DetailAssessment = ({ testId }: { testId: string }) => {
  const handleFetchDetail = async (id: string) => {
    const res = await listTestRequest.detailAssessment(id);
    return res.data.data;
  };
  const { data: detailAssessment, isLoading } = useQuery({
    queryKey: ["detailAssessment", testId],
    queryFn: () => handleFetchDetail(testId),
  });
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href={"/tests"}
                className="p-2 rounded-full border-gray-100 cursor-pointer border-2"
              >
                <Image src="/left.png" alt="logo" width={24} height={24} />
              </Link>
              <div className="flex flex-col gap-1">
                <span className="text-xl font-medium text-primary">
                  Assessment for {detailAssessment?.assessment.job_function} -{" "}
                  {detailAssessment?.assessment.job_position}
                </span>
                <div className="flex gap-2 items-center">
                  <span className="text-xs font-normal text-ink100">
                    Date :{" "}
                  </span>
                  <span className="text-xs font-normal text-primary">
                    From {detailAssessment?.assessment.start_date} to{" "}
                    {detailAssessment?.assessment.end_date}
                  </span>
                  <div className="h-1 w-1 rounded-full bg-black"></div>
                  <span className="text-xs font-normal text-primary">
                    {dayjs(
                      convertDate(detailAssessment?.assessment.end_date!)
                    ).diff(
                      dayjs(
                        convertDate(detailAssessment?.assessment.start_date!)
                      ),
                      "d"
                    )}{" "}
                    days
                  </span>
                  {sosanhDate(
                    detailAssessment?.assessment.end_date!,
                    convertDate(new Date().toLocaleDateString())
                  ) === false && (
                    <div className="px-2 max-w-max rounded-2xl py-1 bg-[#FFAC9F] text-primary font-normal text-sm">
                      End Test
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <DropdownInvite
                token={detailAssessment?.assessment.token}
                id={testId}
              ></DropdownInvite>
              <DropdownMore></DropdownMore>
            </div>
          </div>
          <Divider />
          <div className="flex flex-col gap-3">
            <span className="font-medium text-xl text-primary">
              Include Test
            </span>
            <ListTestInAssessment
              listTest={detailAssessment?.assessment.games}
            />
          </div>
          <TableJoinTest
            assId={detailAssessment?.assessment.id!}
            listTest={detailAssessment?.assessment.games}
          />
        </>
      )}
    </>
  );
};

export default DetailAssessment;

//  {
//                 "id": 535,
//                 "email": "manh2@gmail.com",
//                 "note": "",
//                 "grading": 1,
//                 "hiring_stage": 0,
//                 "verbal_game": "0",
//                 "count_change_tab_verbal_game": "0",
//                 "verbal_game_used_time": "0",
//                 "rank_verbal_game": 0,

//                 "numerical_game": "0",
//                 "count_change_tab_numerical_game": "0",
//                 "numerical_game_used_time": "0",
//                 "rank_numerical_game": 0,

//                 "logical_game": "9",
//                 "count_change_tab_logical_game": "0",
//                 "logical_game_used_time": "19",
//                 "rank_logical_game": 100,

//                 "visual_game": "0",
//                 "count_change_tab_visual_game": "0",
//                 "visual_game_used_time": "0",
//                 "rank_visual_game": 0,

//                 "memory_game": "0",
//                 "count_change_tab_memory_game": "0",
//                 "memory_game_used_time": "0",
//                 "rank_memory_game": 0,

//                 "personality_game": "0",
//                 "count_change_tab_personality_game": "0",
//                 "personality_game_used_time": "0",
//                 "rank_personality_game": 0,

//                 "it_php_game": "0",
//                 "count_change_tab_it_php_game": "0",
//                 "it_php_game_used_time": "0",
//                 "rank_it_php_game": 0,
//                 "it_python_game": "0",
//                 "count_change_tab_it_python_game": "0",
//                 "it_python_game_used_time": "0",
//                 "rank_it_python_game": 0,
//                 "it_csharp_game": "0",
//                 "count_change_tab_it_csharp_game": "0",
//                 "it_csharp_game_used_time": "0",
//                 "rank_it_csharp_game": 0,
//                 "it_java_game": "0",
//                 "count_change_tab_it_java_game": "0",
//                 "it_java_game_used_time": "0",
//                 "rank_it_java_game": 0,
//                 "numerical_math_game": "0",
//                 "count_change_tab_numerical_math_game": "0",
//                 "numerical_math_game_used_time": "0",
//                 "rank_numerical_math_game": 0,
//                 "logical_reasoning_game": "0",
//                 "count_change_tab_logical_reasoning_game": "0",
//                 "logical_reasoning_game_used_time": "0",
//                 "rank_logical_reasoning_game": 0
//             },
