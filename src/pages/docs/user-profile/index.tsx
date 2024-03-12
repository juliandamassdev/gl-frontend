import DocsLayout from "@/layouts/DocsLayout";
import Image from "next/image";

const Docs = () => {
  const navMenu = {
    name: "User Profile",
    menu: [
      {
        url: "/docs/user-profile",
        label: "Welcome",
      },
      {
        url: "/docs/user-profile/collected-collections-area",
        label: "Collected Collections Area",
      },
      {
        url: "/docs/user-profile/created-area",
        label: "Created Area",
      },
      {
        url: "/docs/user-profile/filter-tab",
        label: "Filter Tab",
      },
      {
        url: "/docs/user-profile/chain-tab",
        label: "Chain Tab",
      },
      {
        url: "/docs/user-profile/search-bar",
        label: "Search Bar",
      },
      {
        url: "/docs/user-profile/view-options",
        label: "View Options",
      },
      {
        url: "/docs/user-profile/edit-profile",
        label: "Edit Profile",
      },
      {
        url: "/docs/user-profile/price-sorting",
        label: "Price Sorting",
      },
    ],
  };

  return (
    <DocsLayout navMenu={navMenu}>
      <h2>User Profile</h2>
      <div className="space-y-12">
        <div className="space-y-5">
          <p>
            Welcome to the documentation page for the NFT No-Code Tool User Profile. This guide provides detailed
            information on how to use the various features and functionalities of the User Profile within the NFT
            No-Code tool. The User Profile serves as a centralized hub for managing your NFT collections and creations.
          </p>
        </div>
        <div className="space-y-5">
          <Image
            src="/images/docs/user-profile-welcome-1.png"
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
