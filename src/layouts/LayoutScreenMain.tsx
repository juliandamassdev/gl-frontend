import Image from "next/image";
import Link from "next/link";

import { Icon } from "@iconify/react";

import HeaderScreenMain from "@/components/headers/header-screen-main";

interface ILayoutScreenMain {
  children: JSX.Element;
  title?: string;
}

const LayoutScreenMain = ({ children, title }: ILayoutScreenMain) => {
  return (
    <div id="layout-screen-main" className="flex flex-col w-screen h-screen">
      <HeaderScreenMain title={title} />
      <div className="relative flex-1 bg-black rounded-tl-3xl rounded-tr-3xl">
        <Image
          src="/images/bg-tr-screen-layout.png"
          width={500}
          height={500}
          alt="Background"
          className="absolute top-[6%] right-0 w-[470px] h-auto z-1"
        />
        <div className="z-2 mt-30 text-white">{children}</div>
        <Image
          src="/images/bg-bl-screen-layout.png"
          width={500}
          height={500}
          alt="Background"
          className="absolute bottom-[10%] left-0 w-[470px] h-auto z-1"
        />
      </div>
    </div>
  );
};

export default LayoutScreenMain;
