import type { AppProps } from "next/app";

import { CartProvider } from "react-use-cart";
import { config } from "../configs/Wagmi";
import { deleteCookie } from "cookies-next";
import { NextComponentType } from "next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { WagmiConfig } from "wagmi";
import { watchAccount } from "@wagmi/core";
import AuthGuard from "@/components/templates/AuthGuard";

import "@fontsource-variable/inter";

import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

export type ExtendAppProps = AppProps & {
  Component: NextComponentType & { requireAuth?: boolean };
};

export const queryClient = new QueryClient();

const App = ({ Component, pageProps: { session, ...pageProps } }: ExtendAppProps) => {
  // const router = useRouter();

  // useEffect(() => {
  //   walletAccountListener();
  // }, []);

  // // Wallet account listener
  // const walletAccountListener = async () => {
  //   watchAccount(account => {
  //     if (!account.isConnected && !account.isConnecting) {
  //       // Delete account cookie
  //       deleteCookie("user-sign-in-address");
  //       deleteCookie("user-sign-in-type");

  //       // Refresh page on wallet account change
  //       router.push("/auth");
  //     }
  //   });
  // };

  return (
    <SessionProvider>
      <WagmiConfig config={config}>
        <QueryClientProvider client={queryClient}>
          <CartProvider>
            {Component.requireAuth ? (
              <AuthGuard>
                <Component {...pageProps} />
              </AuthGuard>
            ) : (
              <Component {...pageProps} />
            )}

            <ToastContainer
              position="top-center"
              autoClose={3000}
              limit={2}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable={false}
              pauseOnHover
              theme="dark"
            />
          </CartProvider>
        </QueryClientProvider>
      </WagmiConfig>
    </SessionProvider>
  );
};

export default App;
