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
      <h2>Upload your Item</h2>
      <div className="space-y-12">
        <div className="space-y-5">
          <p>
            This is the initial step when creating a new NFT drop. Users can upload a single image representing their
            drop on this page. Additional images can be added on the next page.
          </p>
          <Image
            src="/images/docs/drops-upload-your-item-1.png"
            width="700"
            height="700"
            alt="Docs"
            className="w-[676px] rounded"
          />
        </div>
        <div className="space-y-5">
          <Image
            src="/images/docs/drops-upload-your-item-2.png"
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
