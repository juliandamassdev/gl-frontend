import { Fragment, useEffect, useState } from "react";

import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import ButtonV2 from "../buttons/button-v2";
import moment from "moment";

interface ModalCollectiblePublishedProps {
  isOpen: boolean;
  title: string;
  collectibleImage: string;
  url: string;
  onClose?: (close: boolean) => void;
}

const ModalCollectiblePublished = ({
  isOpen,
  title,
  collectibleImage,
  url,
  onClose,
}: ModalCollectiblePublishedProps) => {
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
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
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
              <Dialog.Panel className="w-full max-w-2xl rounded-2xl bg-white px-8 pt-10 pb-6 shadow-xl text-left overflow-hidden transform transition-all">
                <div className="absolute right-4 top-4">
                  <button
                    className="flex items-center justify-center w-[42px] h-[42px] bg-gl-3 rounded-full"
                    onClick={closeModal}
                  >
                    <Icon icon="heroicons-outline:x" className="text-2xl" />
                  </button>
                </div>

                <div>
                  <div className="mb-8">
                    <h2 className="text-[32px] font-bold">Your digital collectible is published!</h2>
                  </div>
                  <div className="flex p-4 bg-gl-3 mb-8 rounded-xl">
                    <Image
                      src={collectibleImage}
                      width="150"
                      height="150"
                      alt="Collectible"
                      className="flex-shrink-0 w-full max-w-[146px] h-full max-h-[146px] mr-6 rounded-lg"
                    />
                    <div className="flex flex-col justify-between w-full">
                      <div className="mb-4">
                        <p className="text-xl font-medium">{title}</p>
                        <p className="text-sm text-gl-6">Published {moment().format("MMM DD, YYYY")}</p>
                      </div>
                      <div>
                        <p className="mb-4 text-gl-5 text-sm">Share a linkn to</p>
                        <div className="flex items-center space-x-2">
                          <button>
                            <Icon icon="mdi:facebook" className="text-2xl" />
                          </button>
                          <button>
                            <Icon icon="uil:twitter" className="text-2xl" />
                          </button>
                          <button>
                            <Icon icon="mdi:instagram" className="text-2xl" />
                          </button>
                          <button>
                            <Icon icon="ic:baseline-discord" className="text-2xl" />
                          </button>
                          <button>
                            <Icon icon="ic:baseline-telegram" className="text-2xl" />
                          </button>
                          <button>
                            <Icon icon="ci:code" className="text-2xl" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full px-3 py-2 border border-gl-5 rounded-xl">
                    <input type="text" value={url} className="w-full px-3 bg-white outline-none" disabled />
                    <ButtonV2 variant="1" onClick={() => navigator.clipboard.writeText(url)}>
                      Copy
                    </ButtonV2>
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

export default ModalCollectiblePublished;
