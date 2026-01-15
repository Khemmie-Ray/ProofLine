import { useReadContracts } from "wagmi";
import { useChainId } from "wagmi";
import { DAO_ADDRESSES, isSupportedChain } from "@/constant/contract";
import abi from '@/constant/abi.json'

export function useQuestionDetails(questionId?: number) {
  const chainId = useChainId();
  const address = chainId ? DAO_ADDRESSES[chainId] : undefined;

  const { data, isLoading, error, refetch } = useReadContracts({
    contracts: questionId !== undefined
      ? [
          {
            address,
            abi,
            functionName: "getQuestion",
            args: [questionId],
          },
          {
            address,
            abi,
            functionName: "getAnalytics",
            args: [questionId],
          },
        ]
      : [],
    query: {
      enabled: questionId !== undefined,
      staleTime: 30_000,
    },
  });

  const question = data?.[0]?.result as any;
  const analyticsRaw = data?.[1]?.result as
    | [bigint, bigint, bigint, boolean, bigint]
    | undefined;

  return {
    question: question
      ? {
          ...question,
          verdictCount: Number(question.verdictCount),
          votesForA: Number(question.votesForA),
          votesForB: Number(question.votesForB),
          createdAt: Number(question.createdAt),
          isActive: question.status === 0,
        }
      : null,
    analytics: analyticsRaw
      ? {
          totalVotes: Number(analyticsRaw[0]),
          votesForA: Number(analyticsRaw[1]),
          votesForB: Number(analyticsRaw[2]),
          isClosed: analyticsRaw[3],
          remainingSlots: Number(analyticsRaw[4]),
        }
      : null,
    isLoading,
    error,
    refetch,
  };
}
