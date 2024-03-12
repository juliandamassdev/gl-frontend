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
      <h2>View Options</h2>
      <div className="space-y-12">
        <div className="space-y-5">
          <Image
            src="/images/docs/user-profile-view-options-1.png"
            width="700"
            height="700"
            alt="Docs"
            className="w-[676px] rounded"
          />
        </div>
        <div className="space-y-5">
          <h3>List View</h3>
          <p>
            Choose the list view to display your NFTs in a vertical list format, providing a quick overview of NFT
            details or making it straightforward to grasp the key information about your digital assets at a glance.
          </p>
          <Image
            src="/images/docs/user-profile-view-options-2.png"
            width="700"
            height="700"
            alt="Docs"
            className="w-[182px] rounded"
          />
        </div>
        <div className="space-y-5">
          <h3>Grid View</h3>
          <p>
            Opt for the grid view to display NFTs in a visually appealing grid layout, complete with associated images.
          </p>
          <Image
            src="/images/docs/user-profile-view-options-3.png"
            width="700"
            height="700"
            alt="Docs"
            className="w-[182px] rounded"
          />
        </div>
      </div>
    </DocsLayout>
  );
};

export default Docs;
