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
      <h2>Home Dashboard</h2>
      <div className="space-y-12">
        <div className="space-y-5">
          <p>
            Welcome to the documentation for the NFT No-Code Tool Dashboard. This guide will help you navigate the
            various features and functionalities available on the dashboard page, where users can create NFTs, smart
            contracts, and more with no coding required. The dashboard is designed to provide a seamless experience for
            users, allowing them to easily access different tools and manage their projects. Here are the categories and
            features of the dashboard:
          </p>
        </div>
        <div className="space-y-5">
          <Image
            src="/images/docs/home-dashboard-welcome-1.png"
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
