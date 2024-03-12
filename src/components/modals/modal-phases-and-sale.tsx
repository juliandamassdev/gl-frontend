import { Fragment, useEffect, useRef, useState } from "react";

import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Icon } from "@iconify/react";
import * as Yup from "yup";

import "swiper/css";
import InputField from "../forms/input-field";
import Button from "../buttons/button";
import ButtonV2 from "../buttons/button-v2";
import ModalAllowlist from "./modal-allowlist";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SelectField from "../forms/select-field";

interface ModalPhasesAndSaleProps {
  show: boolean;
  type?: "add" | "edit";
  onAdd?: (data: any) => void;
  onClose?: (close: boolean) => void;
}

const ModalPhasesAndSale = ({ show, type, onAdd, onClose }: ModalPhasesAndSaleProps) => {
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalSubtitle, setModalSubtitle] = useState<string>("");
  const [modalButtonSubmitText, setModalButtonSubmitText] = useState<string>("");
  const [isShowModalAllowlist, setIsShowModalAllowlist] = useState<boolean>(false);

  const [isShow, setIsModalShow] = useState<boolean>(show);

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

  // Add Phases and Sale

  const phasesSaleSchema = Yup.object().shape({
    nameOfPhase: Yup.string().required("Name of phase is required"),
    supply: Yup.number().nullable().typeError("Supply is required").required("Supply is required"),
    isPrice: Yup.boolean().required(),
    price: Yup.number()
      .required()
      .typeError("Price is required")
      .when("isPrice", {
        is: true,
        then: schema => schema.required("Price is required"),
        otherwise: schema => schema.notRequired(),
      }),
    isPerWalletMaximum: Yup.boolean().required(),
    perWalletMaximum: Yup.number()
      .required()
      .typeError("Per wallet maximum is required")
      .when("isPerWalletMaximum", {
        is: true,
        then: schema => schema.required("Per wallet maximum is required"),
        otherwise: schema => schema.notRequired(),
      }),
    isDuration: Yup.boolean().required(),
    duration: Yup.number()
      .required()
      .typeError("Price is required")
      .when("isDuration", {
        is: true,
        then: schema => schema.required("Price is required"),
        otherwise: schema => schema.notRequired(),
      }),
  });

  const {
    register: registerPhasesSale,
    handleSubmit: handleSubmitPhasesSale,
    formState: formStatePhasesSale,
    watch: watchPhasesSale,
    reset,
  } = useForm({
    resolver: yupResolver(phasesSaleSchema),
  });

  const { errors: errorsPhasesSale } = formStatePhasesSale;

  const handleAddPhasesAndSale = (data: any) => {
    if (onAdd) {
      onAdd(data);
      reset({
        nameOfPhase: "",
        supply: undefined,
        isPrice: false,
        price: undefined,
        isPerWalletMaximum: false,
        perWalletMaximum: undefined,
        isDuration: false,
        duration: undefined,
      });
      closeModal();
    }
  };

  return (
    <>
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
                      <h2 className="text-[32px] font-bold">{modalTitle}</h2>
                      <p className="text-xl text-gl-6 font-light">
                        Start configuring your Collection with a few key details
                      </p>
                    </div>

                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-6">
                        <InputField
                          label="Name of Phase"
                          placeholder="Generate Phase"
                          {...registerPhasesSale("nameOfPhase")}
                          error={errorsPhasesSale.nameOfPhase?.message}
                        />
                      </div>
                      <div className="col-span-6">
                        <InputField
                          type="number"
                          label="Supply"
                          placeholder="0"
                          {...registerPhasesSale("supply")}
                          error={errorsPhasesSale.supply?.message}
                        />
                      </div>
                      <div className="col-span-12">
                        <div className="flex items-center justify-between space-x-4">
                          <InputField
                            type="number"
                            label="Price"
                            placeholder="0"
                            disabled={!watchPhasesSale("isPrice")}
                            {...registerPhasesSale("price")}
                            error={errorsPhasesSale.price?.message}
                          />
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              value=""
                              className="sr-only peer"
                              {...registerPhasesSale("isPrice")}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                      <div className="col-span-12">
                        <div className="flex items-center justify-between space-x-4">
                          <InputField
                            label="Per Wallet Maximum"
                            placeholder="0"
                            disabled={!watchPhasesSale("isPerWalletMaximum")}
                            {...registerPhasesSale("perWalletMaximum")}
                            error={errorsPhasesSale.perWalletMaximum?.message}
                          />
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              value=""
                              className="sr-only peer"
                              {...registerPhasesSale("isPerWalletMaximum")}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                      <div className="col-span-12">
                        <div className="flex items-center justify-between space-x-4">
                          <SelectField
                            label="Duration"
                            placeholder="Duration"
                            disabled={!watchPhasesSale("isDuration")}
                            {...registerPhasesSale("duration")}
                            error={errorsPhasesSale.duration?.message}
                          >
                            <option value="1440">24 hours</option>
                          </SelectField>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              value=""
                              className="sr-only peer"
                              {...registerPhasesSale("isDuration")}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* <hr className="my-8" />

                    <div className="mb-6">
                      <div className="flex items-center justify-between">
                        <h3 className="flex items-center text-2xl font-bold">
                          Allowlist <span className="ml-2 text-base text-gl-5 font-normal">(Optional)</span>
                        </h3>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      <p className="text-c-3">
                        Create a specific Wallet Address that are allowed to mint during this Minting Phase.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <ButtonV2
                        variant="gl-5-outline"
                        size="sm"
                        className="w-full space-x-2"
                        onClick={() => {
                          setIsShowModalAllowlist(true);
                          setIsModalShow(false);
                        }}
                      >
                        <span className="font-medium">Create Allowlist</span>
                        <Icon icon="heroicons-outline:plus" className="text-2xl" />
                      </ButtonV2>
                      <div className="px-6 divide-y divide-gl-5 border border-gl-5 rounded-lg">
                        <button className="flex items-center py-4 space-x-2">
                          <Icon icon="heroicons-outline:plus" className="text-2xl" />
                          <span>Add new</span>
                        </button>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center py-4 space-x-2">
                            <Icon icon="heroicons-outline:check" className="text-2xl" />
                            <span>Generate list</span>
                            <span className="text-gl-5">(4 addresses)</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <button>
                              <Icon icon="heroicons-outline:pencil-alt" className="text-2xl" />
                            </button>
                            <button>
                              <Icon icon="heroicons-outline:trash" className="text-2xl text-gl-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div> */}

                    {type === "add" && (
                      <div className="flex items-center justify-end mt-12 space-x-4">
                        <ButtonV2 variant="base" size="base" onClick={closeModal}>
                          <span>Cancel</span>
                        </ButtonV2>
                        <ButtonV2 variant="gl-1" size="base" onClick={handleSubmitPhasesSale(handleAddPhasesAndSale)}>
                          <span>Add</span>
                        </ButtonV2>
                      </div>
                    )}

                    {type === "edit" && (
                      <div className="flex items-center justify-end mt-12 space-x-4">
                        <ButtonV2 variant="base" size="base" onClick={closeModal}>
                          <span>Cancel</span>
                        </ButtonV2>
                        <ButtonV2 variant="gl-1" size="base" onClick={closeModal}>
                          <span>Save changes</span>
                        </ButtonV2>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <ModalAllowlist show={isShowModalAllowlist} />
    </>
  );
};

export default ModalPhasesAndSale;
