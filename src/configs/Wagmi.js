import { alchemyProvider } from "wagmi/providers/alchemy";
import { configureChains, createConfig } from "wagmi";
import { goerli } from "wagmi/chains";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { publicProvider } from "wagmi/providers/public";

// Wagmi chains configuration
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [goerli],
  [alchemyProvider({ apiKey: "7WiyX620E2ueKv5oyqC9aZdynyZyCySj" }), publicProvider()],
);

// Wagmi create default configuration
export const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: [new MetaMaskConnector({ chains })],
});
