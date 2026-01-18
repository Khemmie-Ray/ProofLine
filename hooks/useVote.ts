import React, { useEffect, useCallback } from "react";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useChainId,
} from "wagmi";
import { DAO_ADDRESSES, isSupportedChain } from "@/constant/contract";
import { toast } from "sonner";
import { BaseError } from "wagmi";
import abi from '@/constant/abi.json'

const useVote = () => {
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
      toast.success("Vote successful!");
    }
  }, [isConfirmed]);

  useEffect(() => {
    if (writeError) {
      const message =
        (writeError as BaseError).shortMessage || writeError.message;
      toast.error(`Error: ${message}`, { position: "top-center" });
    }
  }, [writeError]);

   const vote = useCallback(
    (qId: number, chooseOption: boolean,comment: string) => {
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
        functionName: "vote",
        args: [qId, chooseOption, comment],
      });
    },
    [contractAddress, writeContract]
  );

  const reset = useCallback(() => {
    resetWrite();
  }, [resetWrite]);
  return {
    vote,
    isPending: isWritePending,
    isConfirming,
    isLoading: isWritePending || isConfirming,
    isSuccess: isConfirmed,
    hash,
    error: writeError,
    reset,
  };
};

export default useVote;
