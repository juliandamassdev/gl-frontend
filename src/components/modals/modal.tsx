import { Fragment, useEffect, useRef, useState } from "react";

import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Link from "next/link";

interface IModalMarketplaceBalance {
  isOpen: boolean;
  onClose?: (close: boolean) => void;
}

const ModalMarketplaceBalance = ({ isOpen, onClose }: IModalMarketplaceBalance) => {
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
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
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

                <div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum quos cum hic impedit iste delectus
                    consequuntur nesciunt harum officia obcaecati, aliquid vel praesentium dolorem tempore tenetur aut
                    deserunt adipisci! Nihil?
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalMarketplaceBalance;
