"use client";
import { listTestRequest } from "@/apiRequest/test";
import AssessmentItem from "@/app/(hr)/(manager-test)/tests/(components)/AssessmentItem";
import ButtonAddAssessment from "@/app/(hr)/(manager-test)/tests/(components)/ButtonAddAssessment";
import Loading from "@/components/views/Loading";
import { convertDate, sosanhDate } from "@/utils/user/user";
import { useQuery } from "@tanstack/react-query";

const Index = () => {
  const handleFetchListAssessment = async (status: number) => {
    const res = await listTestRequest.fetchListAssessment(status);
    return res.data.data.assessments;
  };
  const { data: listAssessmet, isLoading } = useQuery({
    queryKey: ["listAssessment"],
    queryFn: () => handleFetchListAssessment(1),
  });
  const { data: listAssessmetUnActive, isLoading: loadingUnActive } = useQuery({
    queryKey: ["listAssessmentUnActive"],
    queryFn: () => handleFetchListAssessment(0),
  });
  return (
    <div className="flex flex-col gap-4">
      <div className="text-[32px] leading-[44px] font-semibold text-primary">
        <div className="flex justify-between items-center">
          <span>Active assessments</span>
          <ButtonAddAssessment />
        </div>
        {isLoading ? (
          <Loading></Loading>
        ) : (
          <div className="mt-4 flex gap-3 flex-wrap">
            {listAssessmet?.map((item) => {
              var ngayKetThuc = item.end_date.split(" ")[0];
              var ngayHomNay = new Date().toLocaleDateString();
              var ngaySoSanh = convertDate(ngayHomNay);

              if (sosanhDate(ngayKetThuc, ngaySoSanh) === false) {
                return <AssessmentItem key={item.id} status={0} data={item} />;
              } else {
                return <AssessmentItem key={item.id} status={1} data={item} />;
              }
            })}
          </div>
        )}
      </div>
      <div className="text-[32px] leading-[44px] font-semibold text-primary mt-10">
        <div className="flex justify-between items-center">
          <span>Archived assessments</span>
        </div>
        {loadingUnActive ? (
          <Loading></Loading>
        ) : (
          <div className="mt-4 flex gap-3 flex-wrap">
            {listAssessmetUnActive?.map((item) => {
              return <AssessmentItem key={item.id} status={-1} data={item} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
