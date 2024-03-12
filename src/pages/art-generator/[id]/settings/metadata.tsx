import ButtonV2 from "@/components/buttons/button-v2";
import InputField from "@/components/forms/input-field";
import NavArtSettings from "@/components/nav/nav-art-settings";
import LayoutDashboard from "@/layouts/LayoutDashboard";
import { Icon } from "@iconify/react";
import Image from "next/image";

const ArtSettingsMetadata = () => {
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
                <h2 className="text-[32px] font-bold">Metadata</h2>
                <p className="text-c-3">Manage how your metadata is formatted</p>
              </div>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                  <div className="mb-20 space-y-6">
                    <InputField
                      label="Format"
                      placeholder="Ethereum"
                      info="The network format for exported metadata."
                    />
                    <InputField
                      label="Token Name"
                      placeholder="{{collection}}#{{id}}"
                      info="The naming pattern used to generate a name for each Token."
                    />
                    <InputField
                      label="Token Description"
                      placeholder="Description"
                      info="A human readable description of your Collection. Markdown is supported."
                    />
                  </div>
                  <div className="mb-14">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-bold">Advance Settings</h2>
                      <label className="relative inline-flex items-center cursor-pointer ml-auto">
                        <input type="checkbox" value="" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="space-y-6">
                      <InputField
                        label="Token External URL "
                        placeholder="https://example.com/token/{{id}}"
                        info="Optional field used by OpenSea to display a URL to your website where the user can view the token."
                      />
                      <InputField
                        label="Custom IPFS Gateway"
                        placeholder="ipfs://"
                        info="The IPFS prefix used for the image assets."
                      />
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
                  <div className="mb-6">
                    <h2 className="font-medium">Preview</h2>
                  </div>
                  <div className="border border-c-5 rounded-lg p-6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutDashboard>
  );
};

export default ArtSettingsMetadata;
