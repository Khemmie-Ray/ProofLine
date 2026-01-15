"use client";

import React, { useState } from "react";
import { Send, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CommentBox from "@/components/CommentBox";
import { useAppKitAccount } from "@reown/appkit/react";
import { useNextUnvotedQuestion } from "@/hooks/useNextUnvotedQuestion";
import { useQuestionDetails } from "@/hooks/useQuestionDetails";

const Assessor = () => {
  const { address } = useAppKitAccount();
  const [index, setIndex] = useState(0);

  const {
    found,
    questionId,
    isLoading: loadingNext,
  } = useNextUnvotedQuestion(address as `0x${string}`);

  const {
    question,
    analytics,
    isLoading: loadingQuestion,
  } = useQuestionDetails(questionId ?? undefined);

  console.log(questionId);
  console.log(question);

  const handleSwipe = (offsetY: number) => {
    if (offsetY < -120 && index < question.length - 1) {
      setIndex((prev) => prev + 1);
    }
    if (offsetY > 120 && index > 0) {
      setIndex((prev) => prev - 1);
    }
  };
  const next = () => {
    if (index < question.length - 1) {
      setIndex((prev) => prev + 1);
    }
  };
  const prev = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    }
  };

  if (loadingNext || loadingQuestion) return <div>Loading...</div>;

  if (!found) return <div>No questions left to vote on</div>;

  return (
    <main className="lg:w-[40%] mx-auto md:w-[50%] w-[90%] my-12 text-[14px]">
      <AnimatePresence mode="wait">
        <motion.section
          key={question[index]}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          onDragEnd={(_, info) => handleSwipe(info.offset.y)}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className="border border-black/10 rounded-[21px] px-4 py-8 shadow-md bg-white"
        >
          {" "}
          <h1 className="font-bold text-[20px] mb-4">
            Question {index + 1}
          </h1>{" "}
          <p className="mb-4 border-l-4 border-green-600 pl-3 text-[16px]">
            {" "}
            {question?.ask}{" "}
          </p>{" "}
          <label className="flex items-center mb-3 cursor-pointer">
            {" "}
            <input type="radio" name="option" className="mr-2" />{" "}
            <span>{question?.optionA}</span>{" "}
          </label>
          <label className="flex items-center mb-3 cursor-pointer">
            {" "}
            <input type="radio" name="option" className="mr-2" />{" "}
            <span>{question?.optionB}</span>{" "}
          </label>
          <CommentBox />
          <div className="flex justify-between mt-6 items-center">
            {" "}
            <button
              onClick={prev}
              disabled={index === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-full border disabled:opacity-60"
            >
              <ChevronLeft size={18} /> Prev{" "}
            </button>
            <button
              onClick={next}
              disabled={index === question.length - 1}
              className="flex items-center gap-2 px-4 py-2 rounded-full border disabled:opacity-60"
            >
              {" "}
              Next <ChevronRight size={18} />{" "}
            </button>
          </div>
        </motion.section>
      </AnimatePresence>
    </main>
  );
};

export default Assessor;
