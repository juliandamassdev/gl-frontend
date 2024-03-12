import ButtonV2 from "@/components/buttons/button-v2";
import InputField from "@/components/forms/input-field";
import InputFieldV2 from "@/components/forms/input-field-v2";
import SelectField from "@/components/forms/select-field";
import { Menu, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const CreateCoinPage = () => {
  return (
    <div className="bg-black min-h-screen">
      <header className="fixed left-0 top-0 z-10 flex items-center w-full h-25 bg-dark-header backdrop-blur-2xl text-white">
        <div className="w-full max-w-[1464px] mx-auto">
          <div className="flex items-center justify-between w-full px-4 lg:px-6">
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-1 rounded-2xl">
              <div className="flex items-center space-x-5">
                <ButtonV2 className="!rounded-full">
                  <Icon icon="" />
                  <span>Contract</span>
                </ButtonV2>
                <Link href="/create-coin/page">
                  <ButtonV2 variant="1" className="!rounded-full">
                    <Icon icon="heroicons-solid:puzzle" />
                    <span>Edit Page</span>
                  </ButtonV2>
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-14">
              <Link href="/">
                <Image
                  src="/images/generate-labs-white-logo.png"
                  alt="Generate Labs"
                  width="400"
                  height="400"
                  className="w-[118px] h-auto"
                />
              </Link>
            </div>
            <div className="flex items-center space-x-4 text-c-1">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button as="div">
                    <ButtonV2 variant={"1"} rounded className="!px-3">
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
                  <Menu.Items className="absolute right-0 origin-top-right py-2 mt-2 bg-white rounded-lg shadow-lg">
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <button className="flex items-center w-full px-6 py-4 space-x-2 text-left opacity-40">
                            <Icon icon="heroicons-outline:table" className="text-xl" />
                            <span className="whitespace-nowrap">My Collections</span>
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button className="flex items-center w-full px-6 py-4 space-x-2 text-left opacity-40">
                            <Icon icon="heroicons-outline:bell" className="text-xl" />
                            <span className="whitespace-nowrap">Notifications</span>
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button className="flex items-center w-full px-6 py-4 space-x-2 text-left opacity-40">
                            <Icon icon="heroicons-outline:puzzle" className="text-xl" />
                            <span className="whitespace-nowrap">Resources</span>
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button className="flex items-center w-full px-6 py-4 space-x-2 text-left opacity-40">
                            <Icon icon="heroicons-outline:cog" className="text-xl" />
                            <span className="whitespace-nowrap">Settings</span>
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className="flex items-center w-full px-6 py-4 space-x-2 text-left"
                            // onClick={handleLogout}
                          >
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

      <div className="pt-25 overflow-hidden">
        <div className="py-15">
          <div className="container">
            <Image src="/temp/edit.png" width="2048" height="2048" alt="" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCoinPage;
