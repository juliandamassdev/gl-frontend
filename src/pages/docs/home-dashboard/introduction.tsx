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
      <h2>Introduction</h2>
      <div className="space-y-12">
        <div className="space-y-5">
          <p>
            The Portfolio Feature in the No Code NFT Tool provides users with a convenient way to manage and access
            their NFT projects. This feature is designed to allow quick access to your projects, eliminating the need to
            navigate to the &quot;My Projects&quot; page each time. Users can also create new projects directly from the
            Portfolio. This guide will walk you through the key elements and functions of the Portfolio Feature.
          </p>
        </div>
        <div className="space-y-5">
          <Image
            src="/images/docs/home-dashboard-introduction-1.png"
            width="700"
            height="700"
            alt="Docs"
            className="w-[676px] rounded"
          />
        </div>
        <div className="space-y-5">
          <h3>Accessing My Portfolio</h3>
          <p>
            To access your Portfolio, navigate to the Main Dashboard of the No Code NFT Tool. You will find the &quot;My
            Portfolio&quot; section, which is designed for managing your collections, projects, and drops.
          </p>
          <Image
            src="/images/docs/home-dashboard-introduction-2.png"
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
