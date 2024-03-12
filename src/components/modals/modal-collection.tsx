import { Fragment, useEffect, useRef, useState } from "react";

import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Icon } from "@iconify/react";

import "swiper/css";
import InputField from "../forms/input-field";
import Button from "../buttons/button";

interface ModalCollectionProps {
  isOpen: boolean;
  onClose?: (close: boolean) => void;
  type?: "add" | "setting";
}

const ModalCollection = ({ isOpen, onClose, type }: ModalCollectionProps) => {
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalButtonSubmitText, setModalButtonSubmitText] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);

  useEffect(() => {
    if (type === "add") {
      setModalTitle("Add a collection");
      setModalButtonSubmitText("Add Collection");
    }
    if (type === "setting") {
      setModalTitle("Settings");
      setModalButtonSubmitText("Save Changes");
    }
  }, [type]);

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
              <Dialog.Panel className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-xl text-left overflow-hidden transform transition-all">
                <div className="text-right">
                  <button className="relative" onClick={closeModal}>
                    <Icon icon="heroicons-outline:x" className="text-2xl" />
                  </button>
                </div>

                <div>
                  <div className="mb-10 space-y-2">
                    <h2 className="text-[32px] font-bold">{modalTitle}</h2>
                    <p className="text-xl text-gl-6 font-light">
                      Start configuring your Collection with a few key details{" "}
                    </p>
                  </div>
                  <div className="mb-10">
                    <InputField label="Collection Name" placeholder="Enter a name" />
                  </div>
                  <div className="space-y-4">
                    <h6 className="text-xl font-bold">Collection thumbnail</h6>
                    <div className="w-full">
                      <input id="collection-file" type="file" className="hidden" />
                      <label
                        htmlFor="collection-file"
                        className="w-full flex items-center p-4 space-x-10 border border-gl-5 rounded-2xl cursor-pointer"
                      >
                        <div className="flex items-center justify-center w-25 h-25 bg-gl-3">
                          <Icon icon="heroicons-outline:cloud-upload" className="text-5xl" />
                        </div>
                        <p className="text-xl font-bold">Select media to upload</p>
                      </label>
                    </div>
                    {type === "setting" && (
                      <Button
                        type="gl-4"
                        size="sm"
                        icon={<Icon icon="heroicons-outline:trash" />}
                        text="Delete Collection"
                        className="w-full rounded-lg"
                      />
                    )}
                  </div>
                  <div className="mt-13">
                    <Button type="gl-1" size="lg" text={modalButtonSubmitText} className="w-full rounded-lg" />
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

export default ModalCollection;
