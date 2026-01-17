"use client";

import React, { useState } from "react";
import { Send, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppKitAccount } from "@reown/appkit/react";
import { useNextUnvotedQuestion } from "@/hooks/useNextUnvotedQuestion";
import { useQuestionDetails } from "@/hooks/useQuestionDetails";

const MAX_CHARS = 50;

const Assessor = () => {
  const { address } = useAppKitAccount();
  const [index, setIndex] = useState(0);
  const [comment, setComment] = useState("");

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

  if (!found)
    return (
      <div className="lg:w-[40%] mx-auto md:w-[50%] w-[90%] min-h-screen flex justify-center items-center">
        <div className="shadow-lg border border-black/20 px-5 py-8 rounded-lg text-center">
        <p>No questions available at the moment. <br />Check back.</p>
        </div>
      </div>
    );

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
          <div className="border border-black/20 rounded-[21px] flex flex-col p-4 mt-4">
            <textarea
              placeholder="Enter a comment"
              value={comment}
              maxLength={MAX_CHARS}
              onChange={(e) => setComment(e.target.value)}
              className="h-22.5 w-full outline-none resize-none"
            />

            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-black/50">
                {comment.length}/{MAX_CHARS}
              </span>

              <button
                disabled={comment.length === 0}
                className="bg-black rounded-full p-3 disabled:opacity-40"
              >
                <Send className="text-white" />
              </button>
            </div>
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
          </div>
        </motion.section>
      </AnimatePresence>
    </main>
  );
};

export default Assessor;
