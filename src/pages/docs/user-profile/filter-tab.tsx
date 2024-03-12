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
      <h2>Filter Tab</h2>
      <div className="space-y-12">
        <div className="space-y-5">
          <p>
            Use the filter tab to sort and filter your collection based on criteria such as rarity, date acquired, and
            custom tags. Makes it simpler to manage your collection and helps you quickly find and use your NFTs, so you
            can easily explore them.
          </p>
        </div>
        <div className="space-y-5">
          <Image
            src="/images/docs/user-profile-filter-tab-1.png"
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
