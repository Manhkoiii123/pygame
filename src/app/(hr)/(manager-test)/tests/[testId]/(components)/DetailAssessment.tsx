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

