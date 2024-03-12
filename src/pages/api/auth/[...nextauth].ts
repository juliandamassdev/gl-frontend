import { postAuthWalletLogin } from "@/services/Auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { AuthOptions, RequestInternal } from "next-auth";

// Authorization function for crypto login
//  takes publicAddress and signature from credentials and returns
//  either a user object on success or null on failure
const authorizeCrypto = async (
  credentials: Record<"address" | "message" | "signature", string> | undefined,
  req: Pick<RequestInternal, "body" | "headers" | "method" | "query">,
) => {
  if (!credentials) return null;

  const { address, message, signature } = credentials;

  // // Get user from database with their generated nonce
  // const user = await prisma.user.findUnique({
  //   where: { publicAddress },
  //   include: { cryptoLoginNonce: true },
  // });

  // if (!user?.cryptoLoginNonce) return null;

  // // Compute the signer address from the saved nonce and the received signature
  // const signerAddress = ethers.verifyMessage(user.cryptoLoginNonce.nonce, signedNonce);

  // // Check that the signer address matches the public address
  // //  that is trying to sign in
  // if (signerAddress !== publicAddress) return null;

  // // Check that the nonce is not expired
  // if (user.cryptoLoginNonce.expires < new Date()) return null;

  // // Everything is fine, clear the nonce and return the user
  // await prisma.cryptoLoginNonce.delete({ where: { userId: user.id } });

  try {
    const resPostAuthWalletLogin = await postAuthWalletLogin({ message, signature });

    return {
      id: "",
      address: address,
      token: resPostAuthWalletLogin.data.jwt,
    };
  } catch (error) {
    return null;
  }
};

// see: https://next-auth.js.org/configuration/options
export const authOptions: AuthOptions = {
  // Setting error and signin pages to our /auth custom page
  pages: {
    signIn: "/",
    signOut: "/auth",
    error: "/auth",
  },
  providers: [
    // see: https://next-auth.js.org/configuration/providers/credentials
    CredentialsProvider({
      id: "crypto",
      name: "Crypto Wallet Auth",
      credentials: {
        address: { label: "Address", type: "text" },
        message: { label: "Message", type: "text" },
        signature: { label: "Signature", type: "text" },
      },
      authorize: authorizeCrypto,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 2 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, session, trigger }: any) {
      if (trigger === "update") {
        return { ...token, data: { ...session.user } };
      }
      return { ...token, ...user };
    },
    async session({ session, token, user }: any) {
      if (session?.user) {
        session.user = token;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
