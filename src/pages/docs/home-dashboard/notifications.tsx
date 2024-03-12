import DocsLayout from "@/layouts/DocsLayout";
import Image from "next/image";

const Docs = () => {
  const navMenu = {
    name: "Home Dashboard",
    menu: [
      {
        url: "/docs/home-dashboard",
        label: "Welcome",
      },
      {
        url: "/docs/home-dashboard/header",
        label: "Header",
      },
      {
        url: "/docs/home-dashboard/introduction",
        label: "Introduction",
      },
      {
        url: "/docs/home-dashboard/main-features",
        label: "Main Features",
      },
      {
        url: "/docs/home-dashboard/notifications",
        label: "Notifications",
      },
    ],
  };

  return (
    <DocsLayout navMenu={navMenu}>
      <h2>Notifications</h2>
      <div className="space-y-12">
        <div className="space-y-5">
          <p>
            Access notifications related to your projects, such as Drops and Art Collections, through this feature. You
            can view your notifications and perform actions like marking them as read or deleting them.
          </p>
        </div>
        <div className="space-y-5">
          <Image
            src="/images/docs/home-dashboard-notifications-1.png"
            width="700"
            height="700"
            alt="Docs"
            className="w-[676px] rounded"
          />
        </div>
      </div>
    </DocsLayout>
  );
};

export default Docs;
