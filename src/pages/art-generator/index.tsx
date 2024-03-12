import ButtonV2 from "@/components/buttons/button-v2";
import InputField from "@/components/forms/input-field";
import LayoutScreenMain from "@/layouts/LayoutScreenMain";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { setCookie } from "cookies-next";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { GetServerSideProps } from "next";
import { postCollections } from "@/services/Collection";
import { getTokenSetsLayers, postTokenSets, postTokenSetsUploadFiles } from "@/services/TokenSets";
import Input from "@/components/atoms/inputs/Input";
import { sanitizeNumeric, sanitizeUppercase } from "@/utils/sanitizationUtils";
import {
  useGetTokenSetsLayers,
  useMGetTokenSetsLayers,
  useMTokenSets,
  useTokenSetsUploadFiles,
} from "@/queries/token-sets-queries";
import { useSession } from "next-auth/react";
import { useMCollections } from "@/queries/collection-queries";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

declare module "react" {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    directory?: string;
    webkitdirectory?: string;
  }
}

const ArtGenerator = () => {
  const { data: sessionData } = useSession();

  const router = useRouter();

  const [step, setStep] = useState<number>(1);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync: mutateAsyncTokenSetsUploadFiles } = useTokenSetsUploadFiles();
  const { mutateAsync: mutateAsyncGetTokenSetsLayers } = useMGetTokenSetsLayers();
  const { mutateAsync: mutateAsyncTokenSets } = useMTokenSets();
  const { mutateAsync: mutateAsyncCollections } = useMCollections();

  // Collection information
  const collectionInformationSchema = Yup.object().shape({
    collectionName: Yup.string().required("Collection name is required"),
    supply: Yup.string().required("Supply is required"),
    symbol: Yup.string().required("Symbol is required"),
  });

  const {
    control: controlCollectionInformation,
    handleSubmit: handleSubmitCollectionInformation,
    formState: formStateCollectionInformation,
    getValues: getValuesCollectionInformation,
  } = useForm({
    resolver: yupResolver(collectionInformationSchema),
  });

  const { errors: errorsCollectionInformation } = formStateCollectionInformation;

  // Collection chain
  const chainInformationSchema = Yup.object().shape({
    chain: Yup.string().required("Blockchain is required"),
  });

  const {
    register: registerChainInformation,
    handleSubmit: handleSubmitChainInformation,
    formState: formStateChainInformation,
    getValues: getValuesChainInformation,
    setValue: setValuesChainInformation,
    watch: watchChainInformation,
  } = useForm({
    resolver: yupResolver(chainInformationSchema),
  });

  const { errors: errorsChainInformation } = formStateChainInformation;

  // Stage
  const stageInformationSchema = Yup.object().shape({
    stage: Yup.string().required("Stage is required"),
  });

  const {
    register: registerStageInformation,
    handleSubmit: handleSubmitStageInformation,
    formState: formStateStageInformation,
    getValues: getValuesStageInformation,
    watch: watchStageInformation,
  } = useForm({
    resolver: yupResolver(stageInformationSchema),
  });

  const { errors: errorsStageInformation } = formStateStageInformation;

  const onDrop = useCallback((acceptedFiles: any) => {
    setSelectedFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
    },
  });

  const transformData = (inputData: { path: string }[]): { category: string; traits: string[] }[] => {
    return inputData.reduce((acc: any, item) => {
      const pathParts = item.path.split("/");

      if (pathParts.length === 4) {
        const category = pathParts[2];
        const trait = pathParts[3];

        const existingCategory = acc.find((entry: any) => entry.category === category);

        if (existingCategory) {
          existingCategory.traits.push(trait);
        } else {
          acc.push({
            category: category,
            traits: [trait],
          });
        }
      }

      return acc;
    }, []);
  };

  const handleUploadFiles = async () => {
    setIsLoading(true);

    const formData = new FormData();
    selectedFiles &&
      selectedFiles.forEach((file: any) => {
        let path = file.path.split("/")[2];
        formData.append(path, file);
      });

    try {
      const resPostTokenSetsUploadFiles = await mutateAsyncTokenSetsUploadFiles({
        token: sessionData?.user?.token || "",
        payload: formData,
      });

      // setCookie("uuid", resPostTokenSetsUploadFiles.data.uuid);
      handleCreateTokenSets(resPostTokenSetsUploadFiles.data.uuid);
    } catch (error) {
      setIsLoading(false);
      toast.error("handleUploadFiles");
    }
  };

  const handleCreateTokenSets = async (uuid: string) => {
    let tokenSets: any;
    let tokenObjects: any[] = [];

    try {
      const resGetTokenSetsLayers = await mutateAsyncGetTokenSetsLayers({
        token: sessionData?.user?.token || "",
        uuid: uuid,
      });

      tokenSets = resGetTokenSetsLayers.data;
    } catch (error) {
      setIsLoading(false);
      toast.error("handleCreateTokenSets 1");

      return;
    }

    if (tokenSets.children.length > 0) {
      tokenSets.children.map((token: any) => {
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
        value: parseInt(getValuesCollectionInformation("supply")),
      },
      uuid: uuid,
      canvasHeight: 200,
      canvasWidth: 200,
      folderTree: tokenSets,
      name: getValuesCollectionInformation("collectionName"),
      allowDuplicate: true,
    };

    try {
      const responseCreateTokenSets = await mutateAsyncTokenSets({
        payload: postTokenSetsPayload,
      });

      handleCreateCollections(uuid, responseCreateTokenSets.data._id);
    } catch (error) {
      setIsLoading(false);
      toast.error("handleCreateTokenSets 2");
    }
  };

  const handleCreateCollections = async (uuid: string, id: string) => {
    const postCollectionsPayload = {
      name: getValuesCollectionInformation("collectionName"),
      symbol: getValuesCollectionInformation("symbol"),
      totalSupply: parseInt(getValuesCollectionInformation("supply")),
      chainName: "BSC",
      tokenSetId: id,
    };
    try {
      await mutateAsyncCollections({ payload: postCollectionsPayload });

      router.push(`/art-generator/${uuid}/${getValuesStageInformation("stage")}`);
    } catch (error) {
      setIsLoading(false);
      toast.error("handleCreateCollections");
    }
  };

  return (
    <LayoutScreenMain>
      <div className="bg-black text-white rounded-tl-3xl rounded-tr-3xl">
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-full max-w-w-1 px-4 lg:px-6">
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#363636]"
            onClick={() => router.push("/")}
          >
            <Icon icon="heroicons-outline:chevron-left" className="text-2xl" />
          </button>
        </div>
        <div className="relative w-full max-w-w-1 mx-auto px-4 lg:px-6">
          <div className="pb-20">
            {step === 1 && (
              <div className="flex items-center justify-center w-full h-full">
                <div className="flex flex-col w-full max-w-3xl mx-auto">
                  <div>
                    <h1 className="mb-6 text-5xl font-bold text-center">Get started with Art Generator</h1>
                    <div className="w-full max-w-xl mx-auto">
                      <p className="text-gl-dark-3 text-center mb-12">
                        Tell us a bit about your project. You can always change your project name and the count later.
                      </p>
                      <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12">
                          <Input
                            control={controlCollectionInformation}
                            name="collectionName"
                            theme="dark"
                            label="Collection name"
                            placeholder="Generate labs"
                            error={errorsCollectionInformation.collectionName?.message}
                          />
                        </div>
                        <div className="col-span-6">
                          <Input
                            control={controlCollectionInformation}
                            name="supply"
                            theme="dark"
                            label="Supply"
                            placeholder="10000"
                            error={errorsCollectionInformation.supply?.message}
                            sanitization={sanitizeNumeric}
                          />
                        </div>
                        <div className="col-span-6">
                          <Input
                            control={controlCollectionInformation}
                            name="symbol"
                            theme="dark"
                            label="Symbol"
                            placeholder="SYM"
                            error={errorsCollectionInformation.symbol?.message}
                            sanitization={sanitizeUppercase}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-40">
                        <div className="flex items-center justify-center space-x-6">
                          <button className="block w-3.5 h-3.5 rounded-full bg-gl-blue-1"></button>
                          <button className="block w-3.5 h-3.5 rounded-full bg-gl-light-1"></button>
                          <button className="block w-3.5 h-3.5 rounded-full bg-gl-light-1"></button>
                        </div>
                        <ButtonV2 variant="2" onClick={handleSubmitCollectionInformation(() => setStep(2))}>
                          <span>Continue</span>
                        </ButtonV2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex items-center justify-center w-full h-full">
                <div className="flex flex-col w-full max-w-3xl mx-auto">
                  <div>
                    <h1 className="mb-6 text-5xl font-bold text-center">Blockchain</h1>
                    <div className="w-full max-w-xl mx-auto">
                      <p className="text-gl-dark-3 text-center mb-12">Select your blockchain for your collection.</p>
                      <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-6">
                          <div
                            className={`flex items-center justify-center w-full p-2 rounded-xl transition-all cursor-pointer ${
                              watchChainInformation("chain") === "ethereum"
                                ? "bg-gl-1"
                                : "bg-gl-dark-1 hover:bg-gl-dark-2"
                            }`}
                            onClick={() => {
                              if (getValuesChainInformation("chain")) {
                                setValuesChainInformation("chain", "");
                              } else {
                                setValuesChainInformation("chain", "ethereum");
                              }
                            }}
                          >
                            <Image
                              src="/images/chain-ethereum.png"
                              width="200"
                              height="200"
                              alt=""
                              className="w-auto h-11"
                            />
                          </div>
                        </div>
                        <div className="col-span-6">
                          <div className="flex items-center justify-center w-full p-2 bg-[#131313] rounded-xl transition-all cursor-pointer">
                            <Image
                              src="/images/chain-polygon.png"
                              width="200"
                              height="200"
                              alt=""
                              className="w-auto h-11 opacity-10"
                            />
                          </div>
                        </div>
                        <div className="col-span-6">
                          <div className="flex items-center justify-center w-full p-2 bg-[#131313] rounded-xl transition-all cursor-pointer">
                            <Image
                              src="/images/chain-solana.png"
                              width="200"
                              height="200"
                              alt=""
                              className="w-auto h-11 opacity-10"
                            />
                          </div>
                        </div>
                        <div className="col-span-6">
                          <div className="flex items-center justify-center w-full p-2 bg-[#131313] rounded-xl transition-all cursor-pointer">
                            <Image
                              src="/images/chain-optimism.png"
                              width="200"
                              height="200"
                              alt=""
                              className="w-auto h-11 opacity-10"
                            />
                          </div>
                        </div>
                        <div className="col-span-6">
                          <div className="flex items-center justify-center w-full p-2 bg-[#131313] rounded-xl transition-all cursor-pointer">
                            <Image
                              src="/images/chain-arbitrum.png"
                              width="200"
                              height="200"
                              alt=""
                              className="w-auto h-11 opacity-10"
                            />
                          </div>
                        </div>
                        <div className="col-span-6">
                          <div className="flex items-center justify-center w-full p-2 bg-[#131313] rounded-xl transition-all cursor-pointer">
                            <Image
                              src="/images/chain-avalanche.png"
                              width="200"
                              height="200"
                              alt=""
                              className="w-auto h-11 opacity-10"
                            />
                          </div>
                        </div>
                      </div>
                      {errorsChainInformation.chain?.message && (
                        <div className="mt-4">
                          <p className="text-sm text-c-6">{errorsChainInformation.chain?.message}</p>
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-40">
                        <div className="flex items-center justify-center space-x-6">
                          <button className="block w-3.5 h-3.5 rounded-full bg-gl-light-1"></button>
                          <button className="block w-3.5 h-3.5 rounded-full bg-gl-blue-1"></button>
                          <button className="block w-3.5 h-3.5 rounded-full bg-gl-light-1"></button>
                        </div>
                        <div className="flex space-x-4">
                          <ButtonV2 onClick={() => setStep(1)}>
                            <span>Back</span>
                          </ButtonV2>
                          <ButtonV2 variant="2" onClick={handleSubmitChainInformation(() => setStep(3))}>
                            <span>Continue</span>
                          </ButtonV2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex items-center justify-center w-full h-full">
                <div className="flex flex-col w-full max-w-3xl mx-auto">
                  <div>
                    <h1 className="mb-6 text-5xl font-bold text-center">What stage is your project at?</h1>
                    <div className="w-full max-w-xl mx-auto">
                      <p className="text-gl-dark-3 text-center mb-12">
                        You can skip straight to contract deployment if your artwork and metadata files are ready.
                      </p>

                      <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12">
                          <input
                            type="radio"
                            id="artStageArt"
                            value="generate"
                            className="hidden peer"
                            {...registerStageInformation("stage")}
                          />
                          <label
                            htmlFor="artStageArt"
                            className="block w-full px-8 py-4 pb-12 bg-gl-dark-1 hover:bg-gl-dark-2 peer-checked:bg-gl-blue-1 rounded-xl peer-checked:text-white transition-all cursor-pointer"
                          >
                            <p className="mb-3 font-bold">I need to generate the Art</p>
                            <p className="text-sm">
                              You have the layers, and need to test them or generate the full collection.
                            </p>
                          </label>
                        </div>
                        <div className="col-span-12">
                          <input
                            type="radio"
                            id="artStageSmartContract"
                            value="contracts"
                            className="hidden peer"
                            {...registerStageInformation("stage")}
                          />
                          <label
                            htmlFor="artStageSmartContract"
                            className="block w-full px-8 py-4 pb-12 bg-gl-dark-1 hover:bg-gl-dark-2 peer-checked:bg-gl-blue-1 rounded-xl peer-checked:text-white transition-all cursor-pointer"
                          >
                            <p className="mb-3 font-bold">
                              Generate the Smart contract Artwork and files are ready to upload
                            </p>
                            <p className="text-sm">Artwork and files are ready to upload</p>
                          </label>
                        </div>
                      </div>
                      {errorsStageInformation.stage?.message && (
                        <div className="mt-4">
                          <p className="text-sm text-c-6">{errorsStageInformation.stage?.message}</p>
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-40">
                        <div className="flex items-center justify-center space-x-6">
                          <button className="block w-3.5 h-3.5 rounded-full bg-gl-light-1"></button>
                          <button className="block w-3.5 h-3.5 rounded-full bg-gl-light-1"></button>
                          <button className="block w-3.5 h-3.5 rounded-full bg-gl-blue-1"></button>
                        </div>
                        <div className="flex space-x-4">
                          <ButtonV2 onClick={() => setStep(2)}>
                            <span>Back</span>
                          </ButtonV2>
                          <ButtonV2 variant="2" onClick={handleSubmitStageInformation(() => setStep(4))}>
                            <span>Continue</span>
                          </ButtonV2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="flex items-center justify-center w-full h-full">
                <div className="flex flex-col w-full max-w-3xl mx-auto">
                  <div>
                    <h1 className="mb-6 text-5xl font-bold text-center">Upload your trait files</h1>
                    <div className="w-full max-w-xl mx-auto">
                      <p className="text-gl-dark-3 text-center mb-12">
                        Selected folder should contain a sub-folder for each trait, with the artwork files
                      </p>

                      {selectedFiles.length <= 0 ? (
                        <>
                          {/* TODO: Static UI when upload trait */}
                          <div className="w-full" {...getRootProps()} onClick={() => {}}>
                            <input {...getInputProps()} directory="" webkitdirectory="" type="file" />
                            <div className="flex items-end justify-center w-full h-[440px] p-12 bg-gl-dark-1 border border-dashed border-white rounded-2xl">
                              <div className="text-center">
                                <p className="text-xl font-bold mb-4">Drag & drop your folder</p>
                                <p>
                                  Or <span className="text-gl-blue-1">choose a folder</span> to get started
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <button
                            className="w-full mb-6 bg-gl-dark-1 p-4 text-white rounded-xl"
                            onClick={() => setSelectedFiles([])}
                          >
                            Select a different folder
                          </button>

                          {/* TODO: Static UI when trait uploaded */}
                          <div className="h-full border border-gl-dark-2 rounded-2xl divide-y divide-gl-dark-2 overflow-auto">
                            {transformData(selectedFiles as any).map((trait: any, index: number) => {
                              return (
                                <div key={index} className="flex items-center px-6 py-4">
                                  {isLoading ? (
                                    <Icon icon="line-md:loading-twotone-loop" className="w-6 h-6" />
                                  ) : (
                                    <div className="flex items-center justify-center w-6 h-6 bg-gl-blue-1 rounded-full text-white">
                                      <Icon icon="heroicons-outline:check" />
                                    </div>
                                  )}

                                  <p className="ml-4">{trait.category}</p>
                                  <p className="ml-auto text-gl-dark-3">{trait.traits.length} traits</p>
                                </div>
                              );
                            })}
                            {/* <div className="flex items-center px-6 py-4">
                            <div className="flex items-center justify-center w-6 h-6 bg-gl-blue-1 rounded-full text-white">
                              <Icon icon="heroicons-outline:check" />
                            </div>
                            <p className="ml-4">Skin</p>
                            <p className="ml-auto text-gl-dark-3">29 traits</p>
                          </div>
                          <div className="flex items-center px-6 py-4">
                            <div className="flex items-center justify-center w-6 h-6 bg-gl-blue-1 rounded-full text-white">
                              <Icon icon="heroicons-outline:check" />
                            </div>
                            <p className="ml-4">Accessories</p>
                            <p className="ml-auto text-gl-dark-3">29 traits</p>
                          </div>
                          <div className="flex items-center px-6 py-4">
                            <div className="flex items-center justify-center w-6 h-6 bg-gl-blue-1 rounded-full text-white">
                              <Icon icon="heroicons-outline:check" />
                            </div>
                            <p className="ml-4">Clothes</p>
                            <p className="ml-auto text-gl-dark-3">29 traits</p>
                          </div>
                          <div className="flex items-center px-6 py-4">
                            <div className="flex items-center justify-center w-6 h-6 bg-gl-blue-1 rounded-full text-white">
                              <Icon icon="heroicons-outline:check" />
                            </div>
                            <p className="ml-4">Headgear</p>
                            <p className="ml-auto text-gl-dark-3">29 traits</p>
                          </div>
                          <div className="flex items-center px-6 py-4">
                            <Icon icon="line-md:loading-twotone-loop" className="w-6 h-6" />
                            <p className="ml-4">Ears</p>
                            <p className="ml-auto text-gl-dark-3">29 traits</p>
                          </div>
                          <div className="flex items-center px-6 py-4">
                            <Icon icon="line-md:loading-twotone-loop" className="w-6 h-6" />
                            <p className="ml-4">Others</p>
                            <p className="ml-auto text-gl-dark-3">29 traits</p>
                          </div> */}
                          </div>

                          {/* <div className="h-full border border-gl-dark-2 rounded-2xl divide-y divide-gl-dark-2 overflow-auto">
                      <div className="flex items-center px-6 py-4">
                        <Icon icon="lucide:list-filter" />
                        <p className="ml-4">Background</p>
                        <label className="relative inline-flex items-center cursor-pointer ml-auto">
                          <input type="checkbox" value="" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      <div className="flex items-center px-6 py-4">
                        <Icon icon="lucide:list-filter" />
                        <p className="ml-4">Skin</p>
                        <label className="relative inline-flex items-center cursor-pointer ml-auto">
                          <input type="checkbox" value="" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      <div className="flex items-center px-6 py-4">
                        <Icon icon="lucide:list-filter" />
                        <p className="ml-4">Accessories</p>
                        <label className="relative inline-flex items-center cursor-pointer ml-auto">
                          <input type="checkbox" value="" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      <div className="flex items-center px-6 py-4">
                        <Icon icon="lucide:list-filter" />
                        <p className="ml-4">Clothes</p>
                        <label className="relative inline-flex items-center cursor-pointer ml-auto">
                          <input type="checkbox" value="" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      <div className="flex items-center px-6 py-4">
                        <Icon icon="lucide:list-filter" />
                        <p className="ml-4">Headgear</p>
                        <label className="relative inline-flex items-center cursor-pointer ml-auto">
                          <input type="checkbox" value="" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      <div className="flex items-center px-6 py-4">
                        <Icon icon="lucide:list-filter" />
                        <p className="ml-4">Ears</p>
                        <label className="relative inline-flex items-center cursor-pointer ml-auto">
                          <input type="checkbox" value="" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      <div className="flex items-center px-6 py-4">
                        <Icon icon="lucide:list-filter" />
                        <p className="ml-4">Others</p>
                        <label className="relative inline-flex items-center cursor-pointer ml-auto">
                          <input type="checkbox" value="" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div> */}
                        </>
                      )}

                      <div className="mt-6">
                        <ButtonV2 variant="2" className="w-full" disabled={isLoading} onClick={handleUploadFiles}>
                          <span>Continue</span>
                        </ButtonV2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </LayoutScreenMain>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {},
  };
};

export default ArtGenerator;
