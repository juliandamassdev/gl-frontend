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
      <h2>Collected Collections Area</h2>
      <div className="space-y-12">
        <div className="space-y-5">
          <h3>Collected Drop NFTs</h3>
          <p>Discover NFTs obtained from drops or direct purchases. View NFT details and associated metadata here.</p>
        </div>
        <div className="space-y-5">
          <h3>Collected NFTs from Generative Collections</h3>
          <p>
            Explore NFTs collected from generative collections, each with various traits and attributes. Dive into this
            exciting realm and see how generative collections open up endless creative possibilities through NFTs,
            proving that technology can unlock limitless creativity.
          </p>
        </div>
        <div className="space-y-5">
          <Image
            src="/images/docs/user-profile-collected-collections-area-1.png"
            width="700"
            height="700"
            alt="Docs"
            className="w-[676px] rounded"
          />
        </div>
        <div className="space-y-5">
          <Image
            src="/images/docs/user-profile-collected-collections-area-2.png"
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
