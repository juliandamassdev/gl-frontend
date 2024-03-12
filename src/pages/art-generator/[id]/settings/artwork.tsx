import ButtonV2 from "@/components/buttons/button-v2";
import InputField from "@/components/forms/input-field";
import NavArtSettings from "@/components/nav/nav-art-settings";
import LayoutDashboard from "@/layouts/LayoutDashboard";
import { Icon } from "@iconify/react";
import Image from "next/image";

const ArtSettingsArtwork = () => {
  return (
    <LayoutDashboard>
      <div className="w-full h-auto max-w-w-1 px-4 lg:px-6 mx-auto">
        <div className="grid grid-cols-12 w-full h-full">
          <div className="col-span-3">
            <div className="w-full h-full pr-6 py-13 border-r border-c-5">
              <NavArtSettings />
            </div>
          </div>
          <div className="col-span-9">
            <div className="w-full h-full pl-12 py-13">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                  <div className="mb-12">
                    <div className="flex items-center justify-between">
                      <h2 className="text-[32px] font-bold">Artwork</h2>
                      <label className="relative inline-flex items-center cursor-pointer ml-auto">
                        <input type="checkbox" value="" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <p className="text-c-3">Manage how your artwork exported and animates</p>
                  </div>
                  <div className="mb-14 space-y-6">
                    <InputField
                      label="Dimensions (px)"
                      placeholder="1200"
                      info="The size of the token assets. Max 2400px and 2000px for GIFs."
                    />
                    <InputField label="Format" placeholder="PNG" info="Output format for your Tokens" />
                    <InputField label="Animation format" placeholder="GIF" info="Output format for your Tokens" />
                    <InputField label="Animation Speed" placeholder="8" info="Specified in Frames per Second" />
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <p className="font-bold">Enable pixel art style</p>
                        <p className="text-xs text-c-3 font-light">
                          No Anti-Aliasing / Compression. Ensures pixels will always remain sharp.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer ml-auto">
                        <input type="checkbox" value="" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <ButtonV2 variant="base" size="base">
                      <span>Discard</span>
                    </ButtonV2>
                    <ButtonV2 variant="2" size="base">
                      <span>Save Changes</span>
                    </ButtonV2>
                  </div>
                </div>
                <div className="col-span-4 col-start-8">
                  <div className="pt-30">
                    <div className="border border-c-5 rounded-lg">
                      <div className="px-3">
                        <Image src="/images/nft-1.jpg" width="500" height="500" alt="NFT" />
                      </div>
                      {/* <div className="px-3 pt-4 pb-6">
                        <p className="font-bold">
                          Generate Labs <span className="text-c-5">(SYM)</span>
                        </p>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutDashboard>
  );
};

export default ArtSettingsArtwork;
