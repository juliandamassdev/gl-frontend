import DocsLayout from "@/layouts/DocsLayout";
import Image from "next/image";

const Docs = () => {
  const navMenu = {
    name: "Welcome",
    menu: [
      {
        url: "/docs/welcome",
        label: "Creating an Account",
      },
      {
        url: "/docs/welcome/pricing-and-plans",
        label: "Pricing & Plans",
      },
    ],
  };

  return (
    <DocsLayout navMenu={navMenu}>
      <h2>Welcome</h2>
      <div className="space-y-12">
        <div className="space-y-5">
          <p>
            A No-Code Tool for Businesses, Artists, Designers and Creators to build, create and generate NFT
            Collections.
          </p>
        </div>
        <div className="space-y-5">
          <h4>How to Create an NFT using Drops</h4>
          <Image src="/images/docs/welcome-welcome-1.png" width="700" height="700" alt="Docs" className="w-[401px] rounded" />
        </div>
        <div className="space-y-5">
          <h4>How to Create Art for an NFT Collection</h4>
          <Image src="/images/docs/welcome-welcome-2.png" width="700" height="700" alt="Docs" className="w-[401px] rounded" />
        </div>
        <div className="space-y-5">
          <h4>How to create an NFT Contract</h4>
          <Image src="/images/docs/welcome-welcome-3.png" width="700" height="700" alt="Docs" className="w-[401px] rounded" />
        </div>
        <div className="space-y-5">
          <h4>How to buy an NFT with Generatelabs.App</h4>
          <Image src="/images/docs/welcome-welcome-4.png" width="700" height="700" alt="Docs" className="w-[401px] rounded" />
        </div>
      </div>
    </DocsLayout>
  );
};

export default Docs;
