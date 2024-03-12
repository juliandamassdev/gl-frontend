import DocsLayout from "@/layouts/DocsLayout";
import Image from "next/image";

const Docs = () => {
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
      <h2>Main Features</h2>
      <div className="space-y-12">
        <div className="space-y-5">
          <h3>Portfolio Management</h3>
          <p>
            My Portfolio: You can access the default Portfolio, where all your projects are listed. Additionally, you
            can create up to 10 Portfolio Pages for free. To create a new Portfolio Page, simply click the
            &quot;Portfolio&quot; button or use the drop-down menu to access your Portfolio Menu.
          </p>
          <Image
            src="/images/docs/home-dashboard-main-features-1.png"
            width="700"
            height="700"
            alt="Docs"
            className="w-[676px] rounded"
          />
        </div>
        <div className="space-y-5">
          <h3>Filter Tab</h3>
          <p>
            This feature allows you to filter through your portfolio and view specific types of projects. You can filter
            projects by categories such as Drops, Art Collections, Coins, Forms, and view Archived projects.
          </p>
          <Image
            src="/images/docs/home-dashboard-main-features-2.png"
            width="700"
            height="700"
            alt="Docs"
            className="w-[676px] rounded"
          />
        </div>
        <div className="space-y-5">
          <h3>Sort Tab</h3>
          <p>
            The Sort Tab enables you to organize your projects based on different criteria. You can sort your projects
            by Most Recent, Date Added, and Name. This makes it easy to find and manage your projects efficiently.
          </p>
          <Image
            src="/images/docs/home-dashboard-main-features-3.png"
            width="700"
            height="700"
            alt="Docs"
            className="w-[676px] rounded"
          />
        </div>
        <div className="space-y-5">
          <h3>View Modes</h3>
          <ul>
            <li>
              View as Grid: You can choose to view your portfolio in Grid Mode. Grid Mode displays project containers in
              a visually appealing grid layout.
            </li>
            <li>
              View as List: Alternatively, you can switch to List Mode, which presents your projects in a more compact,
              list-based format.
            </li>
          </ul>
          <Image
            src="/images/docs/home-dashboard-main-features-4.png"
            width="700"
            height="700"
            alt="Docs"
            className="w-[676px] rounded"
          />
        </div>
        <div className="space-y-5">
          <h3>Favorites</h3>
          <p>
            You can mark specific projects as your favorites by clicking the star icon on each project listed in both
            Grid and List Mode. Access your favorite projects by clicking the Filter Tab and selecting the
            &quot;Favorites&quot; category.
          </p>
          <Image
            src="/images/docs/home-dashboard-main-features-5.png"
            width="700"
            height="700"
            alt="Docs"
            className="w-[676px] rounded"
          />
        </div>
        <div className="space-y-5">
          <h3>Project Actions</h3>
          <ul>
            <li>
              Duplicate, Delete, Archive: To perform actions such as duplicating a project, deleting a project, or
              archiving a project, click the three-dotted icon located on a Project Container. A menu will appear,
              providing options to Duplicate, Delete, or Archive the project.
            </li>
          </ul>
          <p>
            By following the instructions in this documentation guide, you can effectively manage your NFT projects
            using the Portfolio Feature within the No Code NFT Tool. This feature enhances your workflow by providing
            easy access to your projects and tools for organizing and categorizing them.
          </p>
          <Image
            src="/images/docs/home-dashboard-main-features-6.png"
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
