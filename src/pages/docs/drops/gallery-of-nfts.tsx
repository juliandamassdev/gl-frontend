import DocsLayout from "@/layouts/DocsLayout";
import Image from "next/image";

const Docs = () => {
  const navMenu = {
    name: "Drops",
    menu: [
      {
        url: "/docs/drops",
        label: "Welcome",
      },
      {
        url: "/docs/drops/upload-your-item",
        label: "Drop Main Page",
        subMenu: [
          {
            url: "/docs/drops/upload-your-item",
            label: "Upload Your Item",
          },
          {
            url: "/docs/drops/header",
            label: "Header",
          },
          {
            url: "/docs/drops/main-image",
            label: "Main Image",
          },
          {
            url: "/docs/drops/add-collectible-sign",
            label: "Add Collectible Sign",
          },
          {
            url: "/docs/drops/gallery-of-nfts",
            label: "Gallery of NFTs",
          },
          {
            url: "/docs/drops/configure-an-item",
            label: "Configure an Item",
          },
          {
            url: "/docs/drops/back-icon",
            label: "Back Icon",
          },
        ],
      },
      {
        url: "/docs/drops/nft-image",
        label: "Configure Item Page",
        subMenu: [
          {
            url: "/docs/drops/nft-image",
            label: "NFT Image",
          },
          {
            url: "/docs/drops/replace-media",
            label: "Replace Media",
          },
          {
            url: "/docs/drops/enter-token-name",
            label: "Enter Token Name",
          },
          {
            url: "/docs/drops/enter-price",
            label: "Enter Price",
          },
          {
            url: "/docs/drops/supply",
            label: "Supply",
          },
          {
            url: "/docs/drops/add-description",
            label: "Add Description",
          },
          {
            url: "/docs/drops/add-properties",
            label: "Add Properties",
          },
          {
            url: "/docs/drops/add-locked-content",
            label: "Add Locked Content",
          },
          {
            url: "/docs/drops/delete-collectible-button",
            label: "Delete Collectible Button",
          },
          {
            url: "/docs/drops/x-button",
            label: "X Button",
          },
        ],
      },
      {
        url: "/docs/drops/conclusion",
        label: "Conclusion",
      },
    ],
  };

  return (
    <DocsLayout navMenu={navMenu}>
      <h2>Gallery of NFTs</h2>
      <div className="space-y-12">
        <div className="space-y-5">
          <p>
            A gallery displays all the other NFTs in the user&apos;s Drops collection. Users can view and manage the
            NFTs they&apos;ve uploaded, making it easy to navigate through their collections.
          </p>
          <Image
            src="/images/docs/drops-gallery-of-nfts-1.png"
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