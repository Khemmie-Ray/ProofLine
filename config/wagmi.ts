import { cookieStorage, createStorage, http } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { baseSepolia, celoSepolia } from '@reown/appkit/networks'

export const projectId = process.env.NEXT_PUBLIC_PROJECTID

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const networks = [baseSepolia, celoSepolia]

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId,
  networks
})

export const config = wagmiAdapter.wagmiConfig