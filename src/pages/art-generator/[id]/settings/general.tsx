import ButtonV2 from "@/components/buttons/button-v2";
import InputField from "@/components/forms/input-field";
import NavArtSettings from "@/components/nav/nav-art-settings";
import LayoutDashboard from "@/layouts/LayoutDashboard";
import { Icon } from "@iconify/react";
import Image from "next/image";

const ArtSettingsGeneral = () => {
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
              <div className="mb-12">
                <h2 className="text-[32px] font-bold">General settings</h2>
                <p className="text-c-3">Manage your collection</p>
              </div>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                  <div className="mb-12">
                    <p className="mb-2 text-sm font-bold">Profile image</p>
                    <div className="w-full">
                      <input id="collection-file" type="file" className="hidden" />
                      <label
                        htmlFor="collection-file"
                        className="w-full flex items-center p-4 space-x-10 border border-gl-5 rounded-2xl cursor-pointer"
                      >
                        <div className="flex items-center justify-center w-25 h-25 bg-gl-3">
                          <Icon icon="heroicons-outline:cloud-upload" className="text-5xl" />
                        </div>
                        <p className="text-xl font-bold">Select media to upload</p>
                      </label>
                    </div>
                  </div>
                  <div className="mb-14 space-y-6">
                    <InputField label="Collection Name" placeholder="Generate Labs" />
                    <InputField label="Supply" placeholder="10000" />
                    <InputField label="Symbol" placeholder="SYM" />
                    <InputField label="Network" placeholder="Ethereum" />
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
                  <div className="border border-c-5 rounded-lg">
                    <div className="px-3">
                      <Image src="/images/nft-1.jpg" width="500" height="500" alt="NFT" />
                    </div>
                    <div className="px-3 pt-4 pb-6">
                      <p className="font-bold">
                        Generate Labs <span className="text-c-5">(SYM)</span>
                      </p>
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

export default ArtSettingsGeneral;
