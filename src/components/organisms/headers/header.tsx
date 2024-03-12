import { Fragment } from "react";
import { Icon } from "@iconify/react";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full backdrop-blur-3xl z-50">
      <div className="container-gl px-4">
        <div className="flex items-center justify-between w-full h-25">
          <div className="flex items-center space-x-8">
            <Link href="/">
              <Image
                src="/images/generate-labs-white-logo.png"
                width="256"
                height="256"
                alt="Logo"
                className="w-32 h-auto"
              />
            </Link>
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
            <button className="inline-flex items-center justify-center w-auto px-6 py-3 space-x-3 border border-c-1 bg-c-1 rounded-full text-white">
              <Icon icon="heroicons-outline:plus" className="text-2xl" />
              <span>Create Project</span>
            </button>
            <button className="inline-flex items-center justify-center w-auto px-3 py-3 space-x-3 border border-white bg-white rounded-full">
              <Icon icon="heroicons-solid:shopping-cart" className="text-2xl" />
            </button>

            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex items-center justify-center w-auto px-3 py-3 space-x-3 border border-white bg-white rounded-full">
                  <Icon icon="heroicons-solid:user-circle" className="text-2xl" />
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
                <Menu.Items className="absolute right-0 origin-top-right min-w-[426px] mt-2 bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="flex items-center space-x-4 px-8 pt-12 pb-8 bg-c-1">
                    <Icon icon="heroicons-solid:user-circle" className="text-[56px] text-white" />
                    <p className="text-2xl font-bold text-white">Sign up/Login</p>
                  </div>
                  <div className="px-6 py-4 space-y-4">
                    <div
                      className="w-full px-4 pt-2.5 pb-4 bg-white hover:bg-c-7 rounded-2xl border border-c-5 cursor-pointer transition-all"
                      // onClick={() => setShowModalMarketplaceBalance(true)}
                    >
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
                          <button className="flex items-center w-full px-4 py-3 space-x-2.5 text-left">
                            <Icon icon="heroicons-solid:pencil" className="text-2xl" />
                            <span className="text-lg whitespace-nowrap">Dashboard</span>
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button className="flex items-center w-full px-4 py-3 space-x-2.5 text-left">
                            <Icon icon="heroicons-solid:bell" className="text-2xl" />
                            <span className="text-lg whitespace-nowrap">Notifications</span>
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button className="flex items-center w-full px-4 py-3 space-x-2.5 text-left">
                            <Icon icon="heroicons-solid:shopping-bag" className="text-2xl" />
                            <span className="text-lg whitespace-nowrap">Marketplace</span>
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-c-3 font-medium uppercase">OTHERS</p>
                      <Menu.Item>
                        {({ active }) => (
                          <button className="flex items-center w-full px-4 py-3 space-x-2.5 text-left">
                            <Icon icon="heroicons-solid:table" className="text-2xl" />
                            <span className="text-lg whitespace-nowrap">My Collections</span>
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button className="flex items-center w-full px-4 py-3 space-x-2.5 text-left">
                            <Icon icon="heroicons-solid:cog" className="text-2xl" />
                            <span className="text-lg whitespace-nowrap">Settings</span>
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button className="flex items-center w-full px-4 py-3 space-x-2.5 text-left">
                            <Icon icon="heroicons-solid:puzzle" className="text-2xl" />
                            <span className="text-lg whitespace-nowrap">Resources</span>
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
