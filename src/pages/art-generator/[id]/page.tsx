import ButtonV2 from "@/components/buttons/button-v2";
import HeaderApp from "@/components/headers/header-app";
import LayoutDashboard from "@/layouts/LayoutDashboard";
import { Icon } from "@iconify/react";
import Image from "next/image";

const ArtGeneratorPage = () => {
  return (
    <LayoutDashboard>
      <div className="w-full">
        <div className="relative w-full h-96 bg-c-1 rounded-br-2xl rounded-bl-2xl">
          <div className="w-full max-w-w-1 h-full mx-auto">
            <div className="w-full h-full px-4 lg:px-6">
              <div className="w-full h-full flex flex-col justify-between">
                <div className="flex items-center justify-between pt-8">
                  <ButtonV2 size="base" variant="5-outline">
                    <span>Save & finish later</span>
                  </ButtonV2>
                  <ButtonV2 size="base" variant="5-outline">
                    <span>View Page</span>
                  </ButtonV2>
                </div>
                <div className="text-center">
                  <label htmlFor="cover-image" className="text-white font-medium cursor-pointer">
                    Drag & Drop or <span className="text-c-2">Choose File</span> to upload
                  </label>
                  <input type="file" name="cover-image" id="cover-image" className="hidden" />
                </div>
                <div className="flex items-center justify-end pb-4">
                  <div className="flex items-center px-4 py-3 space-x-6 bg-white/10 rounded-2xl">
                    <button>
                      <Icon icon="heroicons-outline:globe-alt" className="text-white text-3xl" />
                    </button>
                    <button>
                      <Icon icon="mdi:facebook" className="text-white text-3xl" />
                    </button>
                    <button>
                      <Icon icon="uil:twitter" className="text-white text-3xl" />
                    </button>
                    <button>
                      <Icon icon="ic:baseline-discord" className="text-white text-3xl" />
                    </button>
                    <button>
                      <Icon icon="mdi:youtube" className="text-white text-3xl" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-w-1 mx-auto">
          <div className="w-full px-4 lg:px-6">
            <div className="flex space-x-6">
              <div className="flex-shrink-0 w-40 h-40 bg-c-1 border-8 border-white rounded-full transform -translate-y-1/2 text-center">
                <label
                  htmlFor="profile-image"
                  className="flex items-center justify-center w-full h-full cursor-pointer"
                >
                  <span className="text-white text-xs">
                    Drag & Drop or
                    <br />
                    <span className="text-c-2">Choose File</span> to upload
                  </span>
                </label>
                <input type="file" name="profile-image" id="profile-image" className="hidden" />
              </div>
              <div className="flex-1 py-6 space-y-4">
                <div className="flex items-center space-x-2">
                  <h3 className="text-[32px] font-bold">Title</h3>
                  <p className="text-2xl text-c-3 font-bold">SYM</p>
                  <Icon icon="mdi:check-decagram" className="text-2xl text-c-9" />
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-c-3">Owned by</p>
                  <div className="flex items-center p-2 space-x-2 rounded-full shadow-xl">
                    <Image
                      src="/images/placeholder.jpg"
                      alt="Profile"
                      width="20"
                      height="20"
                      className="w-5 h-5 rounded-full"
                    />
                    <p>GenerateLabs</p>
                  </div>
                </div>
                <div className="max-w-xl">
                  <p>
                    Gorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac
                    aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
                    inceptos.
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0 py-6">
                <div className="w-80 p-6 border border-c-5 rounded-2xl">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-c-3 font-medium">Floor Price</p>
                      <p className="font-medium">0 ETH</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-c-3 font-medium">Volume</p>
                      <p className="font-medium">0 ETH</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-c-3 font-medium">Items</p>
                      <p className="font-medium">0</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-c-3 font-medium">Owners</p>
                      <p className="font-medium">0</p>
                    </div>
                  </div>
                  <hr className="my-6" />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-c-3 font-medium">Royalties</p>
                      <p className="font-medium">0 %</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-c-3 font-medium">Blockchain</p>
                      <p className="font-medium">Ethereum</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pb-10">
              <div className="flex items-center justify-center w-full px-6 py-20 border border-c-5 rounded-2xl">
                <div className="space-y-8">
                  <Image
                    src="/images/collection-empty.png"
                    width="250"
                    height="250"
                    alt="Empty"
                    className="w-56 h-auto"
                  />
                  <p className="text-2xl font-bold">Collection in progress</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutDashboard>
  );
};

export default ArtGeneratorPage;
