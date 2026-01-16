import { useReadContract } from "wagmi";
import { useChainId } from "wagmi";
import { DAO_ADDRESSES } from "@/constant/contract";
import abi from "@/constant/abi.json";

export function useGetUserQuestions(userAddress?: `0x${string}`) {
  const chainId = useChainId();
  const contractAddress = chainId ? DAO_ADDRESSES[chainId] : undefined;

  const enabled = !!userAddress && !!contractAddress;

  const { data, isLoading, error } = useReadContract({
    address: contractAddress,
    abi,
    functionName: "getQuestionIdsBySeeker",
    args: enabled ? [userAddress] : undefined,
    query: {
      enabled,
      staleTime: 30_000,
    },
  });

  if (!enabled) {
    return {
      questionIds: [],
      hasQuestions: false,
      isLoading: true,
      error: null,
    };
  }

  if (!data) {
    return {
      questionIds: [],
      hasQuestions: false,
      isLoading,
      error,
    };
  }

  const userQuestionIds = (data as bigint[]).map(Number);

  return {
    userQuestionIds,
    hasQuestions: userQuestionIds.length > 0,
    isLoading,
    error,
  };
}
