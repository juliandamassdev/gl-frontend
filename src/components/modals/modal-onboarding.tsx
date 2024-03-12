import { Fragment, useEffect, useRef, useState } from "react";

import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { setCookie } from "cookies-next";

interface ModalOnboardingProps {
  isOpen: boolean;
}

const ModalOnboarding = ({ isOpen }: ModalOnboardingProps) => {
  const swiperRef = useRef<any>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goToNextSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-2xl bg-white p-4 shadow-xl text-left transition-all">
                <button className="absolute top-8 right-8 z-2" onClick={closeModal}>
                  <Icon icon="heroicons-outline:x" className="text-2xl" />
                </button>
                <div>
                  <Swiper slidesPerView={1} ref={swiperRef}>
                    <SwiperSlide>
                      <div className="grid grid-cols-11 gap-8">
                        <div className="col-span-5">
                          <Image
                            src="/images/onboard-hero.jpg"
                            width={1000}
                            height={1000}
                            alt="Onboarding"
                            className="mb-4"
                          />
                          <div className="flex items-center space-x-4">
                            {new Array(4).fill("z").map((item, index: number) => (
                              <div
                                key={index}
                                className={`w-full h-2.5 rounded-full ${index === 0 ? "bg-c-2" : "bg-c-5"}`}
                              ></div>
                            ))}
                          </div>
                        </div>
                        <div className="col-span-6">
                          <div className="flex flex-col h-full p-4 pb-0">
                            <h2 className="text-5xl font-bold mb-2">Welcome</h2>
                            <p className="font-light mb-8">The easiest No-Code Tool for digital collectibles.</p>
                            <div className="mb-10 space-y-8">
                              <div className="flex items-start space-x-6">
                                <Image
                                  src="/images/onboarding-welcome-no-code.png"
                                  width="50"
                                  height="50"
                                  alt="Onboard welcome"
                                />
                                <div>
                                  <p className="text-xl font-bold mb-4">No-Code Tool</p>
                                  <p className="text-[#29292980]">
                                    Unleash your creativity with our Art Generator that enables you to build,create &
                                    generate- All without the need for coding expertise.
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-6">
                                <Image
                                  src="/images/onboarding-welcome-forms.png"
                                  width="50"
                                  height="50"
                                  alt="Onboard welcome"
                                />
                                <div>
                                  <p className="text-xl font-bold mb-4">Forms</p>
                                  <p className="text-[#29292980]">
                                    Explore our Forms page to effortlessly collect and manage your community!
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-6">
                                <Image
                                  src="/images/onboarding-welcome-marketplace.png"
                                  width="50"
                                  height="50"
                                  alt="Onboard welcome"
                                />
                                <div>
                                  <p className="text-xl font-bold mb-4">Marketplace</p>
                                  <p className="text-[#29292980]">
                                    Discover the Marketplace and create custom Mint Pages where you can showcase and
                                    sell your NFT creations!
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="text-center mt-auto">
                              <button
                                className="w-full px-6 py-4 bg-[#2384F8] rounded-lg text-white text-center"
                                onClick={goToNextSlide}
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="grid grid-cols-11 gap-8">
                        <div className="col-span-5">
                          <Image
                            src="/images/onboarding-hero-art.jpg"
                            width={1000}
                            height={1000}
                            alt="Onboarding"
                            className="mb-4"
                          />
                          <div className="flex items-center space-x-4">
                            {new Array(4).fill("z").map((item, index: number) => (
                              <div
                                key={index}
                                className={`w-full h-2.5 rounded-full ${index === 1 ? "bg-c-2" : "bg-c-5"}`}
                              ></div>
                            ))}
                          </div>
                        </div>
                        <div className="col-span-6">
                          <div className="flex flex-col h-full p-4 pb-0">
                            <h2 className="text-5xl font-bold mb-2">Art Generator</h2>
                            <p className="font-light mb-8">
                              Bring your layers to life: Upload your artwork layers and unleash your creativity 🖌️ !
                            </p>
                            <div className="mb-10 space-y-8">
                              <div className="flex items-start space-x-6">
                                <Image
                                  src="/images/onboarding-art-craft.png"
                                  width="50"
                                  height="50"
                                  alt="Onboard welcome"
                                />
                                <div>
                                  <p className="text-[#292929]">
                                    Craft unique masterpieces: Combine, edit, and arrange your layers to design
                                    one-of-a-kind creations!
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-6">
                                <Image
                                  src="/images/onboarding-art-build.png"
                                  width="50"
                                  height="50"
                                  alt="Onboard welcome"
                                />
                                <div>
                                  <p className="text-[#292929]">
                                    Build your NFT collection: Showcase your creations and curate a captivating
                                    collection.
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-6">
                                <Image
                                  src="/images/onboarding-art-monetize.png"
                                  width="50"
                                  height="50"
                                  alt="Onboard welcome"
                                />
                                <div>
                                  <p className="text-[#292929]">
                                    Monetize your talent: Explore the exciting possibilities of selling your digital
                                    collectibles.
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="text-center mt-auto">
                              <button
                                className="w-full px-6 py-4 bg-[#2384F8] rounded-lg text-white text-center"
                                onClick={goToNextSlide}
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="grid grid-cols-11 gap-8">
                        <div className="col-span-5">
                          <Image
                            src="/images/onboarding-hero-forms.jpg"
                            width={1000}
                            height={1000}
                            alt="Onboarding"
                            className="mb-4"
                          />
                          <div className="flex items-center space-x-4">
                            {new Array(4).fill("z").map((item, index: number) => (
                              <div
                                key={index}
                                className={`w-full h-2.5 rounded-full ${index === 2 ? "bg-c-2" : "bg-c-5"}`}
                              ></div>
                            ))}
                          </div>
                        </div>
                        <div className="col-span-6">
                          <div className="flex flex-col h-full p-4 pb-0">
                            <h2 className="text-5xl font-bold mb-2">Forms</h2>
                            <p className="font-light mb-8">
                              Coming Soon! Create customized forms for all your community needs and engagement.
                            </p>
                            <div className="mb-10 space-y-8">
                              <div className="flex items-start space-x-6">
                                <Image
                                  src="/images/onboarding-forms-custom.png"
                                  width="50"
                                  height="50"
                                  alt="Onboard welcome"
                                />
                                <div>
                                  <p className="text-[#292929]">
                                    Create custom forms: Easily design and customize forms to collect valuable
                                    information from your community.
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-6">
                                <Image
                                  src="/images/onboarding-forms-manage.png"
                                  width="50"
                                  height="50"
                                  alt="Onboard welcome"
                                />
                                <div>
                                  <p className="text-[#292929]">
                                    Manage events effortlessly: Create event registration forms from participants,
                                    making event planning a breeze.
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-6">
                                <Image
                                  src="/images/onboarding-forms-whitelist.png"
                                  width="50"
                                  height="50"
                                  alt="Onboard welcome"
                                />
                                <div>
                                  <p className="text-[#292929]">
                                    Create whitelists: Utilize our powerful form builder to create custom whitelists,
                                    for exclusive individuals or groups.
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="text-center mt-auto">
                              <button
                                className="w-full px-6 py-4 bg-[#2384F8] rounded-lg text-white text-center"
                                onClick={goToNextSlide}
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="grid grid-cols-11 gap-8">
                        <div className="col-span-5">
                          <Image
                            src="/images/onboarding-marketplace-hero.jpg"
                            width={1000}
                            height={1000}
                            alt="Onboarding"
                            className="mb-4"
                          />
                          <div className="flex items-center space-x-4">
                            {new Array(4).fill("z").map((item, index: number) => (
                              <div
                                key={index}
                                className={`w-full h-2.5 rounded-full ${index === 3 ? "bg-c-2" : "bg-c-5"}`}
                              ></div>
                            ))}
                          </div>
                        </div>
                        <div className="col-span-6">
                          <div className="flex flex-col h-full p-4 pb-0">
                            <h2 className="text-5xl font-bold mb-2">Marketplace</h2>
                            <p className="font-light mb-8">
                              Coming Soon! Create your own custom Marketplace for your Digital Collectibles.
                            </p>
                            <div className="mb-10 space-y-8">
                              <div className="flex items-start space-x-6">
                                <Image
                                  src="/images/onboarding-marketplace-choose.png"
                                  width="50"
                                  height="50"
                                  alt="Onboard welcome"
                                />
                                <div>
                                  <p className="text-[#292929]">
                                    Choose Your Design: Select from a range of stunning templates!
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-6">
                                <Image
                                  src="/images/onboarding-marketplace-upload.png"
                                  width="50"
                                  height="50"
                                  alt="Onboard welcome"
                                />
                                <div>
                                  <p className="text-[#292929]">
                                    Upload and Mint NFTs: Easily upload your digital artwork and images that you want to
                                    convert into an NFT.{" "}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-6">
                                <Image
                                  src="/images/onboarding-marketplace-manage.png"
                                  width="50"
                                  height="50"
                                  alt="Onboard welcome"
                                />
                                <div>
                                  <p className="text-[#292929]">
                                    Manage Collections and Listings: Organize your NFTs into collections and curate the
                                    listings on your marketplace.{" "}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="text-center mt-auto">
                              <button
                                className="w-full px-6 py-4 bg-[#2384F8] rounded-lg text-white text-center"
                                onClick={closeModal}
                              >
                                Got it!
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalOnboarding;
