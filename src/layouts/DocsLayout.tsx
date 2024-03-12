import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const DocsMenu = {
  name: "Navigate",
  menu: [
    {
      url: "/docs/welcome",
      label: "Welcome",
    },
    {
      url: "/docs/user-profile",
      label: "User Profile",
    },
    {
      url: "/docs/home-dashboard",
      label: "Home Dashboard",
    },
    {
      url: "/docs/drops",
      label: "Drops",
    },
    {
      url: "/docs/art-generator",
      label: "Art Generator",
    },
    {
      url: "/docs/marketplace",
      label: "Marketplace",
    },
    {
      url: "/docs/create-account",
      label: "Create an account",
    },
  ],
};
interface IDocsLayout {
  children: React.ReactNode;
  navMenu?: any;
}

const DocsLayout = ({ children, navMenu }: IDocsLayout) => {
  const router = useRouter();

  return (
    <div className="docs">
      <header className="absolute left-0 top-0 w-full bg-[#F1F2F6] border-b border-c-5 z-50">
        <div className="container-gl px-4">
          <div className="flex items-center justify-between w-full h-25">
            <div className="flex items-center space-x-8">
              <Link href="/">
                <Image
                  src="/images/generate-labs-logo.png"
                  width="256"
                  height="256"
                  alt="Logo"
                  className="w-32 h-auto"
                />
              </Link>
            </div>
            <div className="relative">
              <Icon
                icon="heroicons-outline:search"
                className="absolute top-1/2 left-6 transform -translate-y-1/2 text-2xl text-c-5"
              />
              <input
                type="text"
                placeholder="Search collections or creators"
                className="w-[460px] px-6 py-3 pl-14 bg-white border border-white rounded-full outline-none"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex min-h-screen pt-25 text-[#616161]">
        <div className="grid grid-cols-12 w-full">
          <div className="col-span-3 relative bg-[#F1F2F6]">
            <div className="sticky top-0 w-full h-auto px-10 py-14">
              <div className="px-6 space-y-10">
                <button className="flex items-center space-x-2" onClick={() => router.back()}>
                  <Icon icon="heroicons-solid:arrow-left" className="text-lg" />
                  <p>Back</p>
                </button>
                {navMenu && (
                  <div>
                    <h3 className="mb-4 text-xl font-bold">{navMenu.name}</h3>
                    <div className="flex flex-col space-y-1">
                      {navMenu.menu.map((menu: any, index: number) => (
                        <>
                          <Link
                            key={index}
                            href={menu.url}
                            className={`${
                              router.pathname.split("/")[3] === menu.url.split("/")[3]
                                ? "text-[#56B8FF]"
                                : "text-[#616161]"
                            } transition-all`}
                          >
                            {menu.label}
                          </Link>
                          {menu.subMenu && menu.subMenu.length > 0 && (
                            <div className="flex flex-col border-l-4 border-[#E0E0E0] pl-2">
                              {menu.subMenu.map((subMenu: any, indexSubMenu: number) => (
                                <Link key={indexSubMenu} href={subMenu.url} className="text-[#616161] text-xs">
                                  {subMenu.label}
                                </Link>
                              ))}
                            </div>
                          )}
                          {menu.anchorMenu && menu.anchorMenu.length > 0 && (
                            <div className="flex flex-col border-l-4 border-[#E0E0E0] pl-2">
                              {menu.anchorMenu.map((anchorMenu: any, indexAnchorMenu: number) => (
                                <Link
                                  key={indexAnchorMenu}
                                  href={`#${anchorMenu.anchor}`}
                                  className="text-[#616161] text-xs"
                                >
                                  {anchorMenu.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <h3 className="mb-4 text-xl font-bold">{DocsMenu.name}</h3>
                  <div className="flex flex-col space-y-1">
                    {DocsMenu.menu.map((menu, index: number) => (
                      <Link
                        key={index}
                        href={menu.url}
                        className={`${
                          router.pathname.split("/")[2] === menu.url.split("/")[2] ? "text-[#56B8FF]" : "text-[#616161]"
                        } transition-all`}
                      >
                        {menu.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-9">
            <div className="px-14 py-20">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsLayout;
