import { Fragment } from "react";
import Image from "next/image";

import { Icon } from "@iconify/react";
import { Menu, Transition } from "@headlessui/react";

const NavAuth = () => {
  return (
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
                <button className="flex items-center w-full px-6 py-4 space-x-2 text-left" onClick={() => {}}>
                  <Icon icon="heroicons-outline:logout" className="text-xl" />
                  <span className="whitespace-nowrap">Log out</span>
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default NavAuth;
