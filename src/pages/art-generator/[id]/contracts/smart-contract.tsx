import ButtonV2 from "@/components/buttons/button-v2";
import InputField from "@/components/forms/input-field";
import HeaderApp from "@/components/headers/header-app";
import ModalAllowlist from "@/components/modals/modal-allowlist";
import ModalPhasesAndSale from "@/components/modals/modal-phases-and-sale";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import SelectField from "@/components/forms/select-field";
import { errors } from "web3";
import { postCollections, postCollectionUploadImage } from "@/services/Collection";
import * as path from "path";
import { deploy } from "@/services/Chain";
import { toast } from "react-toastify";
import { IDeployPayload, IDeployPayloadPhases, IDeployPayloadRevenuesRoyalties } from "@/types/IChain";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { getCookie } from "cookies-next";
import LayoutDashboard from "@/layouts/LayoutDashboard";
import { useMCollections, useMCollectionUploadImage } from "@/queries/collection-queries";

const validFileExtensions = { image: ["jpg", "gif", "png", "jpeg", "svg", "webp"] };

const MAX_FILE_SIZE = 10240000;

const ArtGeneratorContractsSmartContract = () => {
  const router = useRouter();

  const [step, setStep] = useState<number>(1);

  const [phasesAndSale, setPhasesAndSale] = useState<any[]>([]);
  const [revenue, setRevenue] = useState<any[]>([]);
  const [royalties, setRoyalties] = useState<any[]>([]);
  const [teamMember, setTeamMember] = useState<any[]>([]);

  const [modalPhasesAndSale, setModalPhasesAndSale] = useState<{ show: boolean; type?: "add" | "edit" }>({
    show: false,
    type: "add",
  });
  const [isRevenueAdd, setIsRevenueAdd] = useState<boolean>(false);
  const [isRoyaltiesAdd, setIsRoyaltiesAdd] = useState<boolean>(false);
  const [isTeamMemberAdd, setIsTeamMemberAdd] = useState<boolean>(false);

  // Contract Information

  const contractInformationSchema = Yup.object().shape({
    contractName: Yup.string().required("Contract name is required"),
    symbol: Yup.string().required("Symbol is required"),
    network: Yup.string().required(),
  });

  const {
    register: registerContractInformation,
    handleSubmit: handleSubmitContractInformation,
    formState: formStateContractInformation,
    getValues: getValuesContractInformation,
  } = useForm({
    resolver: yupResolver(contractInformationSchema),
  });

  const { errors: errorsContractInformation } = formStateContractInformation;

  // Token Pricing

  const tokenPricingSchema = Yup.object().shape({
    isGlobalLimit: Yup.boolean(),
    globalLimit: Yup.number()
      .optional()
      .transform(value => (isNaN(value) ? undefined : value))
      .min(1, "Global limits must be greater than 0")
      .when("isGlobalLimit", {
        is: true,
        then: scheme => scheme.required("Global limits is required"),
      }),
  });

  const {
    register: registerTokenPricing,
    handleSubmit: handleSubmitTokenPricing,
    formState: formStateTokenPricing,
    getValues: getValuesTokenPricing,
    watch: watchTokenPricing,
  } = useForm({
    resolver: yupResolver(tokenPricingSchema),
  });

  const { errors: errorsTokenPricing } = formStateTokenPricing;

  // Revenue

  const revenueSchema = Yup.object().shape({
    walletAddress: Yup.string().required("Wallet address is required"),
    percentage: Yup.number().typeError("Percentage is required").required("Percentage is required"),
  });

  const {
    register: registerRevenue,
    handleSubmit: handleSubmitRevenue,
    formState: formStateRevenue,
    reset: resetRevenue,
    getValues: getValuesRevenue,
  } = useForm({
    resolver: yupResolver(revenueSchema),
  });

  const { errors: errorsRevenue } = formStateRevenue;

  // Royalties

  const royaltiesSchema = Yup.object().shape({
    walletAddress: Yup.string().required("Wallet address is required"),
    percentage: Yup.number().typeError("Percentage is required").required("Percentage is required"),
  });

  const {
    register: registerRoyalties,
    handleSubmit: handleSubmitRoyalties,
    formState: formStateRoyalties,
    reset: resetRoyalties,
    getValues: getValuesRoyalties,
  } = useForm({
    resolver: yupResolver(royaltiesSchema),
  });

  const { errors: errorsRoyalties } = formStateRoyalties;

  // Revenue & royalties step

  const revenueRoyaltiesSchema = Yup.object().shape({
    enforceRoyalties: Yup.boolean().optional(),
  });

  const {
    register: registerRevenueRoyalties,
    handleSubmit: handleSubmitRevenueRoyalties,
    formState: formStateRevenueRoyalties,
    reset: resetRevenueRoyalties,
    getValues: getValuesRevenueRoyalties,
  } = useForm({
    resolver: yupResolver(revenueRoyaltiesSchema),
  });

  const { errors: errorsRr } = formStateRevenueRoyalties;

  // Team Member

  const teamMemberSchema = Yup.object().shape({
    walletAddress: Yup.string().required("Wallet address is required"),
  });

  const {
    register: registerTeamMember,
    handleSubmit: handleSubmitTeamMember,
    formState: formStateTeamMember,
    reset: resetTeamMember,
    getValues: getValuesTeamMember,
  } = useForm({
    resolver: yupResolver(teamMemberSchema),
  });

  const { errors: errorsTeamMember } = formStateTeamMember;

  // Features

  const featuresSchema = Yup.object().shape({
    delayedReveal: Yup.boolean().optional(),
    burnableTokens: Yup.boolean().optional(),
  });

  const {
    register: registerFeatures,
    handleSubmit: handleSubmitFeatures,
    formState: formStateFeatures,
    reset: resetFeatures,
    getValues: getValuesFeatures,
  } = useForm({
    resolver: yupResolver(featuresSchema),
  });

  const { errors: errorsFeatures } = formStateFeatures;

  // Publish

  const publishSchema = Yup.object().shape({
    profileImage: Yup.mixed()
      .required("Required")
      .test("is-valid-type", "Not a valid image type", (value: any) =>
        isValidFileType(value[0] && value[0].name.toLowerCase(), "image"),
      )
      .test("is-valid-size", "Max allowed size is 100KB", (value: any) => value[0] && value[0].size <= MAX_FILE_SIZE),
    coverImage: Yup.mixed()
      .required("Required")
      .test("is-valid-type", "Not a valid image type", (value: any) =>
        isValidFileType(value[0] && value[0].name.toLowerCase(), "image"),
      )
      .test("is-valid-size", "Max allowed size is 100KB", (value: any) => value[0] && value[0].size <= MAX_FILE_SIZE),
    website: Yup.string().required("Wallet address is required"),
    twitter: Yup.string().required("Wallet address is required"),
    discord: Yup.string().required("Wallet address is required"),
    medium: Yup.string().required("Wallet address is required"),
    description: Yup.string().required("Wallet address is required"),
  });

  const {
    register: registerPublish,
    handleSubmit: handleSubmitPublish,
    formState: formStatePublish,
    watch: watchPublish,
    reset: resetPublish,
    getValues: getValuesPublish,
  } = useForm({
    resolver: yupResolver(publishSchema),
  });

  const { errors: errorsPublish } = formStatePublish;

  const { mutateAsync: mutateAsyncCollectionUploadImage } = useMCollectionUploadImage();
  const { mutateAsync: mutateAsyncCollections } = useMCollections();

  const isValidFileType = (fileName: any, fileType: any) => {
    return fileName && (validFileExtensions as any)[fileType].indexOf(fileName.split(".").pop()) > -1;
  };

  const handleContinueContractInformation = () => {
    setStep(2);
  };

  const handleContinueTokenPricing = () => {
    setStep(3);
  };

  const handleContinueRevenueRoyalties = () => {
    setStep(4);
  };

  const handleContinueFeatures = () => {
    setStep(5);
  };

  const handleSubmitSmartContract = async () => {
    let profileImage: string = "";
    let coverImage: string = "";

    let payloadProfileImage = new FormData();
    let payloadCoverImage = new FormData();

    payloadProfileImage.append("file", (getValuesPublish("coverImage") as any)[0]);
    payloadCoverImage.append("file", (getValuesPublish("coverImage") as any)[0]);

    try {
      const responseProfileImage = await mutateAsyncCollectionUploadImage({ payload: payloadProfileImage });
      const responseCoverImage = await mutateAsyncCollectionUploadImage({ payload: payloadCoverImage });

      profileImage = responseProfileImage.data.imageURL;
      coverImage = responseCoverImage.data.imageURL;
    } catch (error: any) {
      toast.error(error);
    }

    const contractPhases = phasesAndSale.map((data: any) => {
      return {
        price: data.price,
        name: data.nameOfPhase,
        supply: data.supply,
        perWalletMaximum: data.perWalletMaximum,
        allowlist: [],
        duration: data.duration,
      };
    });

    const contractRevenues = revenue.map((data: any) => {
      return {
        address: data.walletAddress,
        percentage: data.percentage * 100,
      };
    });

    const contractRoyalties = royalties.map((data: any) => {
      return {
        address: data.walletAddress,
        percentage: data.percentage * 100,
      };
    });

    const payloadCollection = {
      name: getValuesContractInformation("contractName"),
      symbol: getValuesContractInformation("symbol"),
      totalSupply: 100,
      chainName: getValuesContractInformation("network"),
      page: {
        title: getValuesContractInformation("contractName"),
        description: getValuesPublish("description"),
        profileImg: profileImage,
        coverImg: coverImage,
        website: getValuesPublish("website"),
        twitter: getValuesPublish("twitter"),
        discord: getValuesPublish("discord"),
        medium: getValuesPublish("medium"),
      },
      feature: {
        teamMember: teamMember,
        delayReveal: getValuesFeatures("delayedReveal"),
        burnable: getValuesFeatures("burnableTokens"),
      },
      contract: {
        address: "0xd5a4904198df8cb50cfd4f698cfd967ad8ec91f0",
        owner: "owner",
        globalLimit: getValuesTokenPricing("globalLimit"),
        enforceRoyalty: getValuesRevenueRoyalties("enforceRoyalties"),
        phases: contractPhases,
        revenues: contractRevenues,
        royalties: contractRoyalties,
      },
      tokenSetId: "64e334ab2dbe88290158a76e",
    };

    try {
      const responseCollection = await mutateAsyncCollections({ payload: payloadCollection });

      handleDeploySmartContract(responseCollection.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeploySmartContract = async (data: any) => {
    const deployPayloadPhases: IDeployPayloadPhases[] = data.contract.phases.map((phase: any) => {
      return {
        id: phase._id,
        price: phase.price.$numberDecimal,
        supply: phase.supply,
        perWalletMaximum: phase.perWalletMaximum,
        perTransactionMaximum: 10, //TODO: Dummy perTransactionMaximum
        duration: phase.duration,
        startSellingDate: 0, //TODO: Dummy startSellingDate
        merkleRoot: "0x0000000000000000000000000000000000000000000000000000000000000000",
        status: 0, // TODO: Dummy status
      };
    });

    const deployPayloadRevenues: IDeployPayloadRevenuesRoyalties[] = data.contract.revenues.map((revenue: any) => {
      return {
        address: revenue.address,
        percentage: revenue.percentage,
      };
    });

    const deployPayloadRoyalties: IDeployPayloadRevenuesRoyalties[] = data.contract.royalties.map((royalty: any) => {
      return {
        address: royalty.address,
        percentage: royalty.percentage,
      };
    });

    const deployPayload: IDeployPayload = {
      collectionID: data._id,
      collectionName: data.name,
      collectionSymbol: data.symbol,
      collectionURI: "https://www.google.com/", //TODO: Dummy collectionURI
      phases: deployPayloadPhases,
      revenues: deployPayloadRevenues,
      royalties: deployPayloadRoyalties,
    };

    try {
      const responseDeploy = await deploy(deployPayload);

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <LayoutDashboard>
        <section className="flex flex-col w-full">
          <section className="w-full max-w-w-1 mx-auto px-4 lg:px-6">
            <div className="w-full py-10">
              <div className="flex items-center justify-center mb-12 space-x-3">
                <div className={`group ${step >= 1 ? "active" : "julian"}`}>
                  <button
                    type="button"
                    className="group flex items-center pl-4 pr-6 py-4 space-x-2 bg-white group-[.active]:bg-gl-1 border border-gl-5 rounded-full text-gl-13 group-[.active]:text-white font-medium"
                    onClick={() => setStep(1)}
                  >
                    <span className="flex items-center justify-center w-5 h-5 bg-gl-3 group-[.active]:bg-white rounded-full text-gl-13 text-sm">
                      1
                    </span>
                    <span>Contract Info</span>
                  </button>
                </div>
                <Icon icon="heroicons-outline:chevron-right" className="text-2xl" />
                <div className={`group ${step >= 2 ? "active" : "julian"}`}>
                  <button
                    type="button"
                    className="group flex items-center pl-4 pr-6 py-4 space-x-2 bg-white group-[.active]:bg-gl-1 border border-gl-5 rounded-full text-gl-13 group-[.active]:text-white font-medium"
                    onClick={() => setStep(2)}
                  >
                    <span className="flex items-center justify-center w-5 h-5 bg-gl-3 group-[.active]:bg-white rounded-full text-gl-13 text-sm">
                      2
                    </span>
                    <span>Token Pricing</span>
                  </button>
                </div>
                <Icon icon="heroicons-outline:chevron-right" className="text-2xl" />
                <div className={`group ${step >= 3 ? "active" : "julian"}`}>
                  <button
                    type="button"
                    className="group flex items-center pl-4 pr-6 py-4 space-x-2 bg-white group-[.active]:bg-gl-1 border border-gl-5 rounded-full text-gl-13 group-[.active]:text-white font-medium"
                    onClick={() => setStep(3)}
                  >
                    <span className="flex items-center justify-center w-5 h-5 bg-gl-3 group-[.active]:bg-white rounded-full text-gl-13 text-sm">
                      3
                    </span>
                    <span>Revenue</span>
                  </button>
                </div>
                <Icon icon="heroicons-outline:chevron-right" className="text-2xl" />
                <div className={`group ${step >= 4 ? "active" : "julian"}`}>
                  <button
                    type="button"
                    className="group flex items-center pl-4 pr-6 py-4 space-x-2 bg-white group-[.active]:bg-gl-1 border border-gl-5 rounded-full text-gl-13 group-[.active]:text-white font-medium"
                    onClick={() => setStep(4)}
                  >
                    <span className="flex items-center justify-center w-5 h-5 bg-gl-3 group-[.active]:bg-white rounded-full text-gl-13 text-sm">
                      4
                    </span>
                    <span>Features</span>
                  </button>
                </div>
                <Icon icon="heroicons-outline:chevron-right" className="text-2xl" />
                <div className={`group ${step >= 5 ? "active" : "julian"}`}>
                  <button
                    type="button"
                    className="group flex items-center pl-4 pr-6 py-4 space-x-2 bg-white group-[.active]:bg-gl-1 border border-gl-5 rounded-full text-gl-13 group-[.active]:text-white font-medium"
                    onClick={() => setStep(5)}
                  >
                    <span className="flex items-center justify-center w-5 h-5 bg-gl-3 group-[.active]:bg-white rounded-full text-gl-13 text-sm">
                      5
                    </span>
                    <span>Publish</span>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-6">
                  {step !== 5 && (
                    <div className="w-full p-4 border border-gl-5 rounded-3xl">
                      <div className="w-full grid grid-cols-12 gap-4">
                        {new Array(4).fill("").map((index: number) => (
                          <div key={index} className="col-span-3">
                            <Image
                              src="/images/nft-1.jpg"
                              width="200"
                              height="200"
                              alt="Generate Labs"
                              className="w-full h-auto rounded-2xl"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="p-4 pt-8">
                        <div className="mb-14 grid grid-cols-11 gap-6">
                          <div className="col-span-4">
                            <Image
                              src="/images/nft-1.jpg"
                              width="200"
                              height="200"
                              alt="Generate Labs"
                              className="w-full h-auto -mt-24 border-4 border-white rounded-2xl"
                            />
                          </div>
                          <div className="col-span-7">
                            <p className="mb-6 text-xl font-bold">
                              CollectionName <span className="text-c-5">SYM</span>
                            </p>
                            <div className="flex items-start justify-between">
                              <div className="space-y-4">
                                <p className="text-sm text-c-3">Network</p>
                                <div className="flex items-center space-x-2">
                                  <Icon icon="logos:ethereum" />
                                  <p className="font-medium">Ethereum</p>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <p className="text-sm text-c-3">Token set</p>
                                <p className="font-medium">Generate Labs Collection</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="px-4 py-6 border border-gl-5 rounded-2xl">
                          <div className="grid grid-cols-11 gap-4">
                            <div className="col-span-5">
                              <div className="space-y-4">
                                <p className="text-c-3">Public sale</p>
                                <div className="flex items-center space-x-2">
                                  <Icon icon="logos:ethereum" />
                                  <p className="font-medium">Ethereum</p>
                                </div>
                              </div>
                            </div>
                            <div className="col-span-3">
                              <p className="text-c-3">Supply</p>
                            </div>
                            <div className="col-span-3">
                              <p className="text-c-3">Allowlist</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 5 && (
                    <div className="w-full border border-gl-5 rounded-3xl">
                      <div className="relative w-full h-[240px] bg-c-1 rounded-2xl sca">
                        <div className="w-full max-w-w-1 h-full mx-auto">
                          <div className="w-full h-full px-4 lg:px-6">
                            <div className="w-full h-full flex flex-col items-end justify-end">
                              <div className="flex items-center justify-end pb-4">
                                <div className="flex items-center px-2 py-2 space-x-4 bg-white/10 rounded-lg">
                                  <button>
                                    <Icon icon="heroicons-outline:globe-alt" className="text-white" />
                                  </button>
                                  <button>
                                    <Icon icon="mdi:facebook" className="text-white" />
                                  </button>
                                  <button>
                                    <Icon icon="uil:twitter" className="text-white" />
                                  </button>
                                  <button>
                                    <Icon icon="ic:baseline-discord" className="text-white" />
                                  </button>
                                  <button>
                                    <Icon icon="mdi:youtube" className="text-white" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full max-w-w-1 h-full mx-auto">
                        <div className="w-full px-4">
                          <div className="flex space-x-6">
                            <div className="flex-shrink-0 w-24 h-24  bg-c-1 border-4 border-white rounded-full transform -translate-y-1/2 text-center">
                              <div className="flex items-center justify-center w-full h-full cursor-pointer" />
                            </div>
                            <div className="flex-1 py-6 space-y-2">
                              <div className="flex items-center space-x-2">
                                <h3 className="text-2xl font-bold">Title</h3>
                                <p className="text-c-3 font-bold">SYM</p>
                                <Icon icon="mdi:check-decagram" className="text-c-9" />
                              </div>
                              <div className="flex items-center space-x-2">
                                <p className="text-xm text-c-3">Owned by</p>
                                <div className="flex items-center p-2 space-x-2 rounded-full shadow-xl">
                                  <Image
                                    src="/images/placeholder.jpg"
                                    alt="Profile"
                                    width="20"
                                    height="20"
                                    className="w-5 h-5 rounded-full"
                                  />
                                  <p className="text-sm">GenerateLabs</p>
                                </div>
                              </div>
                              <div className="max-w-xl">
                                <p className="text-xs">
                                  Gorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et
                                  velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora
                                  torquent per conubia nostra, per inceptos.
                                </p>
                              </div>
                            </div>
                            <div className="flex-shrink-0 py-6">
                              <div className="w-48 p-4 border border-c-5 rounded-2xl">
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <p className="text-xs text-c-3 font-medium">Floor Price</p>
                                    <p className="text-xs font-medium">0 ETH</p>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <p className="text-xs text-c-3 font-medium">Volume</p>
                                    <p className="text-xs font-medium">0 ETH</p>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <p className="text-xs text-c-3 font-medium">Items</p>
                                    <p className="text-xs font-medium">0</p>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <p className="text-xs text-c-3 font-medium">Owners</p>
                                    <p className="text-xs font-medium">0</p>
                                  </div>
                                </div>
                                <hr className="my-4" />
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <p className="text-xs text-c-3 font-medium">Royalties</p>
                                    <p className="text-xs font-medium">0 %</p>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <p className="text-xs text-c-3 font-medium">Blockchain</p>
                                    <p className="text-xs font-medium">Ethereum</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="pb-4">
                            <div className="flex items-center justify-center w-full px-6 py-20 border border-c-5 rounded-2xl">
                              <div className="space-y-4">
                                <Image
                                  src="/images/collection-empty.png"
                                  width="250"
                                  height="250"
                                  alt="Empty"
                                  className="w-30 h-auto mx-auto"
                                />
                                <p className="font-bold">Collection in progress</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-span-6">
                  {step === 1 && (
                    <div className="w-full px-8 pt-16 pb-14 border border-gl-5 rounded-3xl">
                      <h2 className="text-[32px] font-bold">Contract Information</h2>
                      <hr className="my-10 border-gl-13 opacity-100" />
                      <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12">
                          <InputField
                            label="Contract Name"
                            placeholder="Generate Labs"
                            {...registerContractInformation("contractName")}
                            error={errorsContractInformation.contractName?.message}
                          />
                        </div>
                        <div className="col-span-6">
                          <InputField
                            label="Symbol"
                            placeholder="SYM"
                            {...registerContractInformation("symbol")}
                            error={errorsContractInformation.symbol?.message}
                          />
                        </div>
                        <div className="col-span-6">
                          <SelectField
                            label="Network"
                            placeholder="Network"
                            {...registerContractInformation("network")}
                            error={errorsContractInformation.network?.message}
                          >
                            <option value="BEC">BEC</option>
                            <option value="Polygon">Polygon</option>
                            <option value="Ethereum">Ethereum</option>
                          </SelectField>
                        </div>
                      </div>
                    </div>
                  )}
                  {step === 2 && (
                    <div className="w-full px-8 pt-16 pb-10 border border-gl-5 rounded-3xl">
                      <h2 className="text-[32px] font-bold">Token Pricing</h2>
                      <hr className="my-10 border-gl-13 opacity-100" />
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="flex items-center text-2xl font-bold">
                          Global limits <span className="ml-2 text-base text-gl-5 font-normal">(Optional)</span>
                        </h3>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" {...registerTokenPricing("isGlobalLimit")} />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      <p className="mb-8 text-sm text-gl-5">Lorem ipsum</p>
                      <InputField
                        type="number"
                        label="Per Wallet Maximum"
                        placeholder="Unlimited"
                        {...registerTokenPricing("globalLimit")}
                        error={errorsTokenPricing.globalLimit?.message}
                        disabled={!watchTokenPricing("isGlobalLimit")}
                      />
                      <hr className="my-10 border-gl-13 opacity-100" />
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="flex items-center text-2xl font-bold">Phases and Sale</h3>
                        <button
                          type="button"
                          className="inline-flex items-center px-6 py-2  bg-white border border-gl-5 rounded-lg text-gl-dark-1"
                          onClick={() => {
                            setModalPhasesAndSale({
                              show: true,
                              type: "add",
                            });
                          }}
                        >
                          <div>Add</div>
                          <Icon icon="heroicons-outline:plus" className="text-xl ml-1 -mr-3" />
                        </button>
                      </div>
                      <div className="w-full max-w-md mb-11">
                        <p className="text-sm text-gl-5">
                          Add various Minting Phases with their own Token Pricing, Supply Level, Wallet Limits and Allow
                          List.
                        </p>
                      </div>
                      <div className="flex flex-col space-y-4">
                        {/* <div className="w-full px-6 py-8 border border-gl-5 rounded-lg">
                      <div className="w-full grid grid-cols-12">
                        <div className="col-span-3 flex items-center">
                          <p className="text-xl font-bold">Public Sale</p>
                        </div>
                        <div className="col-span-3 flex items-center justify-center">
                          <p>0/100</p>
                        </div>
                        <div className="col-span-3 flex items-center justify-center">
                          <p>0 ETH</p>
                        </div>
                        <div className="col-span-3 flex items-center justify-end">
                          <button
                            type="button"
                            className="px-6 py-2 border border-gl-5 rounded-lg"
                            onClick={() => {
                              setModalPhasesAndSale({
                                show: true,
                                type: "edit",
                              });
                            }}
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </div> */}
                        {phasesAndSale.map((data: any, index: number) => {
                          return (
                            <div key={index} className="w-full px-6 py-8 border border-gl-5 rounded-lg">
                              <div className="w-full grid grid-cols-12">
                                <div className="col-span-3 flex items-center">
                                  <p className="text-xl font-bold">{data.nameOfPhase}</p>
                                </div>
                                <div className="col-span-3 flex items-center justify-center">
                                  <p>{data.supply}/100</p>
                                </div>
                                <div className="col-span-3 flex items-center justify-center">
                                  <p>{data.price ? data.price : 0} ETH</p>
                                </div>
                                <div className="col-span-3 flex items-center justify-end space-x-2">
                                  <button
                                    type="button"
                                    className="px-6 py-2 border border-gl-5 rounded-lg"
                                    onClick={() => {
                                      setModalPhasesAndSale({
                                        show: true,
                                        type: "edit",
                                      });
                                    }}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    className="flex items-center justify-center w-[42px] h-[42px] border border-gl-5 rounded-lg text-c-6"
                                    onClick={() => {
                                      const updatedPhasesAndSale = phasesAndSale.filter((_, i) => i !== index);
                                      setPhasesAndSale(updatedPhasesAndSale);
                                    }}
                                  >
                                    <Icon icon="heroicons-outline:trash" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {step === 3 && (
                    <div className="w-full px-8 pt-16 pb-10 border border-gl-5 rounded-3xl">
                      <h2 className="text-[32px] font-bold">Revenue & Royalties</h2>
                      <hr className="my-10 border-gl-13 opacity-100" />
                      <h3 className="flex items-center mb-4 text-2xl font-bold">Revenue</h3>
                      <p className="mb-6 text-sm text-gl-5">
                        Choose a percentage for wallets and add them to all of your mint&apos;s sales.
                      </p>
                      <div className="flex items-center justify-between mb-6">
                        <button
                          type="button"
                          className="inline-flex items-center px-6 py-2 bg-white border border-gl-5 rounded-lg text-gl-dark-1"
                          onClick={() => setIsRevenueAdd(true)}
                        >
                          <div>Add Wallet Address</div>
                          <Icon icon="heroicons-outline:plus" className="text-xl ml-1 -mr-3" />
                        </button>
                        {/* <button type="button" className="text-gl-1 font-medium">
                      Edit
                    </button> */}
                      </div>
                      <div className="pb-8 border border-gl-5 rounded-lg">
                        <table className="w-full">
                          <thead>
                            <tr>
                              <th className="px-6 py-6 text-left">Added Wallet Address</th>
                              <th className="px-6 py-6 text-center">Percentage</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {isRevenueAdd && (
                              <tr>
                                <td className="px-6 py-2 align-top">
                                  <div className="space-y-2">
                                    <input
                                      type="text"
                                      placeholder="Wallet address"
                                      className={`w-full px-4 py-2 border border-c-5 rounded-lg ${
                                        errorsRevenue.walletAddress?.message && "!border-c-6"
                                      }`}
                                      {...registerRevenue("walletAddress")}
                                    />
                                    {errorsRevenue.walletAddress?.message && (
                                      <p className="text-c-6 text-xs">{errorsRevenue.walletAddress.message}</p>
                                    )}
                                  </div>
                                </td>
                                <td className="px-6 py-2 align-top">
                                  <div className="space-y-2">
                                    <div className="flex items-stretch">
                                      <input
                                        type="number"
                                        placeholder="Percentage"
                                        className="w-full px-4 py-2 border border-c-5 rounded-tl-lg rounded-bl-lg"
                                        {...registerRevenue("percentage")}
                                      />
                                      <div className="flex items-center justify-center px-4 -ml-px bg-gl-3 border border-c-5 rounded-tr-lg rounded-br-lg">
                                        %
                                      </div>
                                    </div>
                                    {errorsRevenue.percentage?.message && (
                                      <p className="text-c-6 text-xs">{errorsRevenue.percentage.message}</p>
                                    )}
                                  </div>
                                </td>
                                <td className="px-6 py-2 align-top">
                                  <div className="flex items-stretch space-x-2">
                                    <button
                                      type="button"
                                      className="px-4 py-2 border border-gl-5 rounded-lg"
                                      onClick={handleSubmitRevenue(async (data: any) => {
                                        setRevenue([...revenue, data]);
                                        setIsRevenueAdd(false);
                                        resetRevenue({
                                          walletAddress: "",
                                          percentage: undefined,
                                        });
                                      })}
                                    >
                                      Add
                                    </button>
                                    <button
                                      type="button"
                                      className="flex items-center justify-center px-2 rounded-lg text-c-6"
                                      onClick={() => setIsRevenueAdd(false)}
                                    >
                                      <Icon icon="heroicons-outline:trash" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            )}
                            {revenue.map((data: any, index: number) => {
                              return (
                                <tr key={index}>
                                  <td className="px-6 py-2">
                                    <div className="flex items-center space-x-4">
                                      <div className="w-6 h-6 rounded-full bg-[#FFBA0A]"></div>
                                      <p className="text-gl-5 font-normal whitespace-nowrap">{data.walletAddress}</p>
                                    </div>
                                  </td>
                                  <td className="px-6 py-2 text-center">
                                    <p className="text-gl-5">{data.percentage}%</p>
                                  </td>
                                  <td className="px-6 py-2 text-center">
                                    <Icon icon="heroicons-outline:lock-closed" className="inline-block text-xl" />
                                  </td>
                                </tr>
                              );
                            })}
                            {revenue.length <= 0 && !isRevenueAdd && (
                              <tr>
                                <td colSpan={3} className="text-center">
                                  No revenue
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                      <hr className="my-10 border-gl-13 opacity-100" />
                      <div className="mb-10">
                        <h3 className="flex items-center text-2xl font-bold">
                          Royalties <span className="ml-2 text-base text-gl-5 font-normal">(Optional)</span>
                        </h3>
                        <p className="mt-1 text-sm text-gl-5 mb-6">
                          Set the percentage of secondary sale you’ll receive.
                        </p>
                        <div className="flex items-center justify-between mb-6">
                          <button
                            type="button"
                            className="inline-flex items-center px-6 py-2 bg-white border border-gl-5 rounded-lg text-gl-dark-1"
                            onClick={() => setIsRoyaltiesAdd(true)}
                          >
                            <div>Add Wallet Address</div>
                            <Icon icon="heroicons-outline:plus" className="text-xl ml-1 -mr-3" />
                          </button>
                          {/* <button type="button" className="text-gl-1 font-medium">
                      Edit
                    </button> */}
                        </div>
                        <div className="pb-8 border border-gl-5 rounded-lg">
                          <table className="w-full">
                            <thead>
                              <tr>
                                <th className="px-6 py-6 text-left">Added Wallet Address</th>
                                <th className="px-6 py-6 text-center">Percentage</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {isRoyaltiesAdd && (
                                <tr>
                                  <td className="px-6 py-2 align-top">
                                    <div className="space-y-2">
                                      <input
                                        type="text"
                                        placeholder="Wallet address"
                                        className={`w-full px-4 py-2 border border-c-5 rounded-lg ${
                                          errorsRoyalties.walletAddress?.message && "!border-c-6"
                                        }`}
                                        {...registerRoyalties("walletAddress")}
                                      />
                                      {errorsRoyalties.walletAddress?.message && (
                                        <p className="text-c-6 text-xs">{errorsRoyalties.walletAddress.message}</p>
                                      )}
                                    </div>
                                  </td>
                                  <td className="px-6 py-2 align-top">
                                    <div className="space-y-2">
                                      <div className="flex items-stretch">
                                        <input
                                          type="number"
                                          placeholder="Percentage"
                                          className="w-full px-4 py-2 border border-c-5 rounded-tl-lg rounded-bl-lg"
                                          {...registerRoyalties("percentage")}
                                        />
                                        <div className="flex items-center justify-center px-4 -ml-px bg-gl-3 border border-c-5 rounded-tr-lg rounded-br-lg">
                                          %
                                        </div>
                                      </div>
                                      {errorsRoyalties.percentage?.message && (
                                        <p className="text-c-6 text-xs">{errorsRoyalties.percentage.message}</p>
                                      )}
                                    </div>
                                  </td>
                                  <td className="px-6 py-2 align-top">
                                    <div className="flex items-stretch space-x-2">
                                      <button
                                        type="button"
                                        className="px-4 py-2 border border-gl-5 rounded-lg"
                                        onClick={handleSubmitRoyalties(async (data: any) => {
                                          setRoyalties([...royalties, data]);
                                          setIsRoyaltiesAdd(false);
                                          resetRoyalties({
                                            walletAddress: "",
                                            percentage: undefined,
                                          });
                                        })}
                                      >
                                        Add
                                      </button>
                                      <button
                                        type="button"
                                        className="flex items-center justify-center px-2 text-c-6"
                                        onClick={() => setIsRoyaltiesAdd(false)}
                                      >
                                        <Icon icon="heroicons-outline:trash" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              )}
                              {royalties.map((data: any, index: number) => {
                                return (
                                  <tr key={index}>
                                    <td className="px-6 py-2">
                                      <div className="flex items-center space-x-4">
                                        <div className="w-6 h-6 rounded-full bg-[#FFBA0A]"></div>
                                        <p className="text-gl-5 font-normal whitespace-nowrap">{data.walletAddress}</p>
                                      </div>
                                    </td>
                                    <td className="px-6 py-2 text-center">
                                      <p className="text-gl-5">{data.percentage}%</p>
                                    </td>
                                    <td className="px-6 py-2 text-center">
                                      <Icon icon="heroicons-outline:lock-closed" className="inline-block text-xl" />
                                    </td>
                                  </tr>
                                );
                              })}
                              {royalties.length <= 0 && !isRoyaltiesAdd && (
                                <tr>
                                  <td colSpan={3} className="text-center">
                                    No royalties
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="mb-10">
                        <div className="flex items-center justify-between">
                          <h3 className="flex items-center text-2xl font-bold">
                            Enforce Royalties <span className="ml-2 text-base text-gl-5 font-normal">(Optional)</span>
                          </h3>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              value=""
                              className="sr-only peer"
                              {...registerRevenueRoyalties("enforceRoyalties")}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <p className="mt-1 text-sm text-gl-5">Set the percentage of secondary sale you’ll receive.</p>
                      </div>
                    </div>
                  )}
                  {step === 4 && (
                    <div className="w-full px-8 pt-16 pb-10 border border-gl-5 rounded-3xl">
                      <h2 className="text-[32px] font-bold">Features</h2>
                      <hr className="my-10 border-gl-13 opacity-100" />
                      <h3 className="flex items-center mb-4 text-2xl font-bold">Team member</h3>
                      <p className="mb-6 text-sm text-gl-5">
                        Here you can setup your team to help manage your project. You can modify this at any time.
                      </p>
                      <div className="flex items-center justify-between mb-6">
                        <button
                          type="button"
                          className="inline-flex items-center px-6 py-2  bg-white border border-gl-5 rounded-lg text-gl-dark-1"
                          onClick={() => setIsTeamMemberAdd(true)}
                        >
                          <div>Add Wallet Address</div>
                          <Icon icon="heroicons-outline:plus" className="text-xl ml-1 -mr-3" />
                        </button>
                        <button type="button" className="text-gl-1 font-medium">
                          Edit
                        </button>
                      </div>
                      <div className="space-y-4">
                        {isTeamMemberAdd && (
                          <div>
                            <div className="flex items-stretch space-x-4">
                              <div className="flex items-center w-full space-x-6 p-4 bg-gl-3 rounded-2xl">
                                <Icon icon="fa-solid:wallet" className="text-xl" />
                                <input
                                  type="text"
                                  placeholder="Wallet address"
                                  className="w-full bg-transparent outline-none"
                                  {...registerTeamMember("walletAddress")}
                                />
                              </div>
                              <button
                                type="button"
                                className="px-4 py-2 border border-gl-5 rounded-lg"
                                onClick={handleSubmitTeamMember(async (data: any) => {
                                  setTeamMember([...teamMember, data.walletAddress]);
                                  setIsTeamMemberAdd(false);
                                  resetTeamMember({ walletAddress: "" });
                                })}
                              >
                                Add
                              </button>
                            </div>
                            {errorsTeamMember.walletAddress?.message && (
                              <p className="text-c-6 text-sm mt-1">{errorsTeamMember.walletAddress.message}</p>
                            )}
                          </div>
                        )}
                        {teamMember.length > 0 && (
                          <>
                            {teamMember.map((data: any, index: number) => {
                              return (
                                <div key={index} className="flex items-center space-x-6 p-4 bg-gl-3 rounded-2xl">
                                  <Icon icon="fa-solid:wallet" className="text-xl" />
                                  <p>{data}</p>
                                </div>
                              );
                            })}
                          </>
                        )}
                      </div>
                      <hr className="my-10 border-gl-13 opacity-100" />
                      <div className="mb-10">
                        <div className="flex items-center justify-between">
                          <h3 className="flex items-center text-2xl font-bold">
                            Delayed Reveal <span className="ml-2 text-base text-gl-5 font-normal">(Optional)</span>
                          </h3>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              value=""
                              className="sr-only peer"
                              {...registerFeatures("delayedReveal")}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <p className="mt-1 text-sm text-gl-5">
                          Hide your Token Artwork with a placeholder image until you decide to reveal it
                        </p>
                      </div>
                      <hr className="my-10 border-gl-13 opacity-100" />
                      <div className="mb-10">
                        <div className="flex items-center justify-between">
                          <h3 className="flex items-center text-2xl font-bold">
                            Burnable Tokens <span className="ml-2 text-base text-gl-5 font-normal">(Optional)</span>
                          </h3>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              value=""
                              className="sr-only peer"
                              {...registerFeatures("burnableTokens")}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <p className="mt-1 text-sm text-gl-5">
                          Allow token holders to burn (or take out of circulation) any Token they own.
                        </p>
                      </div>
                    </div>
                  )}
                  {step === 5 && (
                    <div className="w-full px-8 pt-16 pb-10 border border-gl-5 rounded-3xl">
                      <h2 className="text-[32px] font-bold">Publish</h2>
                      <hr className="my-10 border-gl-13 opacity-100" />
                      <div className="space-y-10">
                        <div>
                          <h3 className="flex items-center mb-4 text-xl font-bold">Profile image</h3>
                          <p className="mb-4 first:text-gl-5">Recommended size 350x350</p>
                          <div className="w-full">
                            <input
                              id="profile-image"
                              type="file"
                              className="hidden"
                              {...registerPublish("profileImage")}
                            />
                            <div
                              className={`w-full flex items-center p-4 space-x-10 border border-gl-5 rounded-2xl ${
                                errorsPublish.profileImage?.message && "!border-c-6"
                              }`}
                            >
                              {watchPublish("profileImage") && (watchPublish("profileImage") as any).length > 0 ? (
                                <Image
                                  src={URL.createObjectURL((watchPublish("profileImage") as any)[0])}
                                  width="500"
                                  height="500"
                                  alt="Preview"
                                  className="w-25 h-25 object-cover rounded-2xl"
                                />
                              ) : (
                                <div className="flex items-center justify-center w-25 h-25 bg-gl-3 rounded-2xl">
                                  <Icon icon="heroicons-outline:cloud-upload" className="text-5xl" />
                                </div>
                              )}
                              <label htmlFor="profile-image" className="cursor-pointer">
                                <p className="text-xl font-bold">Select media to upload</p>
                              </label>
                            </div>
                          </div>
                          {errorsPublish.profileImage?.message && (
                            <div className="px-6 mt-1.5">
                              <p className="text-sm text-c-6">{errorsPublish.profileImage?.message}</p>
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="flex items-center mb-4 text-xl font-bold">Cover image</h3>
                          <p className="mb-4 first:text-gl-5">Recommended size 350x350</p>
                          <div className="w-full">
                            <input id="cover-image" type="file" className="hidden" {...registerPublish("coverImage")} />
                            <div
                              className={`w-full flex items-center p-4 space-x-10 border border-gl-5 rounded-2xl ${
                                errorsPublish.coverImage?.message && "!border-c-6"
                              }`}
                            >
                              {watchPublish("coverImage") && (watchPublish("coverImage") as any).length > 0 ? (
                                <Image
                                  src={URL.createObjectURL((watchPublish("coverImage") as any)[0])}
                                  width="500"
                                  height="500"
                                  alt="Preview"
                                  className="w-25 h-25 object-cover rounded-2xl"
                                />
                              ) : (
                                <div className="flex items-center justify-center w-25 h-25 bg-gl-3 rounded-2xl">
                                  <Icon icon="heroicons-outline:cloud-upload" className="text-5xl" />
                                </div>
                              )}
                              <label htmlFor="cover-image" className="cursor-pointer">
                                <p className="text-xl font-bold">Select media to upload</p>
                              </label>
                            </div>
                          </div>
                          {errorsPublish.coverImage?.message && (
                            <div className="px-6 mt-1.5">
                              <p className="text-sm text-c-6">{errorsPublish.coverImage?.message}</p>
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="flex items-center mb-4 text-xl font-bold">Social media links</h3>
                          <div className="space-y-4">
                            <InputField
                              label="Website"
                              placeholder="https://"
                              {...registerPublish("website")}
                              error={errorsPublish.website?.message}
                            />
                            <InputField
                              label="Twitter"
                              placeholder="https://"
                              {...registerPublish("twitter")}
                              error={errorsPublish.twitter?.message}
                            />
                            <InputField
                              label="Discord"
                              placeholder="https://"
                              {...registerPublish("discord")}
                              error={errorsPublish.discord?.message}
                            />
                            <InputField
                              label="Medium"
                              placeholder="https://"
                              {...registerPublish("medium")}
                              error={errorsPublish.medium?.message}
                            />
                            <div>
                              <div
                                className={`flex flex-col w-full p-4 bg-gl-light-1 border border-gl-light-1 rounded-lg resize-none ${
                                  errorsPublish.description?.message && "!border-c-6"
                                }`}
                              >
                                <label
                                  htmlFor="description"
                                  className={`font-bold mb-4 ${errorsPublish.description?.message && "text-c-6"}`}
                                >
                                  Description
                                </label>
                                <textarea
                                  placeholder="Type anything here"
                                  className="w-full h-[216px] bg-transparent resize-none outline-none"
                                  {...registerPublish("description")}
                                ></textarea>
                              </div>
                              {errorsPublish.description?.message && (
                                <div className="px-6 mt-1.5">
                                  <p className="text-sm text-c-6">{errorsPublish.description?.message}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className="mt-auto bg-gl-3">
            <div className="w-full max-w-w-1 px-4 lg:px-6 mx-auto">
              <div className="flex items-center justify-between w-full py-8">
                {/* NOTE: Temp, Helper */}
                <div></div>
                {/* <button type="button" className="px-6 py-3 bg-white border border-gl-5 rounded-lg text-gl-dark-1">
                  Save & finish later
                </button> */}
                {step === 1 && (
                  <button
                    type="button"
                    className="px-6 py-3 bg-gl-1 border border-gl-1 rounded-lg text-white"
                    onClick={handleSubmitContractInformation(handleContinueContractInformation)}
                  >
                    Continue
                  </button>
                )}
                {step === 2 && (
                  <button
                    type="button"
                    className="px-6 py-3 bg-gl-1 border border-gl-1 rounded-lg text-white"
                    onClick={handleSubmitTokenPricing(handleContinueTokenPricing)}
                  >
                    Continue
                  </button>
                )}
                {step === 3 && (
                  <button
                    type="button"
                    className="px-6 py-3 bg-gl-1 border border-gl-1 rounded-lg text-white"
                    onClick={handleSubmitRevenueRoyalties(handleContinueRevenueRoyalties)}
                  >
                    Continue
                  </button>
                )}
                {step === 4 && (
                  <button
                    type="button"
                    className="px-6 py-3 bg-gl-1 border border-gl-1 rounded-lg text-white"
                    onClick={handleSubmitFeatures(handleContinueFeatures)}
                  >
                    Continue
                  </button>
                )}
                {step === 5 && (
                  <button
                    type="button"
                    className="px-6 py-3 bg-gl-1 border border-gl-1 rounded-lg text-white"
                    onClick={handleSubmitPublish(handleSubmitSmartContract)}
                  >
                    Deploy
                  </button>
                )}
              </div>
            </div>
          </section>
        </section>
      </LayoutDashboard>

      <ModalPhasesAndSale
        show={modalPhasesAndSale.show}
        type={modalPhasesAndSale.type}
        onAdd={data => {
          setPhasesAndSale([...phasesAndSale, data]);
        }}
        onClose={value => setModalPhasesAndSale({ show: false })}
      />
    </div>
  );
};

export default ArtGeneratorContractsSmartContract;
