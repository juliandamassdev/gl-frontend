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
      <h2>Edit Profile</h2>
      <div className="space-y-12">
        <div className="space-y-5">
          <p>
            Update your public user details by clicking the &quot;Edit&quot; button on your NFT page. You can modify
            your Username and Email Address here. Changing your email address redirects you to the Settings web page.
          </p>
          <p>
            Customize your profile by adding a Cover Photo and Profile Photo, making your NFT profile uniquely yours.
          </p>
        </div>
        <div className="space-y-5">
          <Image
            src="/images/docs/user-profile-edit-profile-1.png"
            width="700"
            height="700"
            alt="Docs"
            className="w-[676px] rounded"
          />
        </div>
        <div className="space-y-5">
          <Image
            src="/images/docs/user-profile-edit-profile-2.png"
            width="700"
            height="700"
            alt="Docs"
            className="w-[432px] rounded"
          />
          <p className="text-sm">Profile Information</p>
        </div>
        <div className="space-y-5">
          <Image
            src="/images/docs/user-profile-edit-profile-3.png"
            width="700"
            height="700"
            alt="Docs"
            className="w-[432px] rounded"
          />
          <p className="text-sm">Profile Verification</p>
        </div>
        <div className="space-y-5">
          <Image
            src="/images/docs/user-profile-edit-profile-4.png"
            width="700"
            height="700"
            alt="Docs"
            className="w-[432px] rounded"
          />
          <p className="text-sm">Profile Verification</p>
        </div>
      </div>
    </DocsLayout>
  );
};

export default Docs;
