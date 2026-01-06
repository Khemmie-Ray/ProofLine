"use client";

import { useReadContract, useChainId } from "wagmi";
import abi from '@/constant/abi.json'
import { DAO_ADDRESSES, isSupportedChain } from "@/constant/contract";

interface Jar {
  name: string;
  description: string;
  balance: bigint;
  totalReceived: bigint;
  donorsCount: bigint;
  version: bigint;
  active: boolean;
}

interface UserData {
  handle: string;
  hasUserProfile: boolean;
  jars: Jar[];
}

export function useGetUserData(address?: `0x${string}`) {
  const chainId = useChainId();
  const contractAddress = chainId ? DAO_ADDRESSES[chainId] : undefined;

  const { data, isLoading, isError, error, refetch } = useReadContract({
    address: contractAddress,
    abi,
    functionName: "getUserData",
    args: [address],
    query: {
      enabled: !!address,
      staleTime: 30_000,
      refetchInterval: 60_000,
      refetchOnWindowFocus: true,
      retry: 3,
    },
  });

  const result = data as [string, boolean, Jar[]] | undefined;

  const userData: UserData | null = result
    ? {
        handle: result[0],
        hasUserProfile: result[1],
        jars: result[2],
      }
    : null;

  return {
    userData,
    isLoading,
    isError,
    error,
    refetch,
  };
}