import ButtonV2 from "@/components/buttons/button-v2";
import InputField from "@/components/forms/input-field";
import NavArtSettings from "@/components/nav/nav-art-settings";
import LayoutDashboard from "@/layouts/LayoutDashboard";
import { Icon } from "@iconify/react";
import Image from "next/image";

const ArtSettingsCommission = () => {
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
                <h2 className="text-[32px] font-bold">Commission</h2>
                <p className="text-c-3">Manage contract related settings</p>
              </div>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                  <div className="mb-14 space-y-6">
                    <InputField label="Royalties %" placeholder="0" info="The % of the royalties for your contract." />
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutDashboard>
  );
};

export default ArtSettingsCommission;
