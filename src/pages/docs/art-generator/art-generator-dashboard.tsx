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
      <h2>Art Generator Dashboard</h2>
      <div className="space-y-12">
        <div className="space-y-5">
          <p>The Art Generator Dashboard features two critical areas:</p>
        </div>
        <div className="space-y-5">
          <h3>The Art Dashboard</h3>
          <p>
            This section is further divided into two subsections, assets and traits. The assets section displays all the
            files from your uploaded folders. You can manage these files and customize their attributes in this area.
          </p>
          <Image
            src="/images/docs/art-generator-art-generator-dashboard-1.png"
            width="700"
            height="700"
            alt="Docs"
            className="w-[676px] rounded"
          />
        </div>
        <div className="space-y-5">
          <h3>Assets</h3>
          <p>
            Here in the “Assets” button, users will see here all the traits that the user uploaded before they are going
            on this page. The user can upload another folder by clicking the “Plus” button.
          </p>
          <Image
            src="/images/docs/art-generator-art-generator-dashboard-2.png"
            width="700"
            height="700"
            alt="Docs"
            className="w-[676px] rounded"
          />
        </div>
        <div className="space-y-5">
          <h3>Traits</h3>
          <p>
            Here in “Traits” button, user will see here what the assets included in the image that show in the screen.
            Users can delete the asset on the traits button, and they can add it again by going back to the asset button
            and click some of the traits that they want to include.
          </p>
          <Image
            src="/images/docs/art-generator-art-generator-dashboard-3.png"
            width="700"
            height="700"
            alt="Docs"
            className="w-[676px] rounded"
          />
        </div>
        <div className="space-y-5">
          <h3>Notes Area</h3>
          <p>
            To open a notes UI, user will click the notes icon on the button of the app, it will open an input tab that
            the user can add a simple description of their generated art. Once the user has done configuring the
            generated art, they save it by clicking the “Save” button, and it will store at the bottom.
          </p>
          <Image
            src="/images/docs/art-generator-art-generator-dashboard-4.png"
            width="700"
            height="700"
            alt="Docs"
            className="w-[676px] rounded"
          />
        </div>
        <div className="space-y-5">
          <h3>Saved Designs Footer</h3>
          <p>
            When user wants to see their saved generated art, users can click the expand button to see all the users
            saved generated arts.
          </p>
          <Image
            src="/images/docs/art-generator-art-generator-dashboard-5.png"
            width="700"
            height="700"
            alt="Docs"
            className="w-[676px] rounded"
          />
        </div>
        <div className="space-y-5">
          <h3>Generate Dashboard</h3>
          <p>
            In this section, you can define and customize traits for your NFT collection. You can also specify how
            traits impact the rarity of the generated NFTs.
          </p>
          <Image
            src="/images/docs/art-generator-art-generator-dashboard-6.png"
            width="700"
            height="700"
            alt="Docs"
            className="w-[676px] rounded"
          />
        </div>
        <div className="space-y-5">
          <h3>Generate</h3>
          <p>
            This will be the UI when the users clicked the “Generate” button at the header part of the app, in this UI,
            users will see all the art that the platform generated. The users can regenerate the result of the art by
            clicking the “Regenerate Preview” and the art will be regenerated.
          </p>
          <Image
            src="/images/docs/art-generator-art-generator-dashboard-7.png"
            width="700"
            height="700"
            alt="Docs"
            className="w-[676px] rounded"
          />
        </div>
        <div className="space-y-5">
          <h3>Collection Set</h3>
          <p>
            When the users want to add another collection but in the same collection; the users can click the drop down
            button part the app which is this one Users can create a new set of collection in their created collection.
          </p>
          <Image
            src="/images/docs/art-generator-art-generator-dashboard-8.png"
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
