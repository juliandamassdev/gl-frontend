import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";

const settingsMenu = [
  {
    label: "General",
    icon: <Icon icon="heroicons-outline:star" className="text-xl" />,
    href: "/art-generator/settings/general",
  },
  {
    label: "Metadata",
    icon: <Icon icon="heroicons-outline:cube" className="text-xl" />,
    href: "/art-generator/settings/metadata",
  },
  {
    label: "Artwork",
    icon: <Icon icon="heroicons-outline:photograph" className="text-xl" />,
    href: "/art-generator/settings/artwork",
  },
  {
    label: "Commission",
    icon: <Icon icon="heroicons-outline:star" className="text-xl" />,
    href: "/art-generator/settings/commission",
  },
];

const NavArtSettings = () => {
  const router = useRouter();

  return (
    <>
      <h2 className="mb-9 text-[32px] font-bold">Settings</h2>
      <div className="flex flex-col space-y-2">
        {settingsMenu.map((menu, index: number) => (
          <Link
            key={index}
            href={menu.href}
            className={`flex items-center px-6 py-3 space-x-2 border border-transparent rounded-lg bg-transparent ${
              router.pathname === menu.href && "!bg-c-2 text-white"
            }`}
          >
            {menu.icon}
            <span>{menu.label}</span>
          </Link>
        ))}
      </div>
    </>
  );
};

export default NavArtSettings;
