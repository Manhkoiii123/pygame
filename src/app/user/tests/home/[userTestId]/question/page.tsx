import CloseButton from "@/app/user/tests/home/[userTestId]/question/(component)/CloseButton";
import MainContentQuestion from "@/app/user/tests/home/[userTestId]/question/(component)/MainContentQuestion";

const Page = () => {
  return (
    <div>
      <CloseButton />
      <div className="flex items-center justify-center pt-4">
        <MainContentQuestion />
      </div>
    </div>
  );
};

export default Page;
