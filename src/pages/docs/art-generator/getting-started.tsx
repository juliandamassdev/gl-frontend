import DocsLayout from "@/layouts/DocsLayout";
import Image from "next/image";

const Docs = () => {
  const navMenu = {
    name: "Art Generator",
    menu: [
      {
        url: "/docs/art-generator",
        label: "Introduction",
      },
      {
        url: "/docs/art-generator/getting-started",
        label: "Getting Started",
      },
      {
        url: "/docs/art-generator/uploading-artwork-and-metadata",
        label: "Uploading Artwork and Metadata",
        anchorMenu: [
          {
            anchor: "upload-your-files",
            label: "Upload Your Files",
          },
          {
            anchor: "upload-progress",
            label: "Upload Progress",
          },
          {
            anchor: "page-selection",
            label: "Page Selection",
          },
        ],
      },
      {
        url: "/docs/art-generator/art-generator-dashboard",
        label: "Art Generator Dashboard",
      },
      {
        url: "/docs/art-generator/generate-dashboard",
        label: "Generate Dashboard",
        anchorMenu: [
          {
            anchor: "editing traits and rarity",
            label: "Editing Traits and Rarity",
          },
          {
            anchor: "rules",
            label: "Rules",
          },
          {
            anchor: "rules modal",
            label: "Rules Modal",
          },
          {
            anchor: "adding custom image",
            label: "Adding Custom Image",
          },
          {
            anchor: "custom image modal",
            label: "Custom Image Modal",
          },
          {
            anchor: "custom edit page",
            label: "Custom Edit Page",
          },
          {
            anchor: "live rarity configuration",
            label: "Live Rarity Configuration",
          },
          {
            anchor: "hidden traits ",
            label: "Hidden Traits ",
          },
        ],
      },
      {
        url: "/docs/art-generator/edit-page",
        label: "Edit Page",
      },
      {
        url: "/docs/art-generator/contract",
        label: "Contract",
      },
      {
        url: "/docs/art-generator/settings",
        label: "Settings",
      },
    ],
  };

  return (
    <DocsLayout navMenu={navMenu}>
      <h2>Getting Started</h2>
      <div className="space-y-12">
        <div className="space-y-5">
          <p>To initiate your journey with the Art Generator, please follow these steps:</p>
        </div>
        <div className="space-y-5">
          <h3>Collection Information</h3>
          <p>
            Start by entering essential details for your NFT collection, including the collection name, symbol, and
            supply.
          </p>
          <Image
            src="/images/docs/art-generator-getting-started-1.png"
            width="700"
            height="700"
            alt="Docs"
            className="w-[676px] rounded"
          />
        </div>
        <div className="space-y-5">
          <h3> Blockchain Selection</h3>
          <p>Select the blockchain for your project. Presently, only Ethereum is available.</p>
          <Image
            src="/images/docs/art-generator-getting-started-2.png"
            width="700"
            height="700"
            alt="Docs"
            className="w-[676px] rounded"
          />
        </div>
        <div className="space-y-5">
          <h3>Project Stage Choice</h3>
          <p>You will be asked to determine the current stage of your project:</p>
          <ul>
            <li>
              <b>&quot;I need to generate the Art&quot;:</b> Opt for this if you need to create artwork and metadata.
            </li>
            <li>
              <b>&quot;Generate the Smart Contract&quot;:</b> Select this if your artwork and metadata files are already
              prepared.
            </li>
          </ul>
          <Image
            src="/images/docs/art-generator-getting-started-3.png"
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
