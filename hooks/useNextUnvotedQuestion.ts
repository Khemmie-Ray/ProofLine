import { useReadContract } from "wagmi";
import abi from "@/constant/abi.json";
import { useChainId } from "wagmi";
import { DAO_ADDRESSES } from "@/constant/contract";

export function useNextUnvotedQuestion(userAddress?: `0x${string}`) {
  const chainId = useChainId();
  const contractAddress = chainId ? DAO_ADDRESSES[chainId] : undefined;


  const { data, isLoading, error } = useReadContract({
    address: contractAddress,
    abi,
    functionName: "nextUnvotedQuestion",
    args: [userAddress],
    query: {
      enabled: !!userAddress,
      staleTime: 30_000,
    },
  });

  if (!data) {
    return { found: false, questionId: null, isLoading, error };
  }

  const [found, qId] = data as [boolean, bigint];

  return {
    found,
    questionId: found ? Number(qId) : null,
    isLoading,
    error,
  };
}
