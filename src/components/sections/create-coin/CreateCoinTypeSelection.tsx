import { Fragment, useState } from "react";
import { Icon } from "@iconify/react";
import { Menu, Transition } from "@headlessui/react";
import ButtonV2 from "@/components/buttons/button-v2";
import Image from "next/image";
import Link from "next/link";

interface ICreateCoinTypeSelection {
  onCoinTypeSelect?: (type: string) => void;
}

const CreateCoinTypeSelection = ({ onCoinTypeSelect }: ICreateCoinTypeSelection) => {
  const [selectedCoinType, setSelectedCoinType] = useState<string>("");

  const handleOnCoinTypeSelect = (type: string) => {
    setSelectedCoinType(type);
  };

  const handleContinue = () => {
    if (onCoinTypeSelect) onCoinTypeSelect(selectedCoinType);
  };

  return (
    <>
      <header className="fixed left-0 top-0 z-10 flex items-center w-full h-25 bg-dark-header backdrop-blur-2xl text-white">
        <div className="w-full max-w-[1464px] mx-auto">
          <div className="flex items-center justify-between w-full px-4 lg:px-6">
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-1 bg-c-1 rounded-2xl">
              Coin Token
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
        <div className="pt-15">
          <div className="container">
            <div className="flex space-x-20">
              <div className="flex-shrink-0 w-full max-w-lg">
                <div className="mb-14 space-y-4">
                  <p className="text-[32px] text-white font-bold">Create your Coin</p>
                  <p className="text-white">
                    Korem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac
                    aliquet odio mattis.
                  </p>
                </div>
                <div className="mb-20 space-y-4">
                  <button
                    className={`group w-full text-left ${selectedCoinType === "standard" && "active"}`}
                    onClick={() => handleOnCoinTypeSelect("standard")}
                  >
                    <div className="w-full px-6 py-8 space-y-4 border border-white rounded-2xl transition-all group-[.active]:bg-white">
                      <p className="text-xl text-white font-bold transition-all group-[.active]:text-black">Standard</p>
                      <p className="text-sm text-white transition-all group-[.active]:text-black">
                        Enabling Collectors to mint your tokens is simple with our no-code Smart Contract tool!
                      </p>
                    </div>
                  </button>
                  <button
                    className={`group w-full text-left ${selectedCoinType === "advanced" && "active"}`}
                    onClick={() => handleOnCoinTypeSelect("advanced")}
                  >
                    <div className="w-full px-6 py-8 space-y-4 border border-white rounded-2xl transition-all group-[.active]:bg-white">
                      <p className="text-xl text-white font-bold transition-all group-[.active]:text-black">Advanced</p>
                      <p className="text-sm text-white transition-all group-[.active]:text-black">
                        Enabling Collectors to mint your tokens is simple with our no-code Smart Contract tool!
                      </p>
                    </div>
                  </button>
                </div>
                <div>
                  <ButtonV2 variant="1" className="w-full" onClick={handleContinue}>
                    Continue
                  </ButtonV2>
                </div>
              </div>
              {(selectedCoinType === "standard" || selectedCoinType === "") && (
                <Image
                  src="/images/create-coin-standard-image.png"
                  width="1000"
                  height="1000"
                  alt="Image"
                  className="w-[1214px] h-auto"
                />
              )}

              {selectedCoinType === "advanced" && (
                <Image
                  src="/images/create-coin-advanced-image.png"
                  width="1000"
                  height="1000"
                  alt="Image"
                  className="w-[1408px] h-auto"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCoinTypeSelection;
