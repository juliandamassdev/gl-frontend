import InitialHero from "@/components/sections/initial-hero";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Icon } from "@iconify/react";
import Image from "next/image";

const Notifications = () => {
  return (
    <DashboardLayout>
      <InitialHero />

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Notifications</h2>
        <div className="flex items-center space-x-4">
          <div className="group active">
            <button className="px-4 py-2.5 bg-transparent group-[.active]:bg-c-1 border border-c-5 group-[.active]:border-c-1 text-c-1 group-[.active]:text-white rounded-full">
              All
            </button>
          </div>
          <div className="group">
            <button className="px-4 py-2.5 bg-transparent group-[.active]:bg-c-1 border border-c-5 group-[.active]:border-c-1 text-c-1 group-[.active]:text-white rounded-full">
              Undread
            </button>
          </div>
        </div>
        <p className="text-xs text-c-2">Mark all as read</p>
      </div>

      <div className="space-y-2">
        {new Array(4).fill("").map((notification: any, index: number) => (
          <div
            key={index}
            className="group relative flex items-center w-full px-4 py-3.5 bg-white hover:bg-c-7 rounded-2xl transition-all cursor-pointer"
          >
            {index === 0 && <div className="absolute top-3 left-3 w-3 h-3 bg-c-6 rounded-full"></div>}
            <Image
              src="/images/nft-1.jpg"
              width="512"
              height="512"
              alt="Notifications"
              className="flex-shrink-0 w-11 h-11 mr-3 rounded-lg object-cover"
            />
            <div className="flex-1 flex items-start mr-10">
              <div className="flex items-end justify-between w-full">
                <div>
                  <p className="mb-1 text-sm font-semibold">TokenName #123</p>
                  <div className="flex items-center space-x-1.5 text-xs group-hover:font-semibold transition-all">
                    <p>Listed by</p>
                    <Image
                      src="/images/nft-1.jpg"
                      width="24"
                      height="24"
                      alt="Notifications"
                      className="flex-shrink-0 w-4 h-4 rounded-full object-cover"
                    />
                    <p>0xB5...0b33 for 1.65 ETH</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-xs">
                  <p>23 June 2023, 12:00 PM</p>
                  <Icon icon="heroicons-solid:external-link" />
                </div>
              </div>
            </div>
            <button className="flex-shrink-0">
              <Icon icon="heroicons-solid:dots-vertical" className="text-2xl" />
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
