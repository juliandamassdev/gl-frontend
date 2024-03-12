import DocsLayout from "@/layouts/DocsLayout";
import Image from "next/image";

const DocsHeader = () => {
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
      <h2>Header</h2>
      <div className="space-y-12">
        <div className="space-y-5">
          <p>
            The header at the top of the dashboard is where you can access key features and functionalities. It includes
            the following elements:
          </p>
        </div>
        <div className="space-y-5">
          <h3>Generatelabs.app Logo Icon</h3>
          <ul className="list list-disc list-inside">
            <li>Clicking this icon toggles the sidebar, allowing you to open or close it.</li>
            <li>When clicked, it returns you to the main page of the website/app.</li>
          </ul>
          <Image
            src="/images/docs/home-dashboard-header-1.png"
            width="700"
            height="700"
            alt="Docs"
            className="w-[676px] rounded mb-18"
          />
        </div>
        <div className="space-y-5">
          <h3>Create Project Button</h3>
          <p>Clicking this button opens a dropdown modal, providing quick access to various features:</p>
          <ul className="list list-disc list-inside">
            <li>
              <span className="font-bold">Art Generator:</span> Create NFT art using the no-code tool.
            </li>
            <li>
              <span className="font-bold">Drops:</span> Manage your NFT drops.
            </li>
            <li>
              <span className="font-bold">Forms:</span> Create and manage forms related to your projects.
            </li>
            <li>
              <span className="font-bold">Coin Token:</span> Create and manage your no-code tokens.
            </li>
          </ul>
          <Image
            src="/images/docs/home-dashboard-header-2.png"
            width="700"
            height="700"
            alt="Docs"
            className="w-[676px] rounded mb-12"
          />
        </div>
        <div className="space-y-5">
          <h3>Search Bar</h3>
          <p>Use the search bar to search for your projects and other items within the app.</p>
          <Image
            src="/images/docs/home-dashboard-header-3.png"
            width="700"
            height="700"
            alt="Docs"
            className="w-[676px] rounded mb-18"
          />
        </div>
        <div className="space-y-5">
          <h3>Notifications Icon</h3>
          <ul className="list list-disc list-inside mb-8">
            <li>
              Clicking this icon opens a modal displaying notifications related to your activities, such as purchases,
              published NFTs, bids, and more.
            </li>
            <li>Clicking &quot;View All&quot; within the modal opens a full notifications page.</li>
          </ul>
          <Image
            src="/images/docs/home-dashboard-header-4.png"
            width="700"
            height="700"
            alt="Docs"
            className="w-[676px] rounded mb-8"
          />
          <Image
            src="/images/docs/home-dashboard-header-5.png"
            width="700"
            height="700"
            alt="Docs"
            className="w-[676px] rounded mb-8"
          />
          <Image
            src="/images/docs/home-dashboard-header-6.png"
            width="700"
            height="700"
            alt="Docs"
            className="w-[676px] rounded mb-18"
          />
        </div>
        <div className="space-y-5">
          <h3>Cart Icon</h3>
          <p>View items you&apos;ve purchased, such as NFTs, in the cart.</p>
          <Image
            src="/images/docs/home-dashboard-header-7.png"
            width="700"
            height="700"
            alt="Docs"
            className="w-[676px] rounded mb-8"
          />
          <Image
            src="/images/docs/home-dashboard-header-8.png"
            width="700"
            height="700"
            alt="Docs"
            className="w-[676px] rounded mb-8"
          />
          <Image
            src="/images/docs/home-dashboard-header-9.png"
            width="700"
            height="700"
            alt="Docs"
            className="w-[676px] rounded mb-18"
          />
        </div>
        <div className="space-y-5">
          <h3>User Profile Icon Button</h3>
          <p>Access a dropdown modal with the following icons/buttons:</p>
          <ul className="list list-disc list-inside">
            <li>
              <span className="font-bold">User Profile:</span> View and manage your user profile.
            </li>
            <li>
              <span className="font-bold">Wallet Balance:</span> Check your wallet balance, whether through Magiclink or
              MetaMask.
            </li>
            <li>
              <span className="font-bold">My Projects:</span> Organize your created items, including Drops, Art
              Collections, Forms, and Coin Token Collections.
            </li>
          </ul>
          <Image
            src="/images/docs/home-dashboard-header-10.png"
            width="700"
            height="700"
            alt="Docs"
            className="w-[676px] rounded mb-8"
          />
          <Image
            src="/images/docs/home-dashboard-header-11.png"
            width="700"
            height="700"
            alt="Docs"
            className="w-[676px] rounded mb-18"
          />
        </div>
      </div>
    </DocsLayout>
  );
};

export default DocsHeader;
