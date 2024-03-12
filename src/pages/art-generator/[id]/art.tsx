import Button from "@/components/buttons/button";
import ButtonV2 from "@/components/buttons/button-v2";
import IconArt from "@/components/icons/icon-art";
import IconGenerate from "@/components/icons/icon-generate";
import LayoutDashboard from "@/layouts/LayoutDashboard";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { getCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";

interface IArtGeneratorArt {
  uuid: string;
}

const ArtGeneratorArt = ({ uuid }: IArtGeneratorArt) => {
  const [tab, setTab] = useState<number>(1);
  const [comment, setComment] = useState<boolean>(false);
  const [expand, setExpand] = useState<boolean>(false);

  return (
    <>
      <LayoutDashboard>
        <div className="relative w-full flex">
          <div className="flex-shrink-0 h-full px-1.5 pt-6 border-r border-gl-dark-3">
            <div className="space-y-2">
              <div className="flex items-center justify-center w-15 h-15 bg-gl-dark-1 rounded-2xl">
                <IconArt className="fill-white w-6 h-6" />
              </div>
              <div className="flex items-center justify-center w-15 h-15 bg-gl-light-1 rounded-2xl">
                <IconGenerate className="fill-black w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 flex flex-col w-[376px] px-6 pt-6 border-r border-gl-dark-3 overflow-auto">
            {comment ? (
              <div>
                <ButtonV2 variant="gl-3" className="mb-6" onClick={() => setComment(false)}>
                  <span>Go Back</span>
                </ButtonV2>
                <textarea
                  className="w-full p-4 bg-gl-light-1 rounded-lg resize-none h-[400px]"
                  placeholder="Type anything here"
                ></textarea>
              </div>
            ) : (
              <>
                <div className="flex items-center mb-6 space-x-6">
                  <div className="flex items-center w-full p-1 bg-gl-light-1 rounded-lg">
                    <button
                      className={`flex-1 p-1.5 text-center rounded-lg ${tab === 1 && "bg-gl-blue-1 text-white"}`}
                      onClick={() => setTab(1)}
                    >
                      Assets
                    </button>
                    <button
                      className={`flex-1 p-1.5 text-center rounded-lg ${tab === 2 && "bg-gl-blue-1 text-white"}`}
                      onClick={() => setTab(2)}
                    >
                      Traits
                    </button>
                  </div>
                  <button
                    type="button"
                    className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-gl-blue-2 rounded-full text-gl-blue-1"
                    onClick={() => setComment(true)}
                  >
                    <Icon icon="heroicons-outline:plus" className="text-2xl" />
                  </button>
                </div>

                <input
                  type="text"
                  className="w-full px-4 py-2 mb-2 border border-gl-dark-3 rounded-lg text-sm"
                  placeholder="Search"
                />

                {tab === 1 && (
                  <div className="flex flex-col w-full h-full">
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button
                            className={`flex items-center justify-between py-4 ${!open && "border-b border-gl-dark-3"}`}
                          >
                            <span className="font-semibold">Hair</span>
                            <div className={`${open ? "rotate-180 transform" : ""} transition-all`}>
                              <Icon icon="heroicons-outline:chevron-down" className="text-2xl" />
                            </div>
                          </Disclosure.Button>
                          <Transition
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                          >
                            <Disclosure.Panel className="h-full border-b border-gl-dark-3">
                              <div className="grid grid-cols-12 gap-3.5 pb-4">
                                <div className="col-span-4">
                                  <div className="w-full">
                                    <div className="square rounded-lg overflow-hidden mb-1">
                                      <div className="square-content">
                                        <Image
                                          src="/images/placeholder.jpg"
                                          width="400"
                                          height="400"
                                          alt="Placeholder"
                                        />
                                      </div>
                                    </div>
                                    <p>Knight Hair</p>
                                  </div>
                                </div>
                                <div className="col-span-4">
                                  <div className="w-full">
                                    <div className="square rounded-lg overflow-hidden mb-1">
                                      <div className="square-content">
                                        <Image
                                          src="/images/placeholder.jpg"
                                          width="400"
                                          height="400"
                                          alt="Placeholder"
                                        />
                                      </div>
                                    </div>
                                    <p>Knight Hair</p>
                                  </div>
                                </div>
                                <div className="col-span-4">
                                  <div className="w-full">
                                    <div className="square rounded-lg overflow-hidden mb-1">
                                      <div className="square-content">
                                        <Image
                                          src="/images/placeholder.jpg"
                                          width="400"
                                          height="400"
                                          alt="Placeholder"
                                        />
                                      </div>
                                    </div>
                                    <p>Knight Hair</p>
                                  </div>
                                </div>
                                <div className="col-span-4">
                                  <div className="w-full">
                                    <div className="square rounded-lg overflow-hidden mb-1">
                                      <div className="square-content">
                                        <Image
                                          src="/images/placeholder.jpg"
                                          width="400"
                                          height="400"
                                          alt="Placeholder"
                                        />
                                      </div>
                                    </div>
                                    <p>Knight Hair</p>
                                  </div>
                                </div>
                                <div className="col-span-4">
                                  <div className="w-full">
                                    <div className="square rounded-lg overflow-hidden mb-1">
                                      <div className="square-content">
                                        <Image
                                          src="/images/placeholder.jpg"
                                          width="400"
                                          height="400"
                                          alt="Placeholder"
                                        />
                                      </div>
                                    </div>
                                    <p>Knight Hair</p>
                                  </div>
                                </div>
                                <div className="col-span-4">
                                  <div className="w-full">
                                    <div className="square rounded-lg overflow-hidden mb-1">
                                      <div className="square-content">
                                        <Image
                                          src="/images/placeholder.jpg"
                                          width="400"
                                          height="400"
                                          alt="Placeholder"
                                        />
                                      </div>
                                    </div>
                                    <p>Knight Hair</p>
                                  </div>
                                </div>
                              </div>
                            </Disclosure.Panel>
                          </Transition>
                        </>
                      )}
                    </Disclosure>
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button
                            className={`flex items-center justify-between py-4 ${!open && "border-b border-gl-dark-3"}`}
                          >
                            <span className="font-semibold">Clothes</span>
                            <div className={`${open ? "rotate-180 transform" : ""} transition-all`}>
                              <Icon icon="heroicons-outline:chevron-down" className="text-2xl" />
                            </div>
                          </Disclosure.Button>
                          <Transition
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                          >
                            <Disclosure.Panel className="h-full border-b border-gl-dark-3">
                              <div className="grid grid-cols-12 gap-3.5 pb-4">
                                <div className="col-span-4">
                                  <div className="w-full">
                                    <div className="square rounded-lg overflow-hidden mb-1">
                                      <div className="square-content">
                                        <Image
                                          src="/images/placeholder.jpg"
                                          width="400"
                                          height="400"
                                          alt="Placeholder"
                                        />
                                      </div>
                                    </div>
                                    <p>Knight Hair</p>
                                  </div>
                                </div>
                                <div className="col-span-4">
                                  <div className="w-full">
                                    <div className="square rounded-lg overflow-hidden mb-1">
                                      <div className="square-content">
                                        <Image
                                          src="/images/placeholder.jpg"
                                          width="400"
                                          height="400"
                                          alt="Placeholder"
                                        />
                                      </div>
                                    </div>
                                    <p>Knight Hair</p>
                                  </div>
                                </div>
                                <div className="col-span-4">
                                  <div className="w-full">
                                    <div className="square rounded-lg overflow-hidden mb-1">
                                      <div className="square-content">
                                        <Image
                                          src="/images/placeholder.jpg"
                                          width="400"
                                          height="400"
                                          alt="Placeholder"
                                        />
                                      </div>
                                    </div>
                                    <p>Knight Hair</p>
                                  </div>
                                </div>
                              </div>
                            </Disclosure.Panel>
                          </Transition>
                        </>
                      )}
                    </Disclosure>
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button
                            className={`flex items-center justify-between py-4 ${!open && "border-b border-gl-dark-3"}`}
                          >
                            <span className="font-semibold">Nose</span>
                            <div className={`${open ? "rotate-180 transform" : ""} transition-all`}>
                              <Icon icon="heroicons-outline:chevron-down" className="text-2xl" />
                            </div>
                          </Disclosure.Button>
                          <Transition
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                          >
                            <Disclosure.Panel className="h-full border-b border-gl-dark-3">
                              <div className="grid grid-cols-12 gap-3.5 pb-4">
                                <div className="col-span-4">
                                  <div className="w-full">
                                    <div className="square rounded-lg overflow-hidden mb-1">
                                      <div className="square-content">
                                        <Image
                                          src="/images/placeholder.jpg"
                                          width="400"
                                          height="400"
                                          alt="Placeholder"
                                        />
                                      </div>
                                    </div>
                                    <p>Knight Hair</p>
                                  </div>
                                </div>
                                <div className="col-span-4">
                                  <div className="w-full">
                                    <div className="square rounded-lg overflow-hidden mb-1">
                                      <div className="square-content">
                                        <Image
                                          src="/images/placeholder.jpg"
                                          width="400"
                                          height="400"
                                          alt="Placeholder"
                                        />
                                      </div>
                                    </div>
                                    <p>Knight Hair</p>
                                  </div>
                                </div>
                                <div className="col-span-4">
                                  <div className="w-full">
                                    <div className="square rounded-lg overflow-hidden mb-1">
                                      <div className="square-content">
                                        <Image
                                          src="/images/placeholder.jpg"
                                          width="400"
                                          height="400"
                                          alt="Placeholder"
                                        />
                                      </div>
                                    </div>
                                    <p>Knight Hair</p>
                                  </div>
                                </div>
                              </div>
                            </Disclosure.Panel>
                          </Transition>
                        </>
                      )}
                    </Disclosure>
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button
                            className={`flex items-center justify-between py-4 ${!open && "border-b border-gl-dark-3"}`}
                          >
                            <span className="font-semibold">Headgear</span>
                            <div className={`${open ? "rotate-180 transform" : ""} transition-all`}>
                              <Icon icon="heroicons-outline:chevron-down" className="text-2xl" />
                            </div>
                          </Disclosure.Button>
                          <Transition
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                          >
                            <Disclosure.Panel className="h-full border-b border-gl-dark-3">
                              <div className="grid grid-cols-12 gap-3.5 pb-4">
                                <div className="col-span-4">
                                  <div className="w-full">
                                    <div className="square rounded-lg overflow-hidden mb-1">
                                      <div className="square-content">
                                        <Image
                                          src="/images/placeholder.jpg"
                                          width="400"
                                          height="400"
                                          alt="Placeholder"
                                        />
                                      </div>
                                    </div>
                                    <p>Knight Hair</p>
                                  </div>
                                </div>
                                <div className="col-span-4">
                                  <div className="w-full">
                                    <div className="square rounded-lg overflow-hidden mb-1">
                                      <div className="square-content">
                                        <Image
                                          src="/images/placeholder.jpg"
                                          width="400"
                                          height="400"
                                          alt="Placeholder"
                                        />
                                      </div>
                                    </div>
                                    <p>Knight Hair</p>
                                  </div>
                                </div>
                                <div className="col-span-4">
                                  <div className="w-full">
                                    <div className="square rounded-lg overflow-hidden mb-1">
                                      <div className="square-content">
                                        <Image
                                          src="/images/placeholder.jpg"
                                          width="400"
                                          height="400"
                                          alt="Placeholder"
                                        />
                                      </div>
                                    </div>
                                    <p>Knight Hair</p>
                                  </div>
                                </div>
                              </div>
                            </Disclosure.Panel>
                          </Transition>
                        </>
                      )}
                    </Disclosure>
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button
                            className={`flex items-center justify-between py-4 ${!open && "border-b border-gl-dark-3"}`}
                          >
                            <span className="font-semibold">Other</span>
                            <div className={`${open ? "rotate-180 transform" : ""} transition-all`}>
                              <Icon icon="heroicons-outline:chevron-down" className="text-2xl" />
                            </div>
                          </Disclosure.Button>
                          <Transition
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                          >
                            <Disclosure.Panel className="h-full border-b border-gl-dark-3">
                              <div className="grid grid-cols-12 gap-3.5 pb-4">
                                <div className="col-span-4">
                                  <div className="w-full">
                                    <div className="square rounded-lg overflow-hidden mb-1">
                                      <div className="square-content">
                                        <Image
                                          src="/images/placeholder.jpg"
                                          width="400"
                                          height="400"
                                          alt="Placeholder"
                                        />
                                      </div>
                                    </div>
                                    <p>Knight Hair</p>
                                  </div>
                                </div>
                                <div className="col-span-4">
                                  <div className="w-full">
                                    <div className="square rounded-lg overflow-hidden mb-1">
                                      <div className="square-content">
                                        <Image
                                          src="/images/placeholder.jpg"
                                          width="400"
                                          height="400"
                                          alt="Placeholder"
                                        />
                                      </div>
                                    </div>
                                    <p>Knight Hair</p>
                                  </div>
                                </div>
                                <div className="col-span-4">
                                  <div className="w-full">
                                    <div className="square rounded-lg overflow-hidden mb-1">
                                      <div className="square-content">
                                        <Image
                                          src="/images/placeholder.jpg"
                                          width="400"
                                          height="400"
                                          alt="Placeholder"
                                        />
                                      </div>
                                    </div>
                                    <p>Knight Hair</p>
                                  </div>
                                </div>
                              </div>
                            </Disclosure.Panel>
                          </Transition>
                        </>
                      )}
                    </Disclosure>
                  </div>
                )}
                {tab === 2 && (
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center w-full">
                      <Image
                        src="/images/hair.png"
                        width="100"
                        height="100"
                        alt="Hair"
                        className="shrink-0 w-14 h-14 rounded-lg overflow-hidden"
                      />
                      <div className="ml-4">
                        <p className="font-semibold">Blue</p>
                        <p className="text-xs text-gl-dark-3">Background</p>
                      </div>
                      <button
                        type="button"
                        className="flex items-center justify-center w-10 h-10 ml-auto bg-gl-red-2 rounded-full text-gl-red-1"
                      >
                        <Icon icon="heroicons-outline:trash" className="text-2xl" />
                      </button>
                    </div>
                    <div className="flex items-center w-full">
                      <Image
                        src="/images/hair.png"
                        width="100"
                        height="100"
                        alt="Hair"
                        className="shrink-0 w-14 h-14 rounded-lg overflow-hidden"
                      />
                      <div className="ml-4">
                        <p className="font-semibold">Blue</p>
                        <p className="text-xs text-gl-dark-3">Clothes</p>
                      </div>
                      <button
                        type="button"
                        className="flex items-center justify-center w-10 h-10 ml-auto bg-gl-red-2 rounded-full text-gl-red-1"
                      >
                        <Icon icon="heroicons-outline:trash" className="text-2xl" />
                      </button>
                    </div>
                    <div className="flex items-center w-full">
                      <Image
                        src="/images/hair.png"
                        width="100"
                        height="100"
                        alt="Hair"
                        className="shrink-0 w-14 h-14 rounded-lg overflow-hidden"
                      />
                      <div className="ml-4">
                        <p className="font-semibold">Blue</p>
                        <p className="text-xs text-gl-dark-3">Nose</p>
                      </div>
                      <button
                        type="button"
                        className="flex items-center justify-center w-10 h-10 ml-auto bg-gl-red-2 rounded-full text-gl-red-1"
                      >
                        <Icon icon="heroicons-outline:trash" className="text-2xl" />
                      </button>
                    </div>
                    <div className="flex items-center w-full">
                      <Image
                        src="/images/hair.png"
                        width="100"
                        height="100"
                        alt="Hair"
                        className="shrink-0 w-14 h-14 rounded-lg overflow-hidden"
                      />
                      <div className="ml-4">
                        <p className="font-semibold">Blue</p>
                        <p className="text-xs text-gl-dark-3">Headgear</p>
                      </div>
                      <button
                        type="button"
                        className="flex items-center justify-center w-10 h-10 ml-auto bg-gl-red-2 rounded-full text-gl-red-1"
                      >
                        <Icon icon="heroicons-outline:trash" className="text-2xl" />
                      </button>
                    </div>
                    <div className="flex items-center w-full">
                      <Image
                        src="/images/hair.png"
                        width="100"
                        height="100"
                        alt="Hair"
                        className="shrink-0 w-14 h-14 rounded-lg overflow-hidden"
                      />
                      <div className="ml-4">
                        <p className="font-semibold">Blue</p>
                        <p className="text-xs text-gl-dark-3">Other</p>
                      </div>
                      <button
                        type="button"
                        className="flex items-center justify-center w-10 h-10 ml-auto bg-gl-red-2 rounded-full text-gl-red-1"
                      >
                        <Icon icon="heroicons-outline:trash" className="text-2xl" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="flex w-full overflow-auto">
            <div className="w-full relative">
              <div className="absolute top-6 right-6 flex items-center space-x-4 justify-self-end">
                <ButtonV2>
                  <span>Discard</span>
                </ButtonV2>
                <ButtonV2 variant="gl-1">
                  <span>Save</span>
                </ButtonV2>
              </div>
              <div className="w-full max-w-[400px] p-6 pb-20 mx-auto">
                <div className="text-center mb-6">
                  <p>
                    Page 1 - <span className="text-gl-dark-2">Add page title</span>
                  </p>
                </div>
                <div className="flex items-center mb-6">
                  <button
                    type="button"
                    className="flex items-center px-3 py-2 space-x-2 bg-gl-light-1 rounded-full text-xs"
                  >
                    <Icon icon="clarity:animation-line" className="text-base" />
                    <span>Animation</span>
                  </button>
                  <div className="flex items-center ml-3 divide-x divide-gl-dark-2 rounded-full overflow-hidden">
                    <button type="button" className="flex items-center px-3 p-2 space-x-3 bg-gl-light-1 text-xs">
                      <Icon icon="heroicons-outline:refresh" className="text-base" />
                    </button>
                    <button type="button" className="flex items-center px-3 p-2 space-x-3 bg-gl-light-1 text-xs">
                      <Icon icon="heroicons-outline:document-duplicate" className="text-base" />
                    </button>
                    <button type="button" className="flex items-center px-3 p-2 space-x-3 bg-gl-light-1 text-xs">
                      <Icon icon="heroicons-outline:download" className="text-base" />
                    </button>
                  </div>
                  <div className="flex items-center ml-auto divide-x divide-gl-dark-2 rounded-full overflow-hidden">
                    <button type="button" className="flex items-center px-3 p-2 space-x-3 bg-gl-light-1 text-xs">
                      <Icon icon="heroicons-outline:plus" className="text-base" />
                    </button>
                    <button type="button" className="flex items-center px-3 p-2 space-x-3 bg-gl-light-1 text-xs">
                      <Icon icon="heroicons-outline:trash" className="text-base" />
                    </button>
                  </div>
                </div>
                <div className="square mb-4">
                  <div className="square-content">
                    <Image src="/images/nft-1.jpg" width="400" height="400" alt="NFT" />
                  </div>
                </div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-6 text-gl-dark-2">
                    <p>1000 px</p>
                    <p>1000 px</p>
                  </div>
                  <select>
                    <option value="">PNG</option>
                  </select>
                </div>
                <ButtonV2 variant="gl-3" className="w-full">
                  <span>Add Page</span>
                </ButtonV2>
              </div>

              <div className={`${expand && "fixed w-full bottom-0 left-0 bg-white"}`}>
                {expand && <div className="absolute top-0 left-0 w-screen h-screen z-10 bg-gl-dark-1/50"></div>}
                <div className="relative border-t border-gl-dark-3 px-14 py-6">
                  <div
                    className="absolute left-1/2 -top-4 transform -translate-x-1/2 h-4 px-10 bg-white rounded-tl-lg rounded-tr-lg border-l border-t border-r border-gl-dark-3 cursor-pointer"
                    onClick={() => setExpand(!expand)}
                  >
                    <div className={`${expand ? "rotate-180" : ""} transition-all`}>
                      <Icon icon="heroicons-outline:chevron-up" />
                    </div>
                  </div>

                  {expand && (
                    <div className="w-full flex items-center justify-between mb-8">
                      <input
                        type="text"
                        className=" w-full max-w-[500px] px-4 py-2 mb-2 border border-gl-dark-3 rounded-lg text-sm"
                        placeholder="Search"
                      />
                      <ButtonV2 variant="gl-blue-2">
                        <span>Download</span>
                      </ButtonV2>
                    </div>
                  )}

                  <div className="w-full flex items-center">
                    <div className="w-20 rounded-lg overflow-hidden mr-4">
                      <div className="square">
                        <div className="square-content">
                          <Image src="/images/nft-1.jpg" width="400" height="400" alt="NFT" />
                        </div>
                      </div>
                    </div>
                    <div className="w-20 rounded-lg overflow-hidden mr-4">
                      <div className="square">
                        <div className="square-content">
                          <Image src="/images/nft-1.jpg" width="400" height="400" alt="NFT" />
                        </div>
                      </div>
                    </div>
                    <div className="w-20 rounded-lg overflow-hidden mr-4">
                      <div className="square">
                        <div className="square-content">
                          <div className="flex items-center justify-center w-full h-full bg-gl-blue-2">
                            <Icon icon="heroicons-outline:plus" className="text-2xl text-gl-blue-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gl-dark-3 p-3">
                  <div className="w-full flex items-center justify-between">
                    <div className="flex items-center space-x-14">
                      <a href="#" className="flex items-center space-x-4">
                        <Icon icon="heroicons-outline:clipboard" className="text-lgF" />
                        <span className="text-xs">Notes</span>
                      </a>
                      <p className="text-xs">Page 1 of 1</p>
                    </div>
                    <div className="flex items-center space-x-6">
                      <p className="text-xs">50%</p>
                      <Icon icon="tabler:layers-subtract" className="text-xl" />
                      <Icon icon="majesticons:maximize" className="text-xl" />
                      <Icon icon="material-symbols:info-outline-rounded" className="text-xl" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default ArtGeneratorArt;
