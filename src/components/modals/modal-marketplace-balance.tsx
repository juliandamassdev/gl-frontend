import { Dialog, Tab, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { unWrap, wrap } from "@/services/Wrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import ButtonV2 from "../buttons/button-v2";
import Image from "next/image";

interface IModalMarketplaceBalance {
  isOpen: boolean;
  onClose?: (close: boolean) => void;
}

const ModalMarketplaceBalance = ({ isOpen, onClose }: IModalMarketplaceBalance) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  // Form

  const convertSchema = Yup.object().shape({
    amount: Yup.string().required("Amount is required"),
  });

  const {
    register: registerConvert,
    handleSubmit: handleSubmitConvert,
    formState: formStateConvert,
    watch: watchConvert,
    reset: resetConvert,
    getValues: getValuesConvert,
  } = useForm({
    resolver: yupResolver(convertSchema),
  });

  const { errors: errorsConvert } = formStateConvert;

  const closeModal = () => {
    setIsModalOpen(false);
    if (onClose) {
      onClose(false);
    }
  };

  // Wrap

  const handleWrap = async () => {
    try {
      const response = await wrap({ price: getValuesConvert("amount") });
      console.log(response);
    } catch (error: any) {
      console.log(error);
      return;
    }
  };

  const handleUnWrap = async () => {
    try {
      const response = await unWrap({ price: getValuesConvert("amount") });
      console.log(response);
    } catch (error: any) {
      console.log(error);
      return;
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
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-xl text-left transition-all">
                <button className="absolute top-4 right-4" onClick={closeModal}>
                  <Icon icon="heroicons-outline:x" className="text-2xl" />
                </button>

                <div className="p-8 pt-10">
                  <h2 className="mb-10 text-2xl font-bold">Marketplace Balance</h2>

                  <div className="flex items-center justify-between px-4 mb-14">
                    <div className="flex items-center space-x-4">
                      <Image
                        src="/images/icon-metamask.png"
                        width="64"
                        height="64"
                        alt="Metamask"
                        className="w-12 h-1/2"
                      />
                      <button className="flex items-center p-3 space-x-2 bg-c-7 border border-c-7 rounded-2xl">
                        <span>0xb5ce...0b33</span>
                        <Icon icon="heroicons-solid:chevron-down" className="text-lg" />
                      </button>
                    </div>
                    <button className="flex items-center p-3 space-x-2 bg-white border border-c-5 rounded-2xl">
                      <span className="flex items-center space-x-2">
                        <Icon icon="logos:ethereum" className="text-lg" />
                        <span className="font-medium">Ethereum</span>
                        <span>•</span>
                        <span className="font-medium">$0.00 USD</span>
                      </span>
                      <Icon icon="heroicons-solid:chevron-down" className="text-lg" />
                    </button>
                  </div>

                  <div className="flex items-center mb-10">
                    <div className="flex-1 text-center">
                      <p className="mb-2 text-2xl font-semibold">
                        {watchConvert("amount") ? getValuesConvert("amount") : "0"} ETH
                      </p>
                      <p className="text-xl font-semibold">ETH balance</p>
                    </div>
                    <div>
                      <Icon icon="heroicons-solid:arrow-right" className="text-2xl" />
                    </div>
                    <div className="flex-1 text-center">
                      <p className="mb-2 text-2xl font-semibold">
                        {watchConvert("amount") ? getValuesConvert("amount") : "0"} WETH
                      </p>
                      <p className="text-xl font-semibold">Offers balance</p>
                    </div>
                  </div>

                  <div className="w-full border border-c-5 rounded-2xl">
                    <Tab.Group>
                      <Tab.List className="flex items-center border-b border-c-5">
                        <Tab as={Fragment}>
                          {({ selected }) => (
                            <div
                              className={`flex-1 py-3 -mb-px text-center border-b-[3px] font-semibold ${
                                selected ? "border-black text-c-1" : "border-transparent text-c-3"
                              } transition-all cursor-pointer`}
                              onClick={() => resetConvert()}
                            >
                              Wrap
                            </div>
                          )}
                        </Tab>
                        <Tab as={Fragment}>
                          {({ selected }) => (
                            <div
                              className={`flex-1 py-3 -mb-px text-center border-b-[3px] font-semibold ${
                                selected ? "border-black text-c-1" : "border-transparent text-c-3"
                              } transition-all cursor-pointer`}
                              onClick={() => resetConvert()}
                            >
                              Unwrap
                            </div>
                          )}
                        </Tab>
                      </Tab.List>
                      <Tab.Panels>
                        <Tab.Panel>
                          <div className="p-6">
                            <div className="relative py-2 mb-6 text-center">
                              <p className="inline-flex items-center space-x-2 font-semibold text-xl">
                                <input
                                  type="text"
                                  {...registerConvert("amount")}
                                  defaultValue="0"
                                  className="w-30 text-[40px] text-center outline-none"
                                />{" "}
                                <span>ETH</span>
                              </p>
                              <button className="absolute top-1/2 right-0 transform -translate-y-1/2 text-c-5">
                                Max
                              </button>
                            </div>
                            <ButtonV2
                              variant="1"
                              className="w-full !rounded-2xl"
                              onClick={handleSubmitConvert(handleWrap)}
                            >
                              Add to offer balance
                            </ButtonV2>
                          </div>
                        </Tab.Panel>
                        <Tab.Panel>
                          <div className="p-6">
                            <div className="relative py-2 mb-6 text-center">
                              <p className="inline-flex items-center space-x-2 font-semibold text-xl">
                                <input
                                  type="text"
                                  {...registerConvert("amount")}
                                  defaultValue="0"
                                  className="w-30 text-[40px] text-center outline-none"
                                />{" "}
                                <span>WETH</span>
                              </p>
                              <button className="absolute top-1/2 right-0 transform -translate-y-1/2 text-c-5">
                                Max
                              </button>
                            </div>
                            <ButtonV2 variant="1" className="w-full !rounded-2xl" onClick={() => handleUnWrap()}>
                              Withdraw from offer balance
                            </ButtonV2>
                          </div>
                        </Tab.Panel>
                      </Tab.Panels>
                    </Tab.Group>
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

export default ModalMarketplaceBalance;
