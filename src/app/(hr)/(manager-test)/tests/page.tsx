"use client";
import { listTestRequest } from "@/apiRequest/test";
import AssessmentItem from "@/app/(hr)/(manager-test)/tests/(components)/AssessmentItem";
import ButtonAddAssessment from "@/app/(hr)/(manager-test)/tests/(components)/ButtonAddAssessment";
import Loading from "@/components/views/Loading";
import { convertDate, sosanhDate } from "@/utils/user/user";
import { useQuery } from "@tanstack/react-query";

const Index = () => {
  const handleFetchListAssessment = async () => {
    const res = await listTestRequest.fetchListAssessment(1);
    return res.data.data.assessments;
  };
  const { data: listAssessmet, isLoading } = useQuery({
    queryKey: ["listAssessment"],
    queryFn: () => handleFetchListAssessment(),
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
    </div>
  );
};

export default Index;
