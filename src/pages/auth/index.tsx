import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { getCookie, setCookie } from "cookies-next";
import { Magic } from "magic-sdk";
import { toast } from "react-toastify";
import moment from "moment";
import Web3 from "web3";

import LayoutScreen from "@/layouts/LayoutScreen";

import ButtonAuth from "@/components/buttons/button-auth";
import NavAuth from "@/components/nav/nav-auth";
import { postAuthWalletLogin } from "@/services/Auth";
import { signIn, useSession } from "next-auth/react";

const Auth = () => {
  const { data: sessionData, status: sessionStatus } = useSession();

  const router = useRouter();

  const [userAddress, setUserAddress] = useState<string>("");
  const [magic, setMagic] = useState<any>();
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [nonceState, setNonceState] = useState<{ loading?: boolean; nonce?: string }>({});

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.push("/");
    }
  }, [sessionStatus]);

  useEffect(() => {
    // Generate nonce
    fetchNonce();

    if (process.env.NEXT_PUBLIC_MAGIC_LINK_PUBLIC_KEY) {
      // Init magic link
      const initMagic = new Magic(process.env.NEXT_PUBLIC_MAGIC_LINK_PUBLIC_KEY, {
        network: "mainnet",
      });
      setMagic(initMagic);
    }
  }, []);

  useEffect(() => {
    if (magic) createWeb3();
  }, [magic]);

  useEffect(() => {
    if (userAddress) signMessageMagic();
  }, [userAddress]);

  const fetchNonce = async () => {
    try {
      const nonceRes = await fetch("/api/nonce");
      const nonce = await nonceRes.text();
      setNonceState(x => ({ ...x, nonce }));
    } catch (error) {
      setNonceState(x => ({ ...x, error: error as Error }));
    }
  };

  const connectMagic = async () => {
    try {
      const responseMagic = await magic.wallet.connectWithUI();

      setUserAddress(responseMagic[0]);
    } catch (error: any) {
      toast.error(error);
    }
  };

  const createWeb3 = async () => {
    // Get the provider from the Magic instance
    const provider = await magic.wallet.getProvider();

    // Create a new instance of Web3 with the provider and save
    const web3 = new Web3(provider);
    setWeb3(web3);
  };

  const signMessageMagic = async () => {
    if (userAddress && web3) {
      try {
        const domain = window.location.host;
        const origin = window.location.origin;
        const version = 1;
        const chainId = 1;
        const issuedAt = moment().format();
        const expirationTime = moment().add(5, "days").format();
        const nonce = nonceState.nonce;
        const message = `${domain} wants you to sign in with your Ethereum account:\n${userAddress}\n\nSign in with Ethereum to the app.\n\nURI: ${origin}\nVersion: ${version}\nChain ID: ${chainId}\nNonce: ${nonce}\nIssued At: ${issuedAt}\nExpiration Time: ${expirationTime}`;

        const signedMessage = await web3.eth.personal.sign(message, userAddress, "");

        // Use NextAuth to sign in with our address and the nonce
        await signIn("crypto", {
          address: userAddress,
          message: message,
          signature: signedMessage,
          callbackUrl: "/",
        });
      } catch (error: any) {
        toast.error(error);
      }
    }
  };

  return (
    <LayoutScreen>
      <div className="w-full px-6 mt-30">
        <div className="w-full max-w-xl mx-auto text-center">
          <div className="mb-14">
            <h1 className="mb-6 text-5xl font-bold text-center">Log in or Sign up</h1>
            <p className="text-gl-12">
              Welcome to GenerateLabs.App! Kindly provide your login information below to get started (It’s Free!)
            </p>
          </div>
          <div className="w-full mb-12 space-y-3">
            <ButtonAuth icon="/images/icon-magic-link.png" text="Continue with Email" onClick={() => connectMagic()} />
            {/* <ButtonAuth icon="/images/icon-web3auth.png" text="Continue with Web3auth" /> */}
            <Link href="/auth/wallet" className="block">
              <ButtonAuth icon="/images/icon-auth-wallet-white.svg" text="Continue with Wallet" />
            </Link>
          </div>
          <p className="text-xs">
            By clicking “Continue with Facebook/Google/Email/Wallet” above, you acknowledge that you have read and
            understood, and agree to GenerateLabs.App&apos;s{" "}
            <Link href="/" className="underline">
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link href="/" className="underline">
              Privacy Policy
            </Link>
            .
          </p>
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

export default Auth;
