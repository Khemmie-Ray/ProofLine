import { baseSepolia, celoSepolia} from "wagmi/chains";

export const DAO_ADDRESSES: Record<number, `0x${string}`> = {
  [baseSepolia.id]: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS! as `0x${string}`,
  [celoSepolia.id]: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_CELOSEPOLIA! as `0x${string}`,
};

export const SUPPORTED_CHAINS = [baseSepolia, celoSepolia];

export const isSupportedChain = (chainId: number | undefined): boolean => {
  return chainId ? chainId in DAO_ADDRESSES : false;
};