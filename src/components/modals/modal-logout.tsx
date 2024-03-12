import { Fragment, useEffect, useRef, useState } from "react";

import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Icon } from "@iconify/react";

import "swiper/css";
import InputField from "../forms/input-field";
import Button from "../buttons/button";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useDisconnect } from "wagmi";
import { Magic } from "magic-sdk";
import ButtonV2 from "../buttons/button-v2";

interface ModalLogoutProps {
  show: boolean;
  onClose?: (close: boolean) => void;
}

const ModalLogout = ({ show: isShow, onClose }: ModalLogoutProps) => {
  const router = useRouter();

  const { disconnect } = useDisconnect();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(isShow);

  useEffect(() => {
    setIsModalOpen(isShow);
  }, [isShow]);

  const closeModal = () => {
    setIsModalOpen(false);
    if (onClose) {
      onClose(false);
    }
  };

  const handleSignOut = async () => {
    const signedInType = getCookie("signed-in-type");

    if (signedInType === "email") {
      const magic = new Magic("pk_live_2B62C4CCA4D24902", {
        network: "mainnet",
      });

      try {
        await magic.wallet.disconnect();

        deleteCookie("signed-in-address");
        deleteCookie("signed-in-type");
        closeModal();
      } catch (error) {
        console.log(error);
      }
    }

    if (signedInType === "wallet") {
      disconnect();
      deleteCookie("signed-in-address");
      deleteCookie("signed-in-type");
      closeModal();
    }

    router.push("/auth");
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
              <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl text-left overflow-hidden transform transition-all">
                <div className="text-right">
                  <button className="relative" onClick={closeModal}>
                    <Icon icon="heroicons-outline:x" className="text-2xl" />
                  </button>
                </div>

                <div>
                  <div className="mb-10 space-y-2 text-center">
                    <div className="inline-flex items-center justify-center w-28 h-28 mb-8 bg-gl-4-hover rounded-full">
                      <Icon icon="heroicons-outline:logout" className="text-5xl text-gl-4" />
                    </div>
                    <h2 className="text-2xl font-bold">Already leaving?</h2>
                    <p className="text-xl text-gl-6 font-light">
                      We’’ll keep an eye on your Collections while your gone. And we will miss you a lot..
                    </p>
                  </div>
                  <div className="mt-8 space-y-2">
                    <ButtonV2 variant="gl-red-1" className="w-full" onClick={() => handleSignOut()}>
                      <span>Yes, log out</span>
                    </ButtonV2>
                    <ButtonV2 className="w-full" onClick={closeModal}>
                      <span>No, I am staying</span>
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

export default ModalLogout;
