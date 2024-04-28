import { TQuestion } from "@/types/user";

const Verbal = ({ questionGen }: { questionGen: TQuestion }) => {
  return (
    <div className="flex flex-col w-[600px] gap-3">
      <div className="border border-1 border-gray-200 rounded-lg py-3 flex items-center justify-center cursor-pointer">
        <span className="font-semibold text-3xl text-primary">
          {questionGen.question.content.question.word_1}
        </span>
      </div>
      <div className="border border-1 border-gray-200 rounded-lg py-3 flex items-center justify-center cursor-pointer">
        <span className="font-semibold text-3xl text-primary">
          {questionGen.question.content.question.word_2}
        </span>
      </div>
    </div>
  );
};

export default Verbal;
