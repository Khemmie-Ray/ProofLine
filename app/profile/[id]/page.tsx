"use client";

import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import { useParams } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useQuestionDetails } from "@/hooks/useQuestionDetails";

const QuestionStats = () => {
  const params = useParams();
  const questionIdParam = params.id;

  const questionId =
    typeof questionIdParam === "string" ? Number(questionIdParam) : undefined;

  const { question, comments, isLoading } = useQuestionDetails(questionId);

  const maxVote = question?.round === 1 ? 12 : 18;

  const votesForA = Number(question?.votesForA ?? 0);
  const votesForB = Number(question?.votesForB ?? 0);

  const percentA = maxVote ? Math.round((votesForA / maxVote) * 100) : 0;

  const percentB = maxVote ? Math.round((votesForB / maxVote) * 100) : 0;

  return (
    <main className="lg:w-[40%] mx-auto md:w-[50%] w-[90%] my-8">
      <div className="bg-black inline-flex p-2 rounded-lg mb-3">
        <Link href="/profile">
          <IoMdArrowRoundBack className="text-white text-lg" />
        </Link>
      </div>
      <section className="flex justify-between items-center mb-3 font-semibold text-[14px]">
        <div>
          <p>Total votes: {question?.votesForA  + question?.votesForB}</p>
        </div>
        {question?.isActive ? (<div className="bg-green-200 text-black px-6 font-semibold py-2 rounded-full text-[12px]">
          <p>Active</p>
        </div>) : (<div className="bg-gray-200 text-black px-6 font-semibold py-2 rounded-full text-[12px]">
          <p>Closed</p>
        </div>)}
      </section>
      <section className="my-5 border border-black/20 rounded-lg p-4 ">
        <h2 className="text-[18px] font-bold mb-2">Question</h2>
        <p className="text-[14px]">{question?.ask}</p>
        <div className="my-3 border-b py-3">
          <p className="uppercase mb-2 text-[12px] flex items-center">
            <GoDotFill className="text-lg text-green-400 mr-2" />{" "}
            <span className="mr-2">A: </span>
            {question?.optionA}
          </p>
          <p className="uppercase mb-2 text-[12px] flex items-center">
            <GoDotFill className="text-lg text-red-400 mr-2" />{" "}
            <span className="mr-2">B: </span>
            {question?.optionB}
          </p>
        </div>
        <div className="flex justify-between items-center  px-2 text-[12px] rounded-lg py-4 my-2">
          <div className="w-[48%] text-center border-r border-black/20">
            <p className="uppercase mb-2 flex items-center justify-center">
              <GoDotFill className="text-lg text-green-400 mr-2" /> option a{" "}
            </p>
            <p className="font-bold text-[20px]">{question?.votesForA}</p>
            <p>{percentA}%</p>
          </div>
          <div className="w-[48%] text-center">
            <p className="uppercase mb-2 flex items-center justify-center">
              <GoDotFill className="text-lg text-red-400 mr-2" /> option b{" "}
            </p>
            <p className="font-bold text-[20px]">{question?.votesForB}</p>
            <p>{percentB}%</p>
          </div>
        </div>
        <div className="my-4 border-t border-black/20 py-4">
          <h2 className="font-bold mb-4">Comments</h2>
           {isLoading ? (
          <p className="text-center text-sm">Loading questions…</p>
        ) : comments?.length > 0 ? (
          <div>
            <p className="text-[12px] flex items-center mb-3">
              {" "}
              <GoDotFill className="text-xl text-green-400 mr-2" /> Lorem ipsum
              dolor sit amet consectetur.
            </p>
            <p className="text-[12px] flex items-center mb-3">
              {" "}
              <GoDotFill className="text-xl text-red-400 mr-2" /> Lorem ipsum
              dolor sit amet consectetur.
            </p>
          </div>) : <p className="text-[14px] flex items-center"> <GoDotFill className="text-xl text-gray-400 mr-2" />No comments yet!</p>}
        </div>
      </section>
    </main>
  );
};

export default QuestionStats;
