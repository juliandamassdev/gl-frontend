import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import moment from "moment";

interface IAuthGuard {
  children: React.ReactNode;
}

/**
 * Auth Guard
 */
const AuthGuard = ({ children }: IAuthGuard): any => {
  const { status, data: sessionData } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      if (router.pathname !== "/auth") {
        router.push("/auth");
      }
    }

    if (status === "authenticated") {
      if (moment().isSameOrAfter(moment(sessionData.expires))) {
        router.push({ pathname: "/auth/signin" });
      }
    }
  }, [status, sessionData, router]);

  if (status === "authenticated") {
    return children;
  } else {
    return;
  }
};

export default AuthGuard;
