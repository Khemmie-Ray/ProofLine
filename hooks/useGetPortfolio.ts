import { useReadContracts } from "wagmi";
import { useChainId } from "wagmi";
import { DAO_ADDRESSES } from "@/constant/contract";
import abi from "@/constant/abi.json";

export function useGetPortfolio(userAddress?: `0x${string}`) {
  const chainId = useChainId();
  const contractAddress = chainId ? DAO_ADDRESSES[chainId] : undefined;

  const enabled = !!userAddress && !!contractAddress;

  const { data, isLoading, error, refetch } = useReadContracts({
    contracts: enabled
      ? [
          {
            address: contractAddress,
            abi,
            functionName: "getUserStats",
            args: [userAddress],
          },
          {
            address: contractAddress,
            abi,
            functionName: "getQuestionsBySeeker",
            args: [userAddress],
          },
        ]
      : [],
    query: {
      enabled,
      staleTime: 30_000,
    },
  });

  // getUserStats
  const statsRaw = data?.[0]?.result as
    | [bigint, bigint, bigint]
    | undefined;

  const questionsRaw = data?.[1]?.result as any[] | undefined;

  const questions =
    questionsRaw?.map((q) => ({
      id: Number(q.id), 
      ask: q.ask,
      optionA: q.optionA,
      optionB: q.optionB,
      verdictCount: Number(q.verdictCount),
      round: Number(q.round),
      votesForA: Number(q.votesForA),
      votesForB: Number(q.votesForB),
      createdAt: Number(q.createdAt),
    })) ?? [];

  return {
    stats: statsRaw
      ? {
          questionsAsked: Number(statsRaw[0]),
          questionsVotedOn: Number(statsRaw[1]),
          commentsMade: Number(statsRaw[2]),
        }
      : null,
    questions,
    isLoading,
    error,
    refetch,
  };
}
