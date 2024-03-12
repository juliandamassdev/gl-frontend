import { Menu, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import IconArt from "@/components/icons/icon-art";
import IconGenerate from "../icons/icon-generate";
import { useSession } from "next-auth/react";

const headerMenu = [
  // {
  //   label: "Art",
  //   icon: <IconArt className="fill-c-1 group-[.active]:fill-white" />,
  //   href: "/art",
  // },
  {
    label: "Generate",
    icon: <IconGenerate className="fill-c-1 group-[.active]:fill-white" />,
    href: "/generate",
  },
  // {
  //   label: "Edit Page",
  //   icon: <Icon icon="heroicons-solid:puzzle" className="text-xl" />,
  //   href: "/page",
  // },
  {
    label: "Contract",
    icon: <Icon icon="heroicons-solid:paper-airplane" className="text-xl" />,
    href: "/contracts",
  },
];

const HeaderApp = () => {
  const router = useRouter();

  const uuid = router.query?.id;

  const getLastRoute = (route: string) => {
    const parts = route.split("/");
    const result = parts[parts.length - 1];

    return `/${result}`;
  };

  return (
    <header className="absolute top-0 left-0 z-50 flex items-center w-full h-20 bg-white border-b border-c-5">
      <div className="w-full max-w-[1464px] mx-auto">
        <div className="flex items-center justify-between w-full px-4 lg:px-6">
          <div className="flex items-center space-x-14">
            <Link href="/">
              <Image
                src="/images/generate-labs-logo.png"
                alt="Generate Labs"
                width="400"
                height="400"
                className="w-[118px] h-auto"
              />
            </Link>
            <nav className="flex items-center space-x-4 -my-2">
              {headerMenu.map((menu, index: number) => (
                <Link key={index} href={`/art-generator/${uuid}/${menu.href}`}>
                  <div
                    className={`flex items-center justify-center px-4 py-3 pr-6 space-x-3 hover:bg-gl-light-1 text-black rounded-full transition-all group ${
                      menu.href === getLastRoute(router.pathname) && "!bg-c-1 !text-white active"
                    }`}
                  >
                    {menu.icon}
                    <p>{menu.label}</p>
                  </div>
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-3">
            {/* <Link href={`/art-generator/${uuid}/settings/general`}>
              <div
                className={`flex items-center justify-center px-4 py-3 pr-6 space-x-3 hover:bg-gl-light-1 text-black rounded-full transition-all ${
                  router.pathname.includes("settings") && "!bg-c-1 !text-white"
                }`}
              >
                <Icon icon="heroicons-outline:cog" className="text-2xl" />
                <p>Settings</p>
              </div>
            </Link> */}

            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="flex items-center space-x-2 cursor-pointer">
                  <Image
                    src="/images/placeholder.jpg"
                    alt="Generate Labs"
                    width="200"
                    height="200"
                    className="w-10 h-10 rounded-full"
                  />
                  <Icon icon="heroicons-outline:chevron-down" className="text-2xl" />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 origin-top-right py-2 mt-2 bg-white rounded-lg shadow-lg">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button className="flex items-center w-full px-6 py-4 space-x-2 text-left">
                          <Icon icon="heroicons-outline:table" className="text-xl" />
                          <span className="whitespace-nowrap">My Collections</span>
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button className="flex items-center w-full px-6 py-4 space-x-2 text-left">
                          <Icon icon="heroicons-outline:bell" className="text-xl" />
                          <span className="whitespace-nowrap">Notifications</span>
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button className="flex items-center w-full px-6 py-4 space-x-2 text-left">
                          <Icon icon="heroicons-outline:puzzle" className="text-xl" />
                          <span className="whitespace-nowrap">Resources</span>
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button className="flex items-center w-full px-6 py-4 space-x-2 text-left">
                          <Icon icon="heroicons-outline:cog" className="text-xl" />
                          <span className="whitespace-nowrap">Settings</span>
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button className="flex items-center w-full px-6 py-4 space-x-2 text-left">
                          <Icon icon="heroicons-outline:logout" className="text-xl" />
                          <span className="whitespace-nowrap">Log out</span>
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderApp;
