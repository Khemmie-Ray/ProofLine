"use client";

import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import useCreateQuestion from "@/hooks/useCreateQuestion";

const Seek: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [optionA, setOptionA] = useState<string>("");
  const [optionB, setOptionB] = useState<string>("");
  const MAX_CHARS = 150;

  const { isConnected } = useAccount();
  const { createQuestion, isPending, isConfirming, isLoading, isSuccess } =
    useCreateQuestion();

  const countChars = (str: string): number => str.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createQuestion(text, optionA, optionB);
  };

  useEffect(() => {
    if (isSuccess) {
      setText("");
      setOptionA("");
      setOptionB("");
    }
  }, [isSuccess]);

  const getButtonText = () => {
    if (isPending) return "Confirm in wallet...";
    if (isConfirming) return "Creating Profile...";
    return "Create Profile";
  };

  const charCount = countChars(text);
  const isOverLimit = charCount > MAX_CHARS;
  const isSubmitting = isPending || isConfirming;

  return (
    <div className="lg:w-[40%] mx-auto md:w-[50%] w-[90%] my-12">
      <h2 className="text-[28px] text-center font-semibold mb-6">
        Seek Clarity.
      </h2>

      <div className="space-y-4">
        <div className="my-4">
          <label className="block text-[16px] font-medium mb-1">
            Describe your dilemma
          </label>
          <textarea
            className={`w-full border rounded-lg p-3 text-[13px] h-40 focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] ${
              isOverLimit ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="What's on your mind?"
            value={text}
            maxLength={MAX_CHARS}
            onChange={(e) => setText(e.target.value)}
            disabled={isSubmitting}
          />
          <p
            className={`text-xs mt-1 ${
              isOverLimit ? "text-red-500" : "text-gray-500"
            }`}
          >
            {text.length}/{MAX_CHARS} characters
          </p>
        </div>

        <div className="mb-3">
          <label className="block text-[16px] font-medium mb-1">Option A</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-3 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]"
            placeholder="First option"
            value={optionA}
            onChange={(e) => setOptionA(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-[16px] font-medium mb-1">Option B</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-3 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]"
            placeholder="Second option"
            value={optionB}
            onChange={(e) => setOptionB(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        <div className="mt-20"></div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className={`w-full p-3 rounded-lg shadow-lg font-medium transition-all ${
            isSubmitting || !isConnected || isOverLimit
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#1A1A1A] text-white hover:bg-[#2A2A2A]"
          }`}
        >
          {getButtonText()}
        </button>

        {!isConnected && (
          <p className="text-center text-sm text-gray-600 mt-2">
            Please connect your wallet to create a question
          </p>
        )}
      </div>
    </div>
  );
};

export default Seek;
