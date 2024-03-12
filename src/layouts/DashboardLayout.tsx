import Header from "@/components/headers/header";
import ModalCreateProject from "@/components/modals/modal-create-project";
import { useGetUsersMyProfile } from "@/queries/account-queries";
import { Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { useDisconnect } from "wagmi";

const sidebarMenu = [
  {
    url: "/",
    label: "Dashboard",
    icon: <Icon icon="heroicons-solid:beaker" className="shrink-0 text-2xl" />,
  },
  // {
  //   url: "/notifications",
  //   label: "Notifications",
  //   icon: <Icon icon="heroicons-solid:bell" className="shrink-0 text-2xl" />,
  // },
];

const DashboardLayout = ({ children }: any) => {
  const { data: sessionData } = useSession();

  const { disconnect } = useDisconnect();

  const router = useRouter();

  const [sidebarExpand, setSidebarExpand] = useState<boolean>(true);
  const [showModalCreateProject, setShowModalCreateProject] = useState<boolean>(false);

  const { data: dataProfile } = useGetUsersMyProfile({ token: sessionData?.user?.token || "" });

  const handleLogout = () => {
    disconnect();
    signOut();
  };

  return (
    <>
      <div id="dashboard-layout" className="flex">
        <aside className={`relative transition-all`} style={{ width: `${sidebarExpand ? "326px" : "108px"}` }}>
          <div className="sticky top-0 flex flex-col w-full h-screen overflow-x-hidden overflow-y-auto bg-c-1">
            <Transition
              appear
              show={sidebarExpand}
              as={Fragment}
              enter="ease-out"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="flex items-center px-12 h-25">
                <Image
                  src="/images/generate-labs-white-logo.png"
                  width="150"
                  height="150"
                  alt="Logo"
                  className="w-auto h-[45px]"
                />
              </div>
            </Transition>
            <Transition
              appear
              show={!sidebarExpand}
              as={Fragment}
              enter="ease-out"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="flex items-center px-6 h-25">
                <Image
                  src="/images/generate-labs-mini-white-logo.png"
                  width="150"
                  height="150"
                  alt="Logo"
                  className="w-auto h-[30px]"
                />
              </div>
            </Transition>
            <div className={`${sidebarExpand ? "px-8" : "px-6"} py-10 space-y-1`}>
              {sidebarMenu.map((menu, index: number) => (
                <div
                  key={index}
                  className={`group ${sidebarExpand ? "" : "collapsed"} ${
                    router.pathname === menu.url ? "active" : ""
                  }`}
                >
                  <Link
                    href={menu.url}
                    className="flex items-center group-[.collapsed]:justify-center p-4 space-x-3 rounded-2xl text-white hover:bg-c-10 group-[.active]:bg-c-10 transition-all"
                  >
                    {menu.icon}
                    <span className="group-[.collapsed]:hidden">{menu.label}</span>
                  </Link>
                </div>
              ))}
            </div>
            <div
              className={`group ${sidebarExpand ? "" : "collapsed"} mt-auto ${sidebarExpand ? "px-8" : "px-6"} py-8`}
            >
              <button
                className="flex items-center group-[.collapsed]:justify-center p-4 space-x-3 rounded-2xl text-white hover:bg-c-10 group-[.active]:bg-c-10 transition-all"
                onClick={handleLogout}
              >
                <Icon icon="heroicons-solid:logout" className="shrink-0 text-2xl" />
                <span className="group-[.collapsed]:hidden">Logout</span>
              </button>
            </div>
          </div>
        </aside>
        <div className="flex-1">
          <Header
            profile={dataProfile}
            leftElement={
              <button
                className="flex items-center justify-center w-12 h-12 rounded-full bg-black text-white"
                onClick={() => setSidebarExpand(!sidebarExpand)}
              >
                <Icon
                  icon="heroicons-outline:chevron-right"
                  className={`text-2xl ${sidebarExpand ? "rotate-180" : "rotate-0"}`}
                />
              </button>
            }
            className="px-6"
            onClickCreateProject={() => setShowModalCreateProject(true)}
          />
          <div className="px-10 py-9">{children}</div>
        </div>
      </div>

      {/* Modal Create Project */}
      <ModalCreateProject isOpen={showModalCreateProject} onClose={close => setShowModalCreateProject(close)} />
    </>
  );
};

export default DashboardLayout;
