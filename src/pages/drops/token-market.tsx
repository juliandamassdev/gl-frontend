import ButtonV2 from "@/components/buttons/button-v2";
import InputField from "@/components/forms/input-field";
import InputFieldV2 from "@/components/forms/input-field-v2";
import SelectField from "@/components/forms/select-field";
import Header from "@/components/headers/header";
import IconEtherscan from "@/components/icons/icon-etherscan";
import ModalCollectiblePublished from "@/components/modals/modal-collectible-published";
import { useGetUsersMyProfile } from "@/queries/account-queries";
import { createDropToken, deployDrop } from "@/services/ChainDrop";
import { getDropsMyDrop, postDropsIdCollectibles } from "@/services/Drops";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Icon } from "@iconify/react";
import { deleteCookie, getCookie } from "cookies-next";
import { ethers } from "ethers";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import * as Yup from "yup";

const TokenMarket = ({ myDrop }: any) => {
  const router = useRouter();

  const [editSection, setEditSection] = useState<string>("");
  const [propertyAttribute, setPropertyAttribute] = useState<any>();
  const [propertyTrait, setPropertyTrait] = useState<any>();
  const [properties, setProperties] = useState<any[]>([]);
  const [collectiblePublished, setCollectiblePublished] = useState<boolean>(false);
  const [item, setItem] = useState<any>();
  const [readyToDeploy, setReadyToDeploy] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const { data: dataProfile } = useGetUsersMyProfile({ token: getCookie("signed-in-jwt")?.toString() || "" });

  // Collection information

  const newItemSchema = Yup.object().shape({
    name: Yup.string(),
    symbol: Yup.string(),
    network: Yup.string(),
    website: Yup.string(),
    twitter: Yup.string(),
    discord: Yup.string(),
    medium: Yup.string(),
  });

  const {
    register: registerCollectionInformation,
    handleSubmit: handleSubmitCollectionInformation,
    formState: formStateCollectionInformation,
    getValues: getValuesCollectionInformation,
  } = useForm({
    resolver: yupResolver(newItemSchema),
  });

  const { errors: errorsCollectionInformation } = formStateCollectionInformation;

  // End collection information

  // Drop collection information

  const dropSchema = Yup.object().shape({
    tokenName: Yup.string(),
    supply: Yup.string(),
    price: Yup.string(),
    description: Yup.string(),
    lockedContent: Yup.string(),
  });

  const {
    register: registerDrop,
    handleSubmit: handleSubmitDrop,
    formState: formStateDrop,
    getValues: getValuesDrop,
  } = useForm({
    resolver: yupResolver(dropSchema),
  });

  const { errors: errorsDrop } = formStateDrop;

  // End drop collection information

  const handleAddProperty = () => {
    const newProperty = {
      name: propertyAttribute,
      value: propertyTrait,
    };

    setProperties([...properties, newProperty]);
    setPropertyAttribute("");
    setPropertyTrait("");
  };

  const handleDeleteProperty = (index: number) => {
    const updatedProperties = properties;
    updatedProperties.splice(index, 1);
    setProperties(updatedProperties);
  };

  const handleDeploy = async () => {
    setLoading(true);
    setSeconds(80);

    const accessToken = getCookie("signed-in-jwt") as string;
    let txHash: string = "";
    const newUuid = uuid();

    const dropPayload = {
      address: myDrop.address ? myDrop.address : dataProfile?.data?.data?.address,
      id: myDrop._id,
      name: getValuesCollectionInformation("name"),
      symbol: getValuesCollectionInformation("symbol"),
      uri: getValuesCollectionInformation("website"),
      maxSupply: getValuesDrop("supply"),
      amountMinted: "0",
      price: getValuesDrop("price")?.toString(),
      uuid: newUuid,
    };

    if (myDrop._id) {
      try {
        const responseCreateDrop = await createDropToken(dropPayload);
        txHash = responseCreateDrop;
      } catch (error: any) {
        console.log(error);
        setLoading(false);

        return;
      }
    } else {
      try {
        const responseDeployDrop = await deployDrop(dropPayload);
        txHash = responseDeployDrop;
      } catch (error: any) {
        console.log(error);
        setLoading(false);

        return;
      }
    }

    const payload = {
      description: getValuesDrop("description"),
      imgURL: router.query.image,
      lockedContent: getValuesDrop("lockedContent"),
      name: getValuesDrop("tokenName"),
      price: getValuesDrop("price")?.toString(),
      properties: properties,
      supply: getValuesDrop("supply"),
      txHash: txHash,
      uuid: newUuid,
    };

    try {
      const resDropsCollectibles = await postDropsIdCollectibles(accessToken, myDrop._id, payload);
      setLoading(false);
      setReadyToDeploy(false);
      setCollectiblePublished(true);
      setItem(resDropsCollectibles.data);
      console.log(resDropsCollectibles);
      setSeconds(0);
    } catch (error: any) {
      console.log(error);
      setReadyToDeploy(false);
      setLoading(false);
      setSeconds(0);
    }
  };

  const handleAfterPublished = () => {
    router.push(`/drops/token-market`);
  };

  // Count

  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 0.5);
      } else {
        clearInterval(countdownInterval);
      }
    }, 100);

    return () => {
      clearInterval(countdownInterval);
    };
  }, [seconds]);

  const handleLogout = () => {
    deleteCookie("signed-in-address");
    deleteCookie("signed-in-type");
    deleteCookie("signed-in-jwt");
    window.location.replace("/auth");
  };

  return (
    <>
      <div className="bg-[#1C1A19]">
        <Header
          profile={dataProfile}
          leftElement={
            <Link href="/">
              <Image
                src="/images/generate-labs-white-logo.png"
                width="256"
                height="256"
                alt="Logo"
                className="w-32 h-auto"
              />
            </Link>
          }
        />

        <div className="absolute top-0 left-0 z-1 w-full h-[900px] overflow-hidden">
          <div className="absolute top-0 left-0 z-2 w-full h-full bg-gradient-to-t from-20% from-[#1C1A19] to-[#1C1A19]/30"></div>
          <Image
            src={router.query.image as string}
            width="1400"
            height="1440"
            alt="Background"
            className="absolute top-0 left-0 z-1 w-full h-full object-cover object-top filter blur-[70px]"
          />
        </div>

        <div className="relative z-3 w-full max-w-[1464px] px-4 lg:px-6 mx-auto">
          <div className="pt-20 pb-12">
            <div className="flex justify-center w-full space-x-25">
              <div className="flex-shrink-0 w-[512px]">
                <div className="w-full">
                  <div className="flex flex-col items-center justify-between mb-10">
                    <div className="flex items-center justify-center mb-4 space-x-2 group">
                      <Image
                        src={myDrop.imgURL ? myDrop.imgURL : "/images/placeholder.jpg"}
                        width="400"
                        height="400"
                        alt="Placeholder"
                        className="w-[54px] h-[54px] object-cover rounded-full"
                      />
                      <p className="text-[32px] text-white font-bold">{myDrop.name}</p>
                      <p className="text-xl text-c-3 font-bold">{myDrop.symbol}</p>
                      <Icon
                        icon="heroicons-solid:cog"
                        className="hidden group-hover:block text-3xl text-white group-[.button-config]:hover:text-c-10 cursor-pointer"
                        onClick={() => setEditSection("bid")}
                      />
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Image
                        src="/images/placeholder.jpg"
                        width="400"
                        height="400"
                        alt="Placeholder"
                        className="w-6 h-6 object-cover rounded-full"
                      />
                      <p className="text-white">0xB5...0b33</p>
                      <p className="text-white">|</p>
                      <Icon icon="mdi:ethereum" className="text-white" />
                      <p className="text-white">{myDrop.chainName}</p>
                      <p className="text-white">|</p>
                      <p className="text-white">Collectibles: {myDrop.collectibles.length}</p>
                      <p className="text-white">|</p>
                      <div className="flex items-center space-x-2">
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
                  <div className="relative pb-[100%] mb-7 rounded-3xl overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-full">
                      <Image
                        src={myDrop.collectibles[0].imgURL}
                        width="1000"
                        height="1000"
                        alt="NFT"
                        className="w-full h-full object-contain rounded-3xl"
                      />
                    </div>
                    {/* <div className="absolute bottom-0 left-0 flex items-center justify-between w-full p-4 pt-20 bg-gradient-to-b from-transparent to-c-1 group-hover:opacity-0 transition-all">
                      <p className="text-xl text-white font-bold">Yuki Portrait #123</p>
                      <p className="text-xl text-white font-bold">0/100</p>
                    </div> */}
                    <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full bg-black/50 opacity-0 group-hover:opacity-100">
                      <button
                        className="flex items-center justify-center w-14 h-14 mb-2 bg-c-3 hover:bg-c-7 border border-white/40 hover:border-c-7 rounded-full transition-all group button-config"
                        onClick={() => setEditSection("image")}
                      >
                        <Icon
                          icon="heroicons-solid:cog"
                          className="text-3xl text-white group-[.button-config]:hover:text-c-10"
                        />
                      </button>
                      <p className="text-white">Configure</p>
                    </div>
                  </div>
                </div>
              </div>

              <Transition
                as={Fragment}
                show={editSection === "image"}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <div className="flex-shrink-0 w-[calc(60%-100px)]">
                  <div className="w-full rounded-2xl bg-white p-8 shadow-xl text-left overflow-hidden transform transition-all">
                    <div className="text-right">
                      <button className="relative" onClick={() => setEditSection("")}>
                        <Icon icon="heroicons-outline:x" className="text-2xl" />
                      </button>
                    </div>

                    <div>
                      <div className="mb-11 space-y-2">
                        <h2 className="text-[32px] font-bold">Configure new item</h2>
                        <p className="text-xl text-c-3 font-light">
                          Start configuring your new item with a few key details
                        </p>
                      </div>
                      <div className="w-full mb-10">
                        <input id="collection-file" type="file" className="hidden" />
                        <label
                          htmlFor="collection-file"
                          className="w-full flex items-center p-4 space-x-10 border border-gl-5 rounded-2xl cursor-pointer"
                        >
                          <div className="flex items-center justify-center w-25 h-25 bg-gl-3 rounded-lg">
                            <Icon icon="heroicons-outline:cloud-upload" className="text-5xl" />
                          </div>
                          <div>
                            <p className="text-xl font-bold">Select media to upload</p>
                            <p>PNG, JPEG, JPG</p>
                          </div>
                        </label>
                      </div>
                      <div className="grid grid-cols-12 gap-4 mb-10">
                        <div className="col-span-12">
                          <InputField label="Token name" placeholder="Token name" />
                        </div>
                        <div className="col-span-6">
                          <InputField label="Supply" placeholder="Supply" />
                        </div>
                        <div className="col-span-6">
                          <InputField label="Price" placeholder="Price" />
                        </div>
                        <div className="col-span-12">
                          <div
                            className={`flex flex-col w-full px-6 py-2 bg-gl-light-1 border border-gl-light-1 rounded-2xl resize-none `}
                          >
                            <label htmlFor="area" className={`font-bold mb-4 `}>
                              Description
                            </label>
                            <textarea
                              id="area"
                              placeholder="Type anything here"
                              className="w-full h-[216px] bg-transparent resize-none outline-none"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="mb-14">
                        <div className="mb-6 space-y-2">
                          <h2 className="text-xl font-bold">Properties</h2>
                          <p className="text-c-3 font-light">Add custom traits to this collectible.</p>
                        </div>
                        <div className="space-y-4">
                          {properties.map((field: any, index: number) => (
                            <div key={index} className="flex items-center justify-center space-x-2">
                              <div className="grid grid-cols-12 gap-x-2 w-full">
                                <div className="col-span-6">
                                  <InputFieldV2 placeholder="Enter attribute" value={field.name} disabled={true} />
                                </div>
                                <div className="col-span-6">
                                  <InputFieldV2 placeholder="Enter trait" value={field.value} disabled={true} />
                                </div>
                              </div>
                              <button
                                className="flex-shrink-0 flex items-center justify-center w-[50px] h-[50px] border border-transparent rounded-lg"
                                onClick={() => handleDeleteProperty(index)}
                              >
                                <Icon icon="heroicons-outline:trash" className="text-2xl text-c-6" />
                              </button>
                            </div>
                          ))}
                          <div className="flex items-center justify-center space-x-2">
                            <div className="grid grid-cols-12 gap-x-2 w-full">
                              <div className="col-span-6">
                                <InputFieldV2
                                  placeholder="Enter attribute"
                                  onChange={(event: any) => setPropertyAttribute(event.target.value)}
                                  value={propertyAttribute}
                                />
                              </div>
                              <div className="col-span-6">
                                <InputFieldV2
                                  placeholder="Enter trait"
                                  onChange={(event: any) => setPropertyTrait(event.target.value)}
                                  value={propertyTrait}
                                />
                              </div>
                            </div>
                            <button className="opacity-0 flex-shrink-0 flex items-center justify-center w-[50px] h-[50px] border border-transparent rounded-lg">
                              <Icon icon="heroicons-outline:trash" className="text-2xl text-c-6" />
                            </button>
                          </div>
                        </div>
                        <ButtonV2 variant="2" className="w-full mt-6" onClick={handleAddProperty}>
                          Add Property
                        </ButtonV2>
                      </div>
                      <div className="mb-6">
                        <div className="mb-6 space-y-2">
                          <h2 className="text-xl font-bold">Locked Content</h2>
                          <p className="text-c-3 font-light">
                            Upload content that buyers can unlock once the digital collectible is purchased.
                          </p>
                        </div>
                        <div className="flex flex-col w-full p-4 bg-gl-light-1 border border-gl-light-1 rounded-lg resize-none">
                          <textarea
                            placeholder="Edit text"
                            className="w-full bg-transparent resize-none outline-none"
                          ></textarea>
                        </div>
                      </div>
                      {/* <ButtonV2 size="base" variant="1-outline" className="w-full">
                      <span>Upload</span>
                    </ButtonV2> */}
                    </div>
                    <hr className="mb-6 border-gl-5" />
                    <ButtonV2 variant="gl-4" size="md" className="w-full space-x-3">
                      <Icon icon="heroicons-outline:trash" className="text-2xl" />
                      <span className="font-bold">Delete Collectible</span>
                    </ButtonV2>
                  </div>
                </div>
              </Transition>

              <Transition
                as={Fragment}
                show={editSection === "bid"}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <div className="flex-shrink-0 w-[calc(60%-100px)]">
                  <div className="w-full rounded-2xl bg-white p-8 shadow-xl text-left overflow-hidden transform transition-all">
                    <div className="text-right">
                      <button className="relative" onClick={() => setEditSection("")}>
                        <Icon icon="heroicons-outline:x" className="text-2xl" />
                      </button>
                    </div>

                    <div>
                      <div className="mb-11 space-y-2">
                        <h2 className="text-[32px] font-bold">Configure Drop Collection</h2>
                        <p className="text-xl text-c-3 font-light">
                          Start configuring your new item with a few key details
                        </p>
                      </div>
                      <div className="mb-10">
                        <div className="w-full mb-10">
                          <input id="collection-file" type="file" className="hidden" />
                          <label
                            htmlFor="collection-file"
                            className="w-full flex items-center p-4 space-x-10 border border-gl-5 rounded-2xl cursor-pointer"
                          >
                            <div className="flex items-center justify-center w-25 h-25 bg-gl-3 rounded-lg">
                              <Icon icon="heroicons-outline:cloud-upload" className="text-5xl" />
                            </div>
                            <div>
                              <p className="text-xl font-bold">Select media to upload</p>
                              <p>PNG, JPEG, JPG</p>
                            </div>
                          </label>
                        </div>

                        <div className="grid grid-cols-12 gap-4 ">
                          <div className="col-span-12">
                            <InputField label="Collection name" placeholder="Collection name" />
                          </div>
                          <div className="col-span-6">
                            <InputField label="Collection symbol" placeholder="Collection symbol" />
                          </div>
                          <div className="col-span-6">
                            <SelectField label="Network" placeholder="Network">
                              <option value="BEC">BEC</option>
                              <option value="Ethereum">ETH</option>
                            </SelectField>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="mb-6">
                          <p className="text-xl font-bold">Links</p>
                        </div>
                        <div className="space-y-4">
                          <InputField label="Website" placeholder="https://" />
                          <InputField label="Twitter" placeholder="https://" />
                          <InputField label="Discord" placeholder="https://" />
                          <InputField label="Medium" placeholder="https://" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          {editSection === "" && (
            <div className="max-w-5xl pb-20 mx-auto">
              <div className="grid grid-cols-12 gap-11">
                {myDrop.collectibles.map((collectible: any, index: number) => (
                  <div key={index} className={`col-span-4 ${index === 0 && "hidden"}`}>
                    <div className="relative pb-[100%] mb-7 rounded-3xl overflow-hidden group">
                      <div className="absolute top-0 left-0 w-full h-full">
                        <Image
                          src={collectible.imgURL}
                          width="1000"
                          height="1000"
                          alt="NFT"
                          className="w-full h-full object-contain rounded-3xl"
                        />
                        <div className="absolute bottom-0 left-0 flex items-center justify-between w-full p-4 pt-20 bg-gradient-to-b from-transparent to-c-1 group-hover:opacity-0 transition-all">
                          <p className="text-xl text-white font-bold">{collectible.name}</p>
                          <p className="text-xl text-white font-bold">
                            {collectible.amountMinted}/{collectible.supply}
                          </p>
                        </div>
                      </div>
                      <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full bg-black/50 opacity-0 group-hover:opacity-100">
                        <button
                          className="flex items-center justify-center w-14 h-14 mb-2 bg-c-3 hover:bg-c-7 border border-white/40 hover:border-c-7 rounded-full transition-all group button-config"
                          onClick={() => setEditSection("image")}
                        >
                          <Icon
                            icon="heroicons-solid:cog"
                            className="text-3xl text-white group-[.button-config]:hover:text-c-10"
                          />
                        </button>
                        <p className="text-white">Configure</p>
                      </div>
                    </div>
                  </div>
                ))}
                {/* <div className="col-span-3">
              <div className="flex items-center justify-center w-full h-full bg-c-4 border border-dashed border-c-2 rounded-2xl overflow-hidden">
                <div className="text-center pb-16">
                  <div className="inline-flex items-center justify-center w-23 h-23 mb-6 bg-white rounded-full">
                    <Icon icon="heroicons-outline:plus" className="text-[42px]" />
                  </div>
                  <p className="text-xl font-bold">Add Collectible</p>
                </div>
              </div>
            </div> */}
              </div>
            </div>
          )}
        </div>
      </div>

      <ModalCollectiblePublished
        isOpen={collectiblePublished}
        onClose={handleAfterPublished}
        title="Untitled"
        collectibleImage={router.query.image as string}
        url="https://generatelabs/OHTw1412"
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const signedInAddress = getCookie("signed-in-address", { req, res });
  const accessToken = getCookie("signed-in-jwt", { req, res }) as string;

  if (!signedInAddress) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  let myDrop: any;

  try {
    const responseGetMyDrops = await getDropsMyDrop(accessToken);

    myDrop = responseGetMyDrops.data.data;
  } catch (error: any) {
    console.log(error);
  }

  return {
    props: {
      myDrop: myDrop,
    },
  };
};

export default TokenMarket;
