import { Fragment, useEffect, useRef, useState } from "react";

import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Icon } from "@iconify/react";

import "swiper/css";
import InputField from "../forms/input-field";
import Button from "../buttons/button";
import ButtonV2 from "../buttons/button-v2";

interface ModalAllowlistProps {
  show: boolean;
  type?: "add" | "edit";
  onClose?: (close: boolean) => void;
}

const ModalAllowlist = ({ show, onClose, type }: ModalAllowlistProps) => {
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalSubtitle, setModalSubtitle] = useState<string>("");
  const [modalButtonSubmitText, setModalButtonSubmitText] = useState<string>("");

  const [isShow, setIsModalShow] = useState<boolean>(show);

  const [walletAddresses, setWalletAddresses] = useState<"upload" | "manual">("upload");

  useEffect(() => {
    if (type === "add") {
      setModalTitle("Add Phases and Sale");
    }
    if (type === "edit") {
      setModalTitle("Edit Public Sale");
      setModalSubtitle("Set base pricing and options for your Public Sale.");
      setModalButtonSubmitText("Save Changes");
    }
  }, [type]);

  useEffect(() => {
    setIsModalShow(show);
  }, [show]);

  const closeModal = () => {
    setIsModalShow(false);
    if (onClose) {
      onClose(false);
    }
  };

  return (
    <Transition appear show={isShow} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
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
                    <h2 className="text-[32px] font-bold">Create allowlist</h2>
                  </div>

                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12">
                      <InputField label="Name" placeholder="ex. Generate list" />
                    </div>
                  </div>

                  <div className="mt-8 space-y-8">
                    <h2 className="font-bold">Wallet Addresses</h2>
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-6">
                        <ButtonV2
                          variant={walletAddresses === "upload" ? "gl-2" : "gl-5-outline"}
                          size="base"
                          className={`w-full ${walletAddresses === "upload" && "bg-black text-white"}`}
                          onClick={() => setWalletAddresses("upload")}
                        >
                          <span>Upload CSV</span>
                        </ButtonV2>
                      </div>
                      <div className="col-span-6">
                        <ButtonV2
                          variant={walletAddresses === "manual" ? "gl-2" : "gl-5-outline"}
                          size="base"
                          className={`w-full ${walletAddresses === "manual" && "bg-black text-white"}`}
                          onClick={() => setWalletAddresses("manual")}
                        >
                          <span>Manual</span>
                        </ButtonV2>
                      </div>
                    </div>
                    {walletAddresses === "upload" && (
                      <div className="flex flex-col items-center p-6 pt-2 bg-gl-blue-2 border border-gl-1 border-dashed rounded-xl">
                        <Image
                          src="/images/contract-review.png"
                          width="150"
                          height="150"
                          alt="Image"
                          className="w-28 h-auto mb-2"
                        />
                        <p className="text-c-3 font-medium">
                          <span className="text-gl-1">Browse</span> or <span className="text-gl-1">drag and drop</span>{" "}
                          CSV file
                        </p>
                      </div>
                    )}
                    {walletAddresses === "manual" && (
                      <textarea
                        placeholder="Type anything here"
                        className="w-full h-[216px] bg-transparent resize-none outline-none"
                      ></textarea>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-8 space-x-4">
                    <ButtonV2 variant="gl-5-outline" size="base" className="space-x-2" onClick={closeModal}>
                      <span>Allowlist CSV template</span>
                      <Icon icon="heroicons-outline:download" className="text-2xl" />
                    </ButtonV2>
                    <ButtonV2 variant="gl-1" size="base" onClick={closeModal}>
                      <span>Create allowlist</span>
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

export default ModalAllowlist;
