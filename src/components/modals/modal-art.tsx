import { Fragment, useEffect, useRef, useState } from "react";

import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Link from "next/link";

interface ModalOnboardingProps {
  isOpen: boolean;
  onClose?: (close: boolean) => void;
}

const ModalOnboarding = ({ isOpen, onClose }: ModalOnboardingProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const closeModal = () => {
    setIsModalOpen(false);
    if (onClose) {
      onClose(false);
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
                <button className="absolute top-8 right-8" onClick={closeModal}>
                  <Icon icon="heroicons-outline:x" className="text-2xl" />
                </button>
                <div className="grid grid-cols-11 gap-8">
                  <div className="col-span-5">
                    <Image src="/images/onboarding-hero-art.jpg" width={1000} height={1000} alt="Onboarding" />
                  </div>
                  <div className="col-span-6">
                    <div className="flex flex-col h-full p-4">
                      <h2 className="text-5xl font-bold mb-2">Art Generator</h2>
                      <p className="font-light mb-8">
                        Bring your layers to life: Upload your artwork layers and unleash your creativity 🖌️ !
                      </p>
                      <div className="mb-10 space-y-8">
                        <div className="flex items-start space-x-6">
                          <Image src="/images/onboarding-art-craft.png" width="50" height="50" alt="Onboard welcome" />
                          <div>
                            <p className="text-[#292929]">
                              Craft unique masterpieces: Combine, edit, and arrange your layers to design one-of-a-kind
                              creations!
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-6">
                          <Image src="/images/onboarding-art-build.png" width="50" height="50" alt="Onboard welcome" />
                          <div>
                            <p className="text-[#292929]">
                              Build your NFT collection: Showcase your creations and curate a captivating collection.
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
                        <Link
                          href="/art-generator"
                          className="px-6 py-4 bg-[#2384F8] rounded-lg text-white text-center"
                          onClick={() => {}}
                        >
                          Try it out!
                        </Link>
                      </div>
                    </div>
                  </div>
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
