"use client";

import React, { useEffect, useCallback } from "react";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useChainId,
} from "wagmi";
import { DAO_ADDRESSES, isSupportedChain } from "@/constant/contract";
import { toast } from "sonner";
import { BaseError } from "wagmi";

const abi = [
  {
    type: "function",
    name: "createQuestion",
    inputs: [
      { name: "_ask", type: "string" },
      { name: "_optionA", type: "string" },
      { name: "_optionB", type: "string" },
    ],
    outputs: [{ name: "qId", type: "uint256" }],
  },
] as const;

const useCreateQuestion = () => {
  const chainId = useChainId();
  const contractAddress = chainId ? DAO_ADDRESSES[chainId] : undefined;

  const {
    data: hash,
    writeContract,
    isPending: isWritePending,
    error: writeError,
    reset: resetWrite,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isConfirmed) {
      toast.success("Question creation successful!");
    }
  }, [isConfirmed]);

  useEffect(() => {
    if (writeError) {
      const message =
        (writeError as BaseError).shortMessage || writeError.message;
      toast.error(`Error: ${message}`, { position: "top-center" });
    }
  }, [writeError]);

   const createQuestion = useCallback(
    (question: string, optionA: string, optionB: string) => {
      if (!contractAddress) {
        toast.error("Please connect to a supported network");
        return;
      }

      if (!isSupportedChain(chainId)) {
        toast.error("Please switch to a supported network");
        return;
      }

      writeContract({
        address: contractAddress,
        abi,
        functionName: "createQuestion",
        args: [question, optionA, optionB],
      });
    },
    [contractAddress, writeContract]
  );

  const reset = useCallback(() => {
    resetWrite();
  }, [resetWrite]);
  return {
    createQuestion,
    isPending: isWritePending,
    isConfirming,
    isLoading: isWritePending || isConfirming,
    isSuccess: isConfirmed,
    hash,
    error: writeError,
    reset,
  };
};

export default useCreateQuestion;
