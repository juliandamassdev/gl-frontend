import { Menu, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { deleteCookie } from "cookies-next";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { CSSProperties, Fragment } from "react";
import { useCart } from "react-use-cart";
import { useDisconnect } from "wagmi";
import ButtonV2 from "../buttons/button-v2";

interface IHeader {
  profile?: any;
  fixed?: boolean;
  light?: boolean;
  leftElement?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  onClickCreateProject?: () => void;
}

const Header = ({ profile, fixed, light, leftElement, className, style, onClickCreateProject }: IHeader) => {
  const { disconnect } = useDisconnect();

  const { items, removeItem, emptyCart } = useCart();

  const handleLogout = () => {
    disconnect();
    signOut();
  };

  return (
    <header
      className={`${fixed ? "fixed top-0 left-0" : "relative"} w-full backdrop-blur-3xl z-10 bg-c-5/50 ${className}`}
      style={style}
    >
      <div className="container-gl px-4">
        <div className="flex items-center justify-between w-full h-25">
          <div className="flex items-center space-x-8">
            {leftElement && leftElement}
            <div className="relative">
              <Icon
                icon="heroicons-outline:search"
                className="absolute top-1/2 left-6 transform -translate-y-1/2 text-2xl text-c-5"
              />
              <input
                type="text"
                placeholder="Search collections or creators"
                className="w-[460px] px-6 py-3 pl-14 bg-white border border-white rounded-full outline-none"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="inline-flex items-center justify-center w-auto px-6 py-3 space-x-3 border border-c-1 bg-c-1 rounded-full text-white"
              onClick={onClickCreateProject}
            >
              <Icon icon="heroicons-outline:plus" className="text-2xl" />
              <span>Create Project</span>
            </button>

            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button as="div">
                  <ButtonV2 variant={light ? "white" : "1"} rounded className="!px-3">
                    <Icon icon="heroicons-solid:shopping-cart" className="text-2xl" />
                  </ButtonV2>
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
                <Menu.Items className="absolute right-0 origin-top-right min-w-[426px] mt-2 bg-white rounded-2xl shadow-lg overflow-hidden z-10">
                  <div className="px-6 py-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <h2 className="text-2xl font-bold">Your cart</h2>
                      <Icon icon="heroicons-solid:information-circle" className="text-lg" />
                    </div>
                    <p className="mb-8 text-xs text-c-3">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum,
                      ac aliquet odio mattis.
                    </p>
                    <div className="flex items-center justify-between mb-5">
                      <p className="text-sm">{items.length} items</p>
                      <button className="text-sm text-c-2 font-semibold" onClick={emptyCart}>
                        Clear all
                      </button>
                    </div>
                    <div className="space-y-3 mb-40">
                      {items.map((item: any, index: number) => {
                        return (
                          <div key={index} className="group flex w-full bg-c-7 rounded-xl overflow-hidden">
                            <div className="w-full p-2">
                              <div className="flex space-x-3">
                                <Image
                                  src="/images/placeholder.jpg"
                                  width="3000"
                                  height="3000"
                                  alt="User Hero"
                                  className="w-12 h-12 rounded-lg"
                                />
                                <div className="space-y-2">
                                  <p className="text-sm font-bold">{item.name}</p>
                                  <p className="text-[10px] text-c-3">Unititled by Generate Labs</p>
                                </div>
                              </div>
                              <div className="flex justify-end -mt-4">
                                <div className="space-y-0.5">
                                  <p className="text-[10px] text-c-3">Price</p>
                                  <p className="font-bold">{item.price} ETH</p>
                                </div>
                              </div>
                            </div>
                            <button
                              className="flex items-center justify-center px-6 -mr-20 group-hover:mr-0 bg-c-8 transition-all"
                              onClick={() => removeItem(item.id)}
                            >
                              <Icon icon="heroicons-solid:trash" className="text-2xl text-c-6" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex items-start justify-between pt-4 pb-6 mb-4 border-y border-c-5">
                      <p className="font-bold">Total price</p>
                      <div className="space-y-1.5 text-right">
                        <p className="font-bold">0 ETH</p>
                        <p className="text-xs text-c-5">$0</p>
                      </div>
                    </div>
                    <ButtonV2 variant="1" className="w-full">
                      Complete purchase
                    </ButtonV2>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button as="div">
                  <ButtonV2 variant={light ? "white" : "1"} rounded className="!px-3">
                    <Icon icon="heroicons-solid:user-circle" className="text-2xl" />
                  </ButtonV2>
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
                <Menu.Items className="absolute right-0 origin-top-right min-w-[426px] mt-2 bg-white rounded-2xl shadow-lg overflow-hidden z-10">
                  <div className="flex items-center px-8 pt-12 pb-8 bg-c-1">
                    <div className="flex items-center space-x-4">
                      <Icon icon="heroicons-solid:user-circle" className="text-[56px] text-white" />
                      {profile ? (
                        <div>
                          <p className="text-white">Untitled</p>
                          <p className="text-white">-</p>
                        </div>
                      ) : (
                        <p className="text-2xl font-bold text-white">Sign up/Login</p>
                      )}
                    </div>
                    {profile && <Icon icon="heroicons-outline:chevron-right" className="ml-auto text-2xl text-white" />}
                  </div>
                  <div className="px-6 py-4 space-y-4">
                    {/* TODO: Temp disabled */}
                    <div className="w-full px-4 pt-2.5 pb-4 bg-white hover:bg-c-7 rounded-2xl border border-c-5 cursor-pointer transition-all opacity-40">
                      <p className="mb-1 text-sm font-semibold">Marketplace Balance</p>
                      <div className="flex items-center space-x-2">
                        <Icon icon="heroicons-solid:credit-card" className="text-2xl" />
                        <p className="text-xl font-semibold">0.000 ETH</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-c-3 font-medium uppercase">Account</p>
                      <Menu.Item>
                        {({ active }) => (
                          <Link href="/" className="flex items-center w-full px-4 py-3 space-x-2.5 text-left">
                            <Icon icon="heroicons-solid:pencil" className="text-2xl" />
                            <span className="text-lg whitespace-nowrap">Dashboard</span>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button className="flex items-center w-full px-4 py-3 space-x-2.5 text-left opacity-40">
                            <Icon icon="heroicons-solid:shopping-bag" className="text-2xl" />
                            <span className="text-lg whitespace-nowrap">Marketplace</span>
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-c-3 font-medium uppercase">OTHERS</p>
                      {/* <Menu.Item>
                        {({ active }) => (
                          <button className="flex items-center w-full px-4 py-3 space-x-2.5 text-left">
                            <Icon icon="heroicons-solid:table" className="text-2xl" />
                            <span className="text-lg whitespace-nowrap">My Collections</span>
                          </button>
                        )}
                      </Menu.Item> */}
                      <Menu.Item>
                        {({ active }) => (
                          <button className="flex items-center w-full px-4 py-3 space-x-2.5 text-left opacity-40">
                            <Icon icon="heroicons-solid:cog" className="text-2xl" />
                            <span className="text-lg whitespace-nowrap">Settings</span>
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button className="flex items-center w-full px-4 py-3 space-x-2.5 text-left opacity-40">
                            <Icon icon="heroicons-solid:puzzle" className="text-2xl" />
                            <span className="text-lg whitespace-nowrap">Resources</span>
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="!mt-12">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className="flex items-center w-full px-4 py-3 space-x-2.5 text-left"
                            onClick={handleLogout}
                          >
                            <Icon icon="heroicons-solid:logout" className="text-2xl" />
                            <span className="text-lg whitespace-nowrap">Log out</span>
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-6 py-4">
                    <p className="text-[10px] text-c-3">© Official GenerateLabs.App 2023</p>
                    <p className="text-[10px] text-c-3">Privacy Policy</p>
                    <p className="text-[10px] text-c-3">Terms of Service</p>
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

export default Header;
