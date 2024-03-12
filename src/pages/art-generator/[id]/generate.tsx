import { Fragment, useEffect, useState } from "react";

import _ from "lodash";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { getCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import Button from "@/components/buttons/button";
import ButtonV2 from "@/components/buttons/button-v2";
import IconArt from "@/components/icons/icon-art";
import IconGenerate from "@/components/icons/icon-generate";
import IconMechanisticAnalysis from "@/components/icons/icon-mechanistic-analysis";
import IconTraits from "@/components/icons/icon-traits";
import Image from "next/image";
import InputField from "@/components/forms/input-field";
import InputFieldV2 from "@/components/forms/input-field-v2";
import Items from "@/components/card/Items";
import LayoutDashboard from "@/layouts/LayoutDashboard";
import Link from "next/link";
import { getTokenSets, getTokenSetsLayers, postTokenSets } from "@/services/TokenSets";
import { getCollections } from "@/services/Collection";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import JSZip from "jszip";
import FileSaver from "file-saver";
import { toPng } from "html-to-image";
import axiosInstance from "@/utils/api";
import { useGetTokenSets, useGetTokenSetsLayers } from "@/queries/collection-queries";
import { useMTokenSets } from "@/queries/token-sets-queries";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const NavSideMenu = [
  {
    name: "traits",
    icon: <Icon icon="heroicons-solid:adjustments" className="text-xl" />,
    text: "Traits",
    url: "#",
  },
  {
    name: "rules",
    icon: <Icon icon="heroicons-solid:tag" className="text-xl" />,
    text: "Rules",
    url: "#",
  },
  {
    name: "custom-image",
    icon: <Icon icon="heroicons-solid:sparkles" className="text-xl" />,
    text: "Custom Image",
    url: "#",
  },
  {
    name: "live-rarity",
    icon: <Icon icon="heroicons-solid:trending-up" className="text-xl" />,
    text: "Live Rarity",
    url: "#",
  },
  {
    name: "hidden-traits",
    icon: <Icon icon="heroicons-solid:eye-off" className="text-xl" />,
    text: "Hidden Traits",
    url: "#",
  },
  {
    name: "rank-by-rarity",
    icon: <Icon icon="heroicons-solid:sort-descending" className="text-xl" />,
    text: "Rank by Rarity",
    url: "#",
  },
  {
    name: "filter",
    icon: <Icon icon="heroicons-solid:filter" className="text-xl" />,
    text: "Filter",
    url: "#",
  },
];

const Filters = ["Hair", "Clothes", "Eyes", "Arm"];

const ArtGeneratorGenerate = () => {
  const router = useRouter();

  const uuid = router.query?.id as string;

  const { data: tokenSets, isLoading: isLoadingGetTokenSets } = useGetTokenSets();
  const { data: tokenSetsLayers, isLoading: isLoadingGetTokenSetsLayers } = useGetTokenSetsLayers({ uuid });

  const [navSideMenu, setNavSideMenu] = useState<string>("traits");
  const [tokenSetsTraitsView, setTokenSetsTraitsView] = useState<string>("");
  const [tokenView, setTokenView] = useState<boolean>(false);
  const [isShow, setIsModalShow] = useState<boolean>(false);
  const [tokenResults, setTokenResults] = useState<any[]>([]);
  const [shuffledTokenResults, setShuffledTokenResults] = useState<any[]>([]);
  const [tokenSet, setTokenSet] = useState<any>();
  const [tokenSetTraits, setTokenSetsTraits] = useState<any>();
  const [isLoadingDownload, setIsLoadingDownload] = useState<boolean>(false);

  const { mutateAsync: mutateAsyncTokenSets } = useMTokenSets();

  useEffect(() => {
    if (tokenSetsLayers) {
      const arrs = tokenSetsLayers?.children || [];
      generateCombinations(arrs);
    }
  }, [uuid, tokenSetsLayers]);

  useEffect(() => {
    if (tokenResults) {
      setShuffledTokenResults(_.shuffle(tokenResults));
    }
  }, [uuid, tokenResults]);

  useEffect(() => {
    if (tokenSets) {
      const currentTokenSet = tokenSets.tokenSets.find((token: any) => {
        if (token.uuid) {
          if (token.uuid === uuid) return token;
        }
      });

      setTokenSet(currentTokenSet);
    }
  }, [tokenSets]);

  useEffect(() => {
    if (tokenSetsTraitsView) {
      const currTokenSetsTraits = tokenSetsLayers.children.find((item: any) => item.name === tokenSetsTraitsView);
      setTokenSetsTraits(currTokenSetsTraits);
    }
  }, [tokenSetsTraitsView]);

  const closeModal = () => {
    setIsModalShow(false);
  };

  const generateCombinations = (arrs: any, index = 0, current: any[] = []) => {
    if (index === arrs.length) {
      setTokenResults(currentTokenResults => [...currentTokenResults, current]);
      return;
    }

    for (let i = 0; i < arrs[index].children.length; i++) {
      generateCombinations(arrs, index + 1, [
        ...current,
        {
          name: arrs[index].name,
          path: `${backendUrl}/${arrs[index].children[i].path}`,
          height: 200,
          width: 200,
          depth: 0,
          imageHeight: 200,
          imageWidth: 200,
          x: 20,
          y: 20,
        },
      ]);
    }
  };

  // Add new token set
  const newTokenSetSchema = Yup.object().shape({
    tokenSetName: Yup.string().required("Token set name is required"),
    supply: Yup.string().required("Supply is required"),
    isAllowDuplicate: Yup.boolean(),
  });

  const {
    register: registerNewTokenSet,
    handleSubmit: handleSubmitNewTokenSet,
    formState: formStateNewTokenSet,
    getValues: getValuesNewTokenSet,
  } = useForm({
    resolver: yupResolver(newTokenSetSchema),
  });

  const { errors: errorsNewTokenSet } = formStateNewTokenSet;

  const handleCreateTokenSets = async () => {
    let tokenObjects: any[] = [];

    if (tokenSetsLayers.children.length > 0) {
      tokenSetsLayers.children.map((token: any) => {
        tokenObjects.push({
          name: token.name,
          path: `${backendUrl}/${token.path}`,
          height: 200,
          width: 200,
          depth: 0,
          x: 20,
          y: 2,
          imageHeight: 200,
          imageWidth: 200,
        });
      });
    }

    const postTokenSetsPayload = {
      objects: tokenObjects,
      total: {
        value: getValuesNewTokenSet("supply"),
      },
      uuid: uuid,
      canvasHeight: 200,
      canvasWidth: 200,
      folderTree: tokenSetsLayers,
      name: getValuesNewTokenSet("tokenSetName"),
      allowDuplicate: getValuesNewTokenSet("isAllowDuplicate"),
    };
    try {
      const responseCreateTokenSets: any = await mutateAsyncTokenSets({ payload: postTokenSetsPayload });
    } catch (error) {
      toast.error("handleCreateTokenSets");
    }
  };

  const handleRegeneratePreview = () => {
    setShuffledTokenResults(_.shuffle(tokenResults));
  };

  const elementToImage = async (element: any) => {
    const image = await toPng(element, { canvasWidth: 512, canvasHeight: 512 });
    return image;
  };

  const handleDownload = async () => {
    setIsLoadingDownload(true);

    const zip = new JSZip();

    // Get all elements with the ID "token-container"
    const elements = Array.from(document.querySelectorAll(`#token-image`));

    // Process each element and add it to the zip file
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const imageBase64 = await elementToImage(element);
      zip.file(`token #${i}.png`, imageBase64.split("base64,")[1], { base64: true });
    }

    // Generate the zip file
    zip.generateAsync({ type: "blob" }).then(blob => {
      // Save the zip file to the user's computer
      FileSaver.saveAs(blob, `${uuid}.zip`);
      setIsLoadingDownload(false);
    });
  };

  return (
    <>
      <LayoutDashboard>
        <div className="relative w-full flex flex-row">
          <div className="flex-shrink-0 px-1.5 pt-6 bg-c-1 border-r border-c-10">
            <div className="space-y-2">
              <div className="flex items-center justify-center w-15 h-15 bg-gl-dark-1 rounded-2xl">
                <IconArt className="fill-white" />
              </div>
              <div className="flex items-center justify-center w-15 h-15 bg-gl-light-1 rounded-2xl">
                <IconGenerate className="fill-black" />
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 px-3.5 pt-6 bg-c-1 border-r border-gl-dark-3">
            <Menu as="div" className="relative inline-block w-full text-white mb-8">
              <div className="w-full">
                <Menu.Button className="w-64 flex items-center justify-between px-4 py-3 space-x-2 border border-c-3 rounded-full cursor-pointer">
                  <p>{tokenSet?.name}</p>
                  <Icon icon="heroicons-outline:chevron-down" className="text-2xl" />
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
                <Menu.Items className="absolute left-0 origin-top-left w-full px-3 py-4 mt-2.5 bg-c-1 border border-c-3 rounded-2xl">
                  <div className="px-1 py-1 ">
                    {!isLoadingGetTokenSets && (
                      <>
                        {tokenSets.tokenSets.map((token: any, index: number) => {
                          if (token.name) {
                            return (
                              <Menu.Item key={index}>
                                {({ active }) => (
                                  <div className="flex items-center justify-center space-x-2">
                                    <button
                                      className="flex items-center w-full p-2 space-x-2 hover:bg-c-10 rounded-lg text-left transition-all"
                                      onClick={() => router.push(`/art-generator/${token.uuid}/generate`)}
                                    >
                                      <span className="whitespace-nowrap">{token.name}</span>
                                    </button>
                                    <button className="flex items-center justify-center p-2 space-x-2 hover:bg-c-10 rounded-lg text-left transition-all">
                                      <Icon icon="heroicons-outline:dots-vertical" className="text-xl" />
                                    </button>
                                  </div>
                                )}
                              </Menu.Item>
                            );
                          }
                        })}
                      </>
                    )}
                    {/* <Menu.Item>
                      {({ active }) => (
                        <button className="flex items-center justify-between w-full p-2 space-x-2 hover:bg-c-10 rounded-lg text-left transition-all">
                          <span className="whitespace-nowrap">New set of collection</span>
                          <Icon icon="heroicons-outline:dots-vertical" className="text-xl" />
                        </button>
                      )}
                    </Menu.Item> */}
                    <hr className="my-4 border-c-3" />
                    <Menu.Item>
                      {({ active }) => (
                        <ButtonV2 size="sm" variant="2-outline" className="w-full" onClick={() => setIsModalShow(true)}>
                          <Icon icon="heroicons-outline:plus" className="text-xl" />
                          <span className="whitespace-nowrap">Create new token</span>
                        </ButtonV2>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <div className="flex flex-col space-y-1">
              {NavSideMenu.map(menu => (
                <div key={menu.text} className={`group ${menu.name === navSideMenu ? "active" : ""}`}>
                  <button
                    type="button"
                    className="flex items-center w-full px-6 py-3 space-x-2 bg-transparent hover:bg-c-4 group-[.active]:bg-c-2 border border-transparent rounded-lg text-white group-[.active]:text-white transition-all"
                    onClick={() => setNavSideMenu(menu.name)}
                  >
                    {menu.icon}
                    <span>{menu.text}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0 w-[402px] px-6 pt-6 border-r border-gl-dark-3">
            {tokenView ? (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold">Token #1</h2>
                  <button onClick={() => setTokenView(false)}>
                    <Icon icon="heroicons-outline:x" className="text-2xl" />
                  </button>
                </div>
                <Image
                  src="/images/nft-1.jpg"
                  width="500"
                  height="500"
                  alt="Token"
                  className="w-full h-full object-cover mb-6 rounded-lg"
                />
                <div className="flex gap-4">
                  <div className="flex-1">
                    <ButtonV2 variant="1" size="base" className="w-full mb-6">
                      <span>Layers</span>
                    </ButtonV2>
                  </div>
                  <div className="flex-1">
                    <ButtonV2 variant="1-outline" size="base" className="w-full mb-6">
                      <span>Custom traits</span>
                    </ButtonV2>
                  </div>
                </div>
                <div className="flex flex-col space-y-4">
                  {Filters.map((filter: any, index: any) => (
                    <div key={index} className="flex items-center justify-between">
                      <p>{filter}</p>
                      <input
                        type="text"
                        className="px-2 py-1 border border-c-3 rounded-lg text-sm"
                        placeholder="Knight Hair"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {navSideMenu === "token-sets" && (
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-xl font-bold">Token Sets</h2>
                      <ButtonV2 variant="4" size="xs">
                        <span>New Set</span>
                      </ButtonV2>
                    </div>
                    <div className="grid grid-cols-12 gap-x-3 gap-y-6 mb-6">
                      <div className="col-span-8">
                        <InputFieldV2 label="Name" placeholder="Voyaji" />
                      </div>
                      <div className="col-span-4">
                        <InputFieldV2 label="Supply" placeholder="1000" />
                      </div>
                      <div className="col-span-12">
                        <InputFieldV2 label="Inlcude 1 to 1s" />
                      </div>
                      <div className="col-span-12">
                        <div className="flex items-center space-x-2">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
                          </label>
                          <p>Allow duplicate image</p>
                        </div>
                      </div>
                      <div className="col-span-12">
                        <ButtonV2 variant="1" size="base" className="w-full">
                          <span>Regenerate tokens</span>
                        </ButtonV2>
                      </div>
                    </div>
                    <div className="p-6 border border-c-3 rounded-lg">
                      <p>Generate Labs Collection</p>
                      <div className="flex items-end justify-between">
                        <div className="flex items-center mb-1 space-x-2 text-c-3">
                          <Icon icon="heroicons-outline:collection" className="text-xl" />
                          <p className="text-sm">10000 tokens</p>
                        </div>
                        <ButtonV2 variant="7" size="base-square">
                          <Icon icon="heroicons-outline:dots-vertical" className="text-2xl" />
                        </ButtonV2>
                      </div>
                    </div>
                  </div>
                )}

                {navSideMenu === "traits" && (
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center space-x-3">
                        <h2 className="text-xl font-bold">Traits and Rarity</h2>
                        <Icon icon="heroicons-outline:exclamation-circle" className="text-2xl" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      {tokenSetsLayers?.children?.map((item: any, index: number) => (
                        <div
                          key={index}
                          className={`flex items-center w-full p-2 space-x-4 rounded-lg cursor-pointer group ${
                            item.name === tokenSetsTraitsView ? "active bg-gl-1" : "bg-transparent hover:bg-gl-3"
                          } transition-all`}
                          onClick={() => {
                            setTokenSetsTraitsView(item.name === tokenSetsTraitsView ? "" : item.name);
                          }}
                        >
                          <Image
                            src={`${backendUrl}/${item.children[0].path}`}
                            width="100"
                            height="100"
                            alt="Token"
                            className="w-14 h-14 rounded"
                          />
                          <div className="space-y-1">
                            <p className="group-[.active]:text-white transition-all">{item.name}</p>
                            <p className="text-xs text-c-3 group-[.active]:text-white transition-all">
                              {item.children.length} Variations
                            </p>
                          </div>
                          <Icon
                            icon="heroicons-outline:chevron-right"
                            className="!ml-auto text-xl group-[.active]:text-white transition-all"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {navSideMenu === "rules" && (
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center space-x-3">
                        <h2 className="text-xl font-bold">Rules</h2>
                        <Icon icon="heroicons-outline:exclamation-circle" className="text-2xl" />
                      </div>
                      <ButtonV2 variant="4" size="xs">
                        <span>Create rule</span>
                      </ButtonV2>
                    </div>
                    <div className="flex flex-col items-center p-6 pt-2 bg-gl-blue-2 border border-gl-1 border-dashed rounded-xl text-center">
                      <Image
                        src="/images/contract-smart.png"
                        width="150"
                        height="150"
                        alt="Image"
                        className="w-56 h-auto mt-8 mb-12"
                      />
                      <p className="text-c-3 text-sm max-w-[210px]">
                        Use Rules to control which trait can appear together.
                      </p>
                    </div>
                  </div>
                )}
                {navSideMenu === "custom-image" && (
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center space-x-3">
                        <h2 className="text-xl font-bold">Custom Image</h2>
                        <Icon icon="heroicons-outline:exclamation-circle" className="text-2xl" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center p-6 pt-2 bg-gl-blue-2 border border-gl-1 border-dashed rounded-xl text-center">
                      <Image
                        src="/images/contract-smart.png"
                        width="150"
                        height="150"
                        alt="Image"
                        className="w-56 h-auto mt-8 mb-12"
                      />
                      <p className="text-c-3 text-sm max-w-[240px]">
                        Token with custom artwork & metadata, not created by generating
                      </p>
                    </div>
                  </div>
                )}
                {navSideMenu === "live-rarity" && (
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-xl font-bold">Live Rarity</h2>
                    </div>
                    <div className="flex items-center mb-9 space-x-4">
                      <Icon icon="heroicons-outline:exclamation-circle" className="text-2xl flex-shrink-0" />
                      <p className="text-sm">
                        Real Rarity of your traits, after random generation and any manual changes.
                      </p>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <h2 className="font-medium mb-6">Hair</h2>
                        <div className="space-y-4">
                          {new Array(5).fill("").map((item: any, index: number) => (
                            <div key={index} className="flex items-center w-full space-x-4">
                              <Image
                                src="/images/trait.png"
                                width="100"
                                height="100"
                                alt="Token"
                                className="w-14 h-14 rounded"
                              />
                              <div className="space-y-1">{index === 4 ? <p>Empty</p> : <p>Variation name</p>}</div>
                              <div className="flex items-center !ml-auto space-x-2">
                                <div className="px-2 py-0.5 bg-c-7 rounded-lg">{index === 4 ? "0" : "12"}</div>
                                <div className="px-2 py-0.5 bg-c-2 rounded-lg text-white">
                                  {index === 4 ? "0" : "10.8"}%
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h2 className="font-medium mb-6">Clothes</h2>
                        <div className="space-y-4">
                          {new Array(5).fill("").map((item: any, index: number) => (
                            <div key={index} className="flex items-center w-full space-x-4">
                              <Image
                                src="/images/trait.png"
                                width="100"
                                height="100"
                                alt="Token"
                                className="w-14 h-14 rounded"
                              />
                              <div className="space-y-1">{index === 4 ? <p>Empty</p> : <p>Variation name</p>}</div>
                              <div className="flex items-center !ml-auto space-x-2">
                                <div className="px-2 py-0.5 bg-c-7 rounded-lg">{index === 4 ? "0" : "12"}</div>
                                <div className="px-2 py-0.5 bg-c-2 rounded-lg text-white">
                                  {index === 4 ? "0" : "10.8"}%
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {navSideMenu === "hidden-traits" && (
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-xl font-bold">Traits and Rarity</h2>
                    </div>
                    <div className="flex items-center mb-9 space-x-4">
                      <Icon icon="heroicons-outline:exclamation-circle" className="text-2xl flex-shrink-0" />
                      <p className="text-sm">You can hide & unhide traits without regenerating the collection</p>
                    </div>
                    <div className="space-y-4">
                      {new Array(6).fill("").map((item: any, index: number) => (
                        <div key={index} className="flex items-center w-full space-x-4">
                          <Image
                            src="/images/trait.png"
                            width="100"
                            height="100"
                            alt="Token"
                            className="w-14 h-14 rounded"
                          />
                          <div className="space-y-1">
                            <p>Clothes</p>
                            <p className="text-xs text-c-3">9 Variations</p>
                          </div>
                          <div className="!ml-auto">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {navSideMenu === "rank-by-rarity" && (
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center space-x-3">
                        <h2 className="text-xl font-bold">Rank by Rarity</h2>
                        <Icon icon="heroicons-outline:exclamation-circle" className="text-2xl" />
                      </div>
                      <ButtonV2 variant="4" size="xs">
                        <span>Export CSV</span>
                      </ButtonV2>
                    </div>
                    <div className="space-y-4">
                      {new Array(10).fill("").map((item: any, index: number) => (
                        <div key={index} className="flex items-center w-full space-x-4">
                          <Image
                            src="/images/nft-1.jpg"
                            width="100"
                            height="100"
                            alt="Token"
                            className="w-14 h-14 rounded"
                          />
                          <div className="space-y-1">
                            <p>Token #123</p>
                          </div>
                          <div className="flex items-center !ml-auto space-x-2">
                            <div className="px-2 py-0.5 bg-c-7 rounded-lg">#12</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {navSideMenu === "filter" && (
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-xl font-bold">Filter Collection</h2>
                      <ButtonV2 variant="8" size="xs">
                        <span>Reset</span>
                      </ButtonV2>
                    </div>
                    <div>
                      {Filters.map((filter: any, index: number) => (
                        <Disclosure key={index}>
                          {({ open }) => (
                            <>
                              <Disclosure.Button
                                className={`flex items-center justify-between w-full py-4 ${
                                  !open && "border-b border-gl-dark-3"
                                }`}
                              >
                                <span className="font-semibold">{filter}</span>
                                <div className={`${open ? "rotate-180 transform" : ""} transition-all`}>
                                  <Icon icon="heroicons-outline:chevron-down" className="text-2xl" />
                                </div>
                              </Disclosure.Button>
                              <Transition
                                enter="transition duration-100 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-75 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                              >
                                <Disclosure.Panel className="h-full border-b border-gl-dark-3">
                                  <div className="pb-6">
                                    <div className="grid grid-cols-12 gap-3">
                                      {new Array(6).fill("").map((item: any, index: number) => (
                                        <div key={index} className="col-span-6">
                                          <div className="flex items-center space-x-2">
                                            <input
                                              id={filter + index.toString()}
                                              type="checkbox"
                                              className="w-4 h-4 cursor-pointer"
                                            />
                                            <label htmlFor={filter + index.toString()} className="cursor-pointer">
                                              Knight {filter}
                                            </label>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </Disclosure.Panel>
                              </Transition>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="flex-shrink-0 flex-1 w-full h-full p-6">
            <div className="flex items-center mb-4 space-x-2">
              <ButtonV2 variant="1" size="xs" onClick={handleRegeneratePreview}>
                <Icon icon="heroicons-outline:refresh" />
                <span>Regenerate Preview</span>
              </ButtonV2>
              <div className="flex-1 flex items-center justify-end space-x-2">
                <input
                  type="text"
                  className="w-full max-w-[200px] px-4 py-1.5 border border-c-5 rounded-lg text-sm"
                  placeholder="Search"
                />
                <input
                  type="text"
                  className="px-4 py-1.5 border border-c-5 rounded-lg text-sm"
                  placeholder="Sort: Token#"
                />
              </div>
            </div>

            {!tokenSetTraits && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-c-3">{shuffledTokenResults.length} Results</p>
                  <ButtonV2 variant="1" size="xs" onClick={handleDownload} disabled={isLoadingDownload}>
                    {isLoadingDownload ? (
                      <Icon icon="line-md:loading-twotone-loop" />
                    ) : (
                      <Icon icon="heroicons-outline:download" />
                    )}
                    <span>Download</span>
                  </ButtonV2>
                </div>
                <div className="grid grid-cols-12 gap-4">
                  {shuffledTokenResults.map((item: any, index: number) => {
                    return (
                      <div key={index} className="col-span-3">
                        <Items
                          number={index + 1}
                          // onClick={setCurrentElement}
                          // files={props.folderStructure}
                          hashedFolder={item}
                          // imageHeight={canvasHeight.value}
                          // imageWidth={canvasWidth.value}
                          // setCoord={setCoord}
                          // parent={parentRef}
                        />
                      </div>
                    );
                  })}
                  {/* {new Array(16).fill("").map((item: any, index: number) => (
                    <div key={index} className="col-span-3 cursor-pointer group" onClick={() => setTokenView(true)}>
                      <div className="w-full p-2 bg-c-7 group-hover:bg-c-4 rounded-lg transition-all">
                        <Image
                          src="/images/nft-1.jpg"
                          width="200"
                          height="200"
                          alt="Token"
                          className="w-full h-full object-cover mb-2 rounded"
                        />
                        <p>Token #{index + 1}</p>
                      </div>
                    </div>
                  ))} */}
                </div>
              </>
            )}
            {tokenSetTraits && (
              <div className="grid grid-cols-12 gap-4">
                {tokenSetTraits.children.map((item: any, index: number) => (
                  <div key={index} className="col-span-3 cursor-pointer group">
                    <div className="w-full p-2 border border-c-3 rounded-lg transition-all">
                      <Image
                        src={`${backendUrl}/${item.path}`}
                        width="200"
                        height="200"
                        alt="Token"
                        className="w-full h-full object-cover mb-2 rounded"
                      />
                      <div className="flex items-center justify-between mb-4">
                        <p className="truncate">{item.name}</p>
                      </div>
                      <div className="mb-2.5 space-y-1.5">
                        <p className="text-xs text-c-3">Rarity</p>
                        <div className="w-full h-2 rounded-full bg-c-2"></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs">Estimated 50.3%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </LayoutDashboard>

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
                    <div className="mb-11 space-y-2">
                      <h2 className="text-2xl font-bold">Add new set of token</h2>
                    </div>
                    <div className="grid grid-cols-12 gap-x-3 gap-y-6 mb-6">
                      <div className="col-span-8">
                        <InputFieldV2
                          label="Name"
                          placeholder="Name set of Collection"
                          {...registerNewTokenSet("tokenSetName")}
                          error={errorsNewTokenSet.tokenSetName?.message}
                        />
                      </div>
                      <div className="col-span-4">
                        <InputFieldV2
                          label="Supply"
                          placeholder="1000"
                          {...registerNewTokenSet("supply")}
                          error={errorsNewTokenSet.supply?.message}
                        />
                      </div>
                      <div className="col-span-12">
                        <div className="flex items-center space-x-2">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              {...registerNewTokenSet("isAllowDuplicate")}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
                          </label>
                          <p>Allow duplicate image</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-14">
                      <ButtonV2
                        size="base"
                        variant="2"
                        className="w-full"
                        onClick={handleSubmitNewTokenSet(data => handleCreateTokenSets())}
                      >
                        <span>Generate collection</span>
                      </ButtonV2>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ArtGeneratorGenerate;

ArtGeneratorGenerate.requiredAuth = true;
