import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

const mainMenu = [
  {
    isActive: true,
    url: "/art-generator",
    title: "Art",
    subtitle: "Generate the Art tokens",
    background: (
      <Image
        src="/images/bg-art-hero.png"
        width="512"
        height="512"
        alt="Background"
        className="absolute -top-8 -right-12 z-1  w-[286px] group-hover:scale-125 transition-all"
      />
    ),
  },
  {
    isActive: true,
    url: "/drops",
    title: "Drops",
    subtitle: "Create forms",
    background: (
      <Image
        src="/images/bg-drops-hero.png"
        width="512"
        height="512"
        alt="Background"
        className="absolute -top-16 -right-8 z-1 w-[304px] group-hover:scale-125 transition-all"
      />
    ),
  },
  {
    isActive: false,
    url: "",
    title: "Coin token",
    subtitle: "Create your own marketplace",
    background: (
      <Image
        src="/images/bg-coin-hero.png"
        width="512"
        height="512"
        alt="Background"
        className="absolute -top-4 -right-8 z-1 w-[244px] group-hover:scale-125 transition-all"
      />
    ),
  },
];

const InitialHero = () => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-8">What will you generate today?</h2>
      <div className="grid grid-cols-12 gap-5">
        {mainMenu.map((menu, index: number) => {
          return (
            <Link key={index} href={menu.isActive ? menu.url : ""} className="relative col-span-4 group">
              <div className="relative z-1 flex items-center w-full h-52 p-4 bg-c-1 rounded-2xl text-white overflow-hidden">
                {menu.background}
                <button className="absolute top-3 right-3 z-2">
                  <Icon icon="heroicons-solid:information-circle" />
                </button>
                <div className="relative z-3">
                  <p className="mb-2 text-2xl font-bold">{menu.title}</p>
                  <p className="text-sm">{menu.subtitle}</p>
                </div>
              </div>
              {!menu.isActive && (
                <div className="absolute left-0 top-0 w-full h-full z-2 opacity-0 group-hover:opacity-100 transition-all">
                  <div className="group relative flex items-center w-full h-52 p-4 bg-c-1 rounded-2xl text-white overflow-hidden">
                    <Icon
                      icon="heroicons-solid:speakerphone"
                      className="absolute -top-2 -left-20 z-1 text-[288px] transition-all opacity-5 -rotate-[33deg]"
                    />
                    <button className="absolute top-3 right-3 z-2">
                      <Icon icon="heroicons-solid:information-circle" />
                    </button>
                    <div className="relative w-full z-3 text-center">
                      <p className="flex items-center justify-center space-x-2 mb-2 text-sm text-white/70">
                        <Icon icon="heroicons-solid:speakerphone" className="text-2xl -rotate-12" />
                        <span>We’re still</span>
                      </p>
                      <p className="text-3xl font-bold">Cooking the feature</p>
                    </div>
                  </div>
                </div>
              )}
            </Link>
          );
        })}
      </div>
      <hr className="mt-10 mb-6 border-c-5" />
    </>
  );
};

export default InitialHero;
