import Image from "next/image";
import Link from "next/link";

import { Icon } from "@iconify/react";

import Header from "@/components/headers/header";

interface ILayoutScreen {
  children: JSX.Element;
  backHref?: string;
  noBackgroundImage?: boolean;
}

const LayoutScreen = ({ children, backHref, noBackgroundImage }: ILayoutScreen) => {
  return (
    <div id="layout-screen" className="flex flex-col w-screen h-screen">
      <Header
        fixed
        light
        leftElement={
          <Link href="/">
            <Image
              src="/images/generate-labs-white-logo.png"
              width="256"
              height="256"
              alt="Logo"
              className="w-32 h-auto"
            />
          </Link>
        }
        style={{
          background: "rgba(255, 255, 255, 0.11)",
          boxShadow:
            "-53.73333px 53.73333px 53.73333px 0px rgba(255, 255, 255, 0.11) inset, 53.73333px -53.73333px 53.73333px 0px rgba(194, 194, 194, 0.11) inset",
          backdropFilter: "blur(45.13600158691406px)",
        }}
      />
      <div className="relative flex-1 bg-black">
        {backHref && (
          <Link href={backHref}>
            <button
              type="button"
              className="absolute left-6 top-[116px] flex items-center justify-center w-10 h-10 rounded-full bg-[#363636] text-white"
            >
              <Icon icon="heroicons-outline:chevron-left" className="text-2xl" />
            </button>
          </Link>
        )}
        {!noBackgroundImage && (
          <Image
            src="/images/bg-tr-screen-layout.png"
            width={500}
            height={500}
            alt="Background"
            className="absolute top-[15%] right-0 w-[470px] h-auto z-1"
          />
        )}
        <div className="relative z-2 pt-[100px] text-white">{children}</div>
        {!noBackgroundImage && (
          <Image
            src="/images/bg-bl-screen-layout.png"
            width={500}
            height={500}
            alt="Background"
            className="absolute bottom-[10%] left-0 w-[470px] h-auto z-1"
          />
        )}
      </div>
    </div>
  );
};

export default LayoutScreen;
