import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getCookie, setCookie } from "cookies-next";
import { SiweMessage } from "siwe";
import { useAccount, useConnect, useDisconnect, useNetwork, useSignMessage } from "wagmi";

import LayoutScreen from "@/layouts/LayoutScreen";

import ButtonAuth from "@/components/buttons/button-auth";
import NavAuth from "@/components/nav/nav-auth";

import { IPayloadPostAuthWalletLogin } from "@/types/IAuth";

import { postAuthWalletLogin } from "@/services/Auth";
import { toast } from "react-toastify";
import ButtonV2 from "@/components/buttons/button-v2";
import { Icon } from "@iconify/react";
import Link from "next/link";

import { signIn, useSession } from "next-auth/react";
import axios from "axios";

const walletsIcon: any = {
  metaMask: "/images/icon-metamask.png",
};

const AuthWallet = () => {
  const { data: sessionData, status: sessionStatus } = useSession();

  const router = useRouter();

  const { address, connector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();
  const { signMessageAsync } = useSignMessage();

  const [nonceState, setNonceState] = useState<{ loading?: boolean; nonce?: string }>({});

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.push("/");
    }
  }, [sessionStatus]);

  useEffect(() => {
    fetchNonce();
  }, []);

  useEffect(() => {
    if (isConnected) {
      handleSignIn();
    }
  }, [isConnected]);

  const fetchNonce = async () => {
    try {
      const nonceRes = await fetch("/api/nonce");
      const nonce = await nonceRes.text();
      setNonceState(x => ({ ...x, nonce }));
    } catch (error) {
      setNonceState(x => ({ ...x, error: error as Error }));
    }
  };

  const handleSignIn = async () => {
    try {
      const chainId = chain?.id;
      if (!address || !chainId) return;

      // Create SIWE message with pre-fetched nonce and sign with wallet
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId,
        nonce: nonceState.nonce,
      });

      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      // Verify signature
      try {
        await axios.post(
          "/api/verify",
          { message, signature },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
      } catch (error) {
        throw new Error("Error verifying message");
      }

      // Use NextAuth to sign in with our address and the nonce
      await signIn("crypto", {
        address,
        message: message.prepareMessage(),
        signature,
        callbackUrl: "/",
      });
    } catch (error: any) {
      setNonceState(x => ({ ...x, loading: false, nonce: undefined }));
      fetchNonce();
      disconnect();
    }
  };

  return (
    <LayoutScreen>
      <div className="w-full px-6 mt-30">
        <div className="relative w-full max-w-xl mx-auto text-center">
          <div className="mb-14">
            <h1 className="flex items-center justify-center space-x-4 mb-6 text-5xl font-bold text-center">
              <Link href="/auth">
                <ButtonV2 variant="1" className="w-[42px] h-[42px] !p-0 -ml-[42px]" rounded>
                  <Icon icon="heroicons-outline:chevron-left" className="text-2xl" />
                </ButtonV2>
              </Link>
              <span>Continue with wallet</span>
            </h1>
            <p className="text-gl-12">
              Wallet are used to send, receive, store, and display digital assets like Ethereum and Digital
              Collectibles.
            </p>
          </div>
          <div className="w-full mb-12 space-y-3">
            {connectors.map(connector => (
              <ButtonAuth
                key={connector.id}
                icon={`${walletsIcon[connector.id]}`}
                iconClassName="!w-12 !h-12 -mt-3 -mb-3"
                text={connector.name}
                onClick={() => connect({ connector })}
              />
            ))}
          </div>
        </div>
      </div>
    </LayoutScreen>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const signedInAddress = getCookie("signed-in-address", { req, res });

  if (signedInAddress) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default AuthWallet;
