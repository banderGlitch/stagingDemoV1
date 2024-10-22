import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'   // global style
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { WagmiProvider } from 'wagmi'
import { gnosisChiado, hederaTestnet, rootstockTestnet,berachainTestnet} from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const projectId = '2c4250b0ed1c4c85027974613fc83eaf'

// 2. Create wagmiConfig
const metadata = {
  name: 'deApp',
  description: 'deApp for testing',
  url: 'http://localhost:5173', // Update this to match your dev server port
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [gnosisChiado , hederaTestnet, rootstockTestnet,berachainTestnet]
const config = defaultWagmiConfig({ chains, projectId, metadata })

// 3. Create modal
createWeb3Modal({ wagmiConfig: config, projectId, chains })

// 4. Create query client
const queryClient = new QueryClient()


createRoot(document.getElementById('root')).render(
 
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App /> 
      </QueryClientProvider>
    </WagmiProvider>

)

