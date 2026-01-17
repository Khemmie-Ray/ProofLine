import { useReadContract } from "wagmi";
import abi from "@/constant/abi.json";
import { useChainId } from "wagmi";
import { useAppKitAccount } from "@reown/appkit/react";
import { DAO_ADDRESSES } from "@/constant/contract";
import { useGetUserQuestions } from "./useGetUserQuestion";

export function useBatchIds() {
  const chainId = useChainId();
  const { address } = useAppKitAccount();
  const contractAddress = chainId ? DAO_ADDRESSES[chainId] : undefined;
  const { userQuestionIds } = useGetUserQuestions(address as `0x${string}`)

   const enabled =
    !!contractAddress &&
    !!address 

  const { data, isLoading, error } = useReadContract({
    address: contractAddress,
    abi,
    functionName: "getQuestionsByIds",
    args: enabled ? [userQuestionIds] : undefined,
    query: {
      enabled,
      staleTime: 30_000,
    },
  });

  const questions = (data as any[] | undefined)?.map((q) => ({
    ...q,
    verdictCount: Number(q.verdictCount),
    votesForA: Number(q.votesForA),
    votesForB: Number(q.votesForB),
    createdAt: Number(q.createdAt),
    isActive: q.status === 0,
  }));

  return {
    questions: questions ?? [],
    isLoading,
    error,
  };
}
