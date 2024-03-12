import ButtonV2 from "@/components/buttons/button-v2";
import InputField from "@/components/forms/input-field";
import InputFieldV2 from "@/components/forms/input-field-v2";
import SelectField from "@/components/forms/select-field";
import { Menu, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { postServerImagesUpload } from "@/services/Common";
import { toast } from "react-toastify";
import { postCoins } from "@/services/Coin";

interface ICreateCoinPageForm {
  onCoinPageDone?: (coin: any) => void;
}

const CreateCoinPageForm = ({ onCoinPageDone }: ICreateCoinPageForm) => {
  const [uploadedTokenCoverImage, setUploadedTokenCoverImage] = useState<string>("");
  const [uploadedTokenImage, setUploadedTokenImage] = useState<string>("");

  /**
   * Edit page form
   */
  const editPageFormSchema = Yup.object().shape({
    tokenCoverImage: Yup.string().required("Token cover image is required"),
    tokenImage: Yup.string().required("Token image is required"),
    description: Yup.string().required("Description is required"),
    websiteUrl: Yup.string().required("Website link is required"),
    twitterUrl: Yup.string().required("Twitter link is required"),
    facebookUrl: Yup.string().required("Facebook link is required"),
  });

  const {
    register: registerEditPageForm,
    handleSubmit: handleSubmitEditPageForm,
    formState: formStateEditPageForm,
    setValue: setValueEditPageForm,
    getValues: getValuesEditPageForm,
  } = useForm({ resolver: yupResolver(editPageFormSchema) });

  const handleUploadFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const payload = new FormData();
      payload.append("file", event.target.files[0]);
      // setIsLoading(true);
      try {
        const resPostTokenSetsUploadFiles = await postServerImagesUpload(payload);
        const imageUrl = resPostTokenSetsUploadFiles.data.data.imageURL;
        return imageUrl;
      } catch (error) {
        // setIsLoading(false);
        console.log(error);
        toast.error("Failed upload");
      }
    }
  };

  const handleCreateContract = async (data: any) => {
    const payload = {
      coverImageURL: data.tokenCoverImage,
      description: data.description,
      imageURL: data.tokenImage,
      links: {
        facebook: data.facebookUrl,
        twitter: data.twitterUrl,
        website: data.websiteUrl,
      },
    };

    try {
      const responsePostCoins = await postCoins(payload);
      if (onCoinPageDone) {
        onCoinPageDone(responsePostCoins.data.data);
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Failed edit page");
    }
  };

  return (
    <>
      <header className="fixed left-0 top-0 z-10 flex items-center w-full h-25 bg-dark-header backdrop-blur-2xl text-white">
        <div className="w-full max-w-[1464px] mx-auto">
          <div className="flex items-center justify-between w-full px-4 lg:px-6">
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-1 rounded-2xl">
              <div className="flex items-center space-x-5">
                <Link href="/create-coin/page">
                  <ButtonV2 variant="1" className="!rounded-full">
                    <Icon icon="heroicons-solid:puzzle" />
                    <span>Edit Page</span>
                  </ButtonV2>
                </Link>
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
              <ButtonV2 variant="1" onClick={handleSubmitEditPageForm(handleCreateContract)}>
                <Icon icon="heroicons-solid:arrow-narrow-right" className="text-lg" />
                <span>Create Contract</span>
              </ButtonV2>
            </div>
          </div>
        </div>
      </header>

      <div className="pt-25 overflow-hidden">
        <div className="py-15">
          <div className="container">
            <div className="flex items-center justify-center w-full h-80 rounded-2xl overflow-hidden">
              {uploadedTokenCoverImage ? (
                <Image
                  src={uploadedTokenCoverImage}
                  width="1200"
                  height="1200"
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full border border-white border-dashed rounded-2xl">
                  <label className="flex items-center justify-center w-full h-full cursor-pointer">
                    <div className="text-center">
                      <Icon icon="heroicons-solid:cloud-upload" className="inline-flex mb-6 text-[104px] text-c-5" />
                      <p className="mb-2 text-xl font-medium text-c-5">Upload token cover image</p>
                      <p className="text-c-5">JPG, PNG, GIF files are allowed.</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      onChange={async event => {
                        const responseUploadedTokenCoverImage = await handleUploadFiles(event);
                        if (responseUploadedTokenCoverImage) {
                          setValueEditPageForm("tokenCoverImage", responseUploadedTokenCoverImage);
                          setUploadedTokenCoverImage(responseUploadedTokenCoverImage);
                        }
                      }}
                    />
                  </label>
                </div>
              )}
            </div>
            <div className="flex items-start justify-between px-6 -mt-25">
              <div className="space-y-8">
                <div className="flex items-end space-x-8">
                  <div className="w-[270px]">
                    <div className="square rounded-lg overflow-hidden mb-1">
                      <div className="square-content">
                        <div className="flex items-center justify-center w-full h-full rounded-2xl overflow-hidden">
                          {uploadedTokenImage ? (
                            <Image
                              src={uploadedTokenImage}
                              width="1200"
                              height="1200"
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-c-1 border border-white border-dashed rounded-2xl">
                              <label className="flex items-center justify-center w-full h-full cursor-pointer">
                                <div className="text-center">
                                  <Icon
                                    icon="heroicons-solid:cloud-upload"
                                    className="inline-flex mb-6 text-[52px] text-c-5"
                                  />
                                  <p className="mb-1 font-medium text-c-5">Upload token image</p>
                                  <p className="text-sm text-c-5">JPG, PNG, GIF files are allowed.</p>
                                </div>
                                <input
                                  type="file"
                                  className="hidden"
                                  onChange={async event => {
                                    const responseUploadedTokenImage = await handleUploadFiles(event);
                                    if (responseUploadedTokenImage) {
                                      setValueEditPageForm("tokenImage", responseUploadedTokenImage);
                                      setUploadedTokenImage(responseUploadedTokenImage);
                                    }
                                  }}
                                />
                              </label>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pb-6">
                    <p className="mb-6 text-[40px] text-white font-bold">
                      Token Name <span className="text-xl text-c-5">SYM</span>
                    </p>
                    {/* <div className="flex items-center space-x-2">
                    <p className="text-sm text-c-3">Owned by</p>
                    <div className="flex items-center p-2 space-x-2 bg-c-1 rounded-full shadow-xl text-white">
                      <Image
                        src="/images/placeholder.jpg"
                        alt="Profile"
                        width="20"
                        height="20"
                        className="w-5 h-5 rounded-full"
                      />
                      <p className="text-sm text-c-5">GenerateLabs</p>
                      <Icon icon="heroicons-solid:document-duplicate" className="text-c-5" />
                    </div>
                  </div> */}
                  </div>
                </div>
                <div>
                  <InputField {...registerEditPageForm("description")} placeholder="Description" theme="dark" />
                </div>
              </div>
              <div className="w-full max-w-sm px-6 py-8 bg-neutral-900 rounded-3xl">
                <p className="mb-8 text-2xl font-bold text-white">Add social media links</p>
                <div className="space-y-4">
                  <InputField
                    {...registerEditPageForm("websiteUrl")}
                    label="Website"
                    placeholder="https://"
                    theme="dark"
                  />
                  <InputField
                    {...registerEditPageForm("twitterUrl")}
                    label="Twitter"
                    placeholder="https://"
                    theme="dark"
                  />
                  <InputField
                    {...registerEditPageForm("facebookUrl")}
                    label="Facebook"
                    placeholder="https://"
                    theme="dark"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCoinPageForm;
