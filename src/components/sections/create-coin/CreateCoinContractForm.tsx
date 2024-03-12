import ButtonV2 from "@/components/buttons/button-v2";
import InputField from "@/components/forms/input-field";
import InputFieldV2 from "@/components/forms/input-field-v2";
import SelectField from "@/components/forms/select-field";
import { Menu, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { deployCoinMaker } from "@/services/ChainCoinMaker";

interface ICreateCoinContractForm {
  coin: any;
}

const CreateCoinContractForm = ({ coin }: ICreateCoinContractForm) => {
  const [step, setStep] = useState<number>(1);

  /**
   * Contract form step 1
   */
  const contractFormStep1Schema = Yup.object().shape({
    network: Yup.string().required("Network is required"),
    tokenName: Yup.string().required("Token name is required"),
    tokenSymbol: Yup.string().required("Token symbol is required"),
    decimal: Yup.string().required("Decimal is required"),
  });

  const {
    register: registerContractFormStep1,
    handleSubmit: handleSubmitContractFormStep1,
    formState: formStateContractFormStep1,
    getValues: getValuesContractFormStep1,
    watch: watchContractFormStep1,
  } = useForm({
    resolver: yupResolver(contractFormStep1Schema),
  });

  /**
   * Contract form step 2
   */
  const contractFormStep2Schema = Yup.object().shape({
    supplyType: Yup.string().required("Supply type is required"),
    initialSupply: Yup.string().required("Initial supply is required"),
    maximumSupply: Yup.string().required("Maximum Supply is required"),
  });

  const {
    register: registerContractFormStep2,
    handleSubmit: handleSubmitContractFormStep2,
    formState: formStateContractFormStep2,
    getValues: getValuesContractFormStep2,
  } = useForm({
    resolver: yupResolver(contractFormStep2Schema),
  });

  /**
   * Contract form step 3
   */
  const contractFormStep3Schema = Yup.object().shape({
    noCopyrightLink: Yup.boolean().required("No copyright link is required"),
    burnable: Yup.boolean().required("Burnable is required"),
    pauseable: Yup.boolean().required("Pauseable is required"),
    recoverable: Yup.boolean().required("Recoverable is required"),
    antiWhale: Yup.boolean().required("Anti whale is required"),
    tax: Yup.boolean().required("Tax is required"),
  });

  const {
    register: registerContractFormStep3,
    handleSubmit: handleSubmitContractFormStep3,
    formState: formStateContractFormStep3,
    getValues: getValuesContractFormStep3,
    watch: watchContractFormStep3,
  } = useForm({
    resolver: yupResolver(contractFormStep3Schema),
  });

  const handleContractFormStep1 = () => {
    setStep(2);
  };

  const handleContractFormStep2 = () => {
    setStep(3);
  };

  const handleDeployCoin = async () => {
    try {
      const responseDeployCoinMaker = await deployCoinMaker(coin._id);
    } catch (error: any) {

    }
  };

  return (
    <>
      <header className="fixed left-0 top-0 z-10 flex items-center w-full h-25 bg-dark-header backdrop-blur-2xl text-white">
        <div className="w-full max-w-[1464px] mx-auto">
          <div className="flex items-center justify-between w-full px-4 lg:px-6">
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-1 rounded-2xl">
              <div className="flex items-center space-x-5">
                <ButtonV2 className="!rounded-full bg-white/10">
                  <Icon icon="heroicons-solid:puzzle" className="text-xl" />
                  <span>Edit Page</span>
                </ButtonV2>
                <ButtonV2 variant="1" className="!rounded-full">
                  <Icon icon="heroicons-solid:paper-airplane" className="text-xl" />
                  <span>Contract</span>
                </ButtonV2>
              </div>
            </div>
            <div className="flex items-center space-x-14">
              <Link href="/">
                <Image
                  src="/images/generate-labs-white-logo.png"
                  alt="Generate Labs"
                  width="400"
                  height="400"
                  className="w-[118px] h-auto"
                />
              </Link>
            </div>
            <div className="flex items-center space-x-4 text-c-1">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button as="div">
                    <ButtonV2 variant={"1"} rounded className="!px-3">
                      <Icon icon="heroicons-solid:user-circle" className="text-2xl" />
                    </ButtonV2>
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 origin-top-right py-2 mt-2 bg-white rounded-lg shadow-lg">
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <button className="flex items-center w-full px-6 py-4 space-x-2 text-left opacity-40">
                            <Icon icon="heroicons-outline:table" className="text-xl" />
                            <span className="whitespace-nowrap">My Collections</span>
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button className="flex items-center w-full px-6 py-4 space-x-2 text-left opacity-40">
                            <Icon icon="heroicons-outline:bell" className="text-xl" />
                            <span className="whitespace-nowrap">Notifications</span>
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button className="flex items-center w-full px-6 py-4 space-x-2 text-left opacity-40">
                            <Icon icon="heroicons-outline:puzzle" className="text-xl" />
                            <span className="whitespace-nowrap">Resources</span>
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button className="flex items-center w-full px-6 py-4 space-x-2 text-left opacity-40">
                            <Icon icon="heroicons-outline:cog" className="text-xl" />
                            <span className="whitespace-nowrap">Settings</span>
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className="flex items-center w-full px-6 py-4 space-x-2 text-left"
                            // onClick={handleLogout}
                          >
                            <Icon icon="heroicons-outline:logout" className="text-xl" />
                            <span className="whitespace-nowrap">Log out</span>
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <ButtonV2
                variant="1"
                className="bg-white/10 border-transparent"
                onClick={handleDeployCoin}
              >
                <Icon icon="heroicons-solid:arrow-narrow-right" className="text-lg" />
                <span>Deploy</span>
              </ButtonV2>
            </div>
          </div>
        </div>
      </header>

      <div className="pt-25 overflow-hidden">
        <div className="py-15">
          <div className="container">
            <div className="grid grid-cols-12 gap-28 px-10">
              <div className="col-span-5">
                <div className="mt-22 space-y-4">
                  <div className="square rounded-lg overflow-hidden mb-1">
                    <div className="square-content">
                      <div className="flex items-center justify-center w-full h-full rounded-2xl overflow-hidden">
                        <Image
                          src={coin.imageURL}
                          width="1200"
                          height="1200"
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-[40px] text-white font-bold">
                      {watchContractFormStep1("tokenName") ? getValuesContractFormStep1("tokenName") : "Token Name"}{" "}
                      <span className="text-xl text-c-5 uppercase">
                        {watchContractFormStep1("tokenSymbol") ? getValuesContractFormStep1("tokenSymbol") : "SYM"}
                      </span>
                    </p>
                  </div>
                  {formStateContractFormStep2.isSubmitSuccessful && (
                    <>
                      <div className="px-8 py-10 bg-c-1 rounded-3xl">
                        <div className="flex items-center justify-between mb-9">
                          <p className="text-2xl text-white font-bold">Supply</p>
                          <Icon icon="heroicons-solid:information-circle" className="text-xl text-white" />
                        </div>
                        <div className="space-y-8">
                          <div className="flex items-center justify-between">
                            <p className="text-white font-medium">Supply Type</p>
                            <div className="px-4 py-0.5 bg-c-10 rounded-full text-white capitalize">
                              {getValuesContractFormStep2("supplyType")}
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-white font-medium">Initial Supply</p>
                            <div className="px-4 py-0.5 bg-c-10 rounded-full text-white">
                              {getValuesContractFormStep2("initialSupply")}
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-white font-medium">Maximum Supply</p>
                            <div className="px-4 py-0.5 bg-c-10 rounded-full text-white">
                              {getValuesContractFormStep2("maximumSupply")}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="px-8 py-10 bg-c-1 rounded-3xl">
                        <div className="flex items-center justify-between mb-9">
                          <p className="text-2xl text-white font-bold">Options</p>
                          <Icon icon="heroicons-solid:information-circle" className="text-xl text-white" />
                        </div>
                        <div className="space-y-8">
                          <div className="flex items-center justify-between">
                            <p className="text-white font-medium">No copyright link</p>
                            <div className="px-4 py-0.5 bg-c-10 rounded-full text-white capitalize">
                              {watchContractFormStep3("noCopyrightLink") ? "Enabled" : "Disabled"}
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-white font-medium">Burnable </p>
                            <div className="px-4 py-0.5 bg-c-10 rounded-full text-white">
                              {watchContractFormStep3("burnable") ? "Enabled" : "Disabled"}
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-white font-medium">Pausable</p>
                            <div className="px-4 py-0.5 bg-c-10 rounded-full text-white">
                              {watchContractFormStep3("pauseable") ? "Enabled" : "Disabled"}
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-white font-medium">Recoverable</p>
                            <div className="px-4 py-0.5 bg-c-10 rounded-full text-white">
                              {watchContractFormStep3("recoverable") ? "Enabled" : "Disabled"}
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-white font-medium">Anti Whale</p>
                            <div className="px-4 py-0.5 bg-c-10 rounded-full text-white">
                              {watchContractFormStep3("antiWhale") ? "Enabled" : "Disabled"}
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-white font-medium">Tax</p>
                            <div className="px-4 py-0.5 bg-c-10 rounded-full text-white">
                              {watchContractFormStep3("tax") ? "Enabled" : "Disabled"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {/* <div className="px-8 py-10 bg-c-1 rounded-3xl">
                    <div className="flex items-center justify-between mb-9">
                      <p className="text-2xl text-white font-bold">Options</p>
                      <Icon icon="heroicons-solid:information-circle" className="text-xl text-white" />
                    </div>
                    <div className="space-y-8">
                      <div className="flex items-center justify-between">
                        <p className="text-white font-medium">Supply type</p>
                        <div className="px-4 py-0.5 bg-c-10 rounded-full text-white">Ethereum</div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="col-span-7">
                <div className="w-full p-6 pt-10 bg-white rounded-3xl">
                  <Image
                    src={`/temp/step-${step}.png`}
                    width="700"
                    height="700"
                    alt=""
                    className="max-w-[400px] mb-10 mx-auto"
                  />
                  <div className="mb-10 space-y-1">
                    <p className="text-2xl font-bold">Configure your Coin Token</p>
                    <p className="text-sm">Start configuring your token with a few key details </p>
                  </div>
                  {step === 1 && (
                    <>
                      <div className="mb-20 space-y-6">
                        <SelectField
                          {...registerContractFormStep1("network")}
                          label="Network"
                          placeholder="Network"
                          error={formStateContractFormStep1.errors.network?.message}
                        >
                          <option value="ethereum">Ethereum</option>
                        </SelectField>
                        <InputField
                          {...registerContractFormStep1("tokenName")}
                          label="Token name"
                          placeholder="Token name"
                          info="The name of your token"
                          error={formStateContractFormStep1.errors.tokenName?.message}
                        />
                        <InputField
                          {...registerContractFormStep1("tokenSymbol")}
                          label="Token symbol"
                          placeholder="SYM"
                          info="Your token's symbol (e.g ETH)"
                          error={formStateContractFormStep1.errors.tokenSymbol?.message}
                        />
                        <InputField
                          {...registerContractFormStep1("decimal")}
                          label="Decimal"
                          placeholder="18"
                          info="The number of decimal of your token (default 18)"
                          error={formStateContractFormStep1.errors.decimal?.message}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <ButtonV2>
                          <Icon icon="heroicons-solid:arrow-narrow-left" className="text-lg" />
                          <span>Back</span>
                        </ButtonV2>
                        <ButtonV2 variant="2" onClick={handleSubmitContractFormStep1(handleContractFormStep1)}>
                          <Icon icon="heroicons-solid:arrow-narrow-right" className="text-lg" />
                          <span>Continue</span>
                        </ButtonV2>
                      </div>
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <div className="mb-20 space-y-6">
                        <SelectField
                          {...registerContractFormStep2("supplyType")}
                          label="Supply type"
                          placeholder="Supply type"
                          info="Fixed / Capped / Unlimited"
                          error={formStateContractFormStep2.errors.supplyType?.message}
                        >
                          <option value="fixed">Fixed</option>
                          <option value="cappe">Cappe</option>
                          <option value="unlimited">Unlimited</option>
                        </SelectField>
                        <InputField
                          {...registerContractFormStep2("initialSupply")}
                          label="Initial Supply"
                          placeholder="1 000 000"
                          info="The number of coins minted during the creation of the contract"
                          error={formStateContractFormStep2.errors.initialSupply?.message}
                        />
                        <InputField
                          {...registerContractFormStep2("maximumSupply")}
                          label="Maximum Supply"
                          placeholder="1 000 000"
                          info="The maximum number of coins ever minted"
                          error={formStateContractFormStep2.errors.maximumSupply?.message}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <ButtonV2>
                          <Icon icon="heroicons-solid:arrow-narrow-left" className="text-lg" />
                          <span>Back</span>
                        </ButtonV2>
                        <ButtonV2 variant="2" onClick={handleSubmitContractFormStep2(handleContractFormStep2)}>
                          <Icon icon="heroicons-solid:arrow-narrow-right" className="text-lg" />
                          <span>Continue</span>
                        </ButtonV2>
                      </div>
                    </>
                  )}
                  {step === 3 && (
                    <>
                      <div className="mb-20 space-y-6">
                        <div className="flex items-center justify-between space-x-4">
                          <div className="space-y-1.5">
                            <p className="font-bold">No copyright link</p>
                            <p className="text-sm text-c-5">
                              A link pointing to this page will be added in the description of your contract{" "}
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              {...registerContractFormStep3("noCopyrightLink")}
                              type="checkbox"
                              value=""
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between space-x-4">
                          <div className="space-y-1.5">
                            <p className="font-bold">Burnable</p>
                            <p className="text-sm text-c-5">Allow your tokens to be burned</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              {...registerContractFormStep3("burnable")}
                              type="checkbox"
                              value=""
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between space-x-4">
                          <div className="space-y-1.5">
                            <p className="font-bold">Pausable</p>
                            <p className="text-sm text-c-5">Allow your tokens to be paused</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              {...registerContractFormStep3("pauseable")}
                              type="checkbox"
                              value=""
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between space-x-4">
                          <div className="space-y-1.5">
                            <p className="font-bold">Recoverable</p>
                            <p className="text-sm text-c-5">Allow to recover any BEP20 tokens sent to your contract</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              {...registerContractFormStep3("recoverable")}
                              type="checkbox"
                              value=""
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between space-x-4">
                          <div className="space-y-1.5">
                            <p className="font-bold">Anti Whale</p>
                            <p className="text-sm text-c-5">Limit the maximum token holding per wallet.</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              {...registerContractFormStep3("antiWhale")}
                              type="checkbox"
                              value=""
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between space-x-4">
                          <div className="space-y-1.5">
                            <p className="font-bold">Tax</p>
                            <p className="text-sm text-c-5">Add a tax on transactions.</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input {...registerContractFormStep3("tax")} type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        {watchContractFormStep3("tax") && (
                          <div className="px-2 space-y-10">
                            <div className="grid grid-cols-3 gap-4">
                              <InputField label="Buy" placeholder="0 %" />
                              <InputField label="Sell" placeholder="0 %" />
                              <InputField label="Transfer" placeholder="0 %" />
                            </div>
                            <div>
                              <div className="space-y-1.5 mb-4">
                                <p className="font-bold">Breakdown of taxes</p>
                                <p className="text-sm text-c-5">Burn + Liquidity + Team = 100%</p>
                              </div>
                              <div className="grid grid-cols-3 gap-4">
                                <InputField label="Buy" placeholder="0 %" />
                                <InputField label="Sell" placeholder="0 %" />
                                <InputField label="Transfer" placeholder="0 %" />
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center justify-between mb-4">
                                <p className="font-bold">Team Address</p>
                                <ButtonV2 variant="4" size="xs">
                                  <Icon icon="heroicons-solid:plus" />
                                  <span>Add Address</span>
                                </ButtonV2>
                              </div>
                              <div className="flex items-center space-x-3">
                                <InputFieldV2 placeholder="0" />
                                <ButtonV2 variant="7" size="base-square">
                                  <Icon icon="heroicons-solid:trash" className="text-xl" />
                                </ButtonV2>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <ButtonV2>
                          <Icon icon="heroicons-solid:arrow-narrow-left" className="text-lg" />
                          <span>Back</span>
                        </ButtonV2>
                        <ButtonV2 variant="2" onClick={handleDeployCoin}>
                          <Icon icon="heroicons-solid:arrow-narrow-right" className="text-lg" />
                          <span>Deploy</span>
                        </ButtonV2>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCoinContractForm;
