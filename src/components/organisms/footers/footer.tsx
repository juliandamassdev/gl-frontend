import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="footer pt-12 pb-20 text-white">
      <div className="container-gl">
        <div className="grid grid-cols-12 gap-18 mb-36">
          <div className="col-span-4">
            <div className="flex items-center space-x-14 mb-12">
              <Image
                src="/images/generate-labs-white-logo.png"
                alt="Logo"
                width={150}
                height={150}
                className="w-[118px] h-auto"
              />
              <div className="space-x-4"></div>
            </div>
            <p>
              Join our exclusive Beta program and unleash your creativity by building, creating, and generating digital
              collectibles with No-Code Tools.
            </p>
          </div>
          <div className="col-span-2 col-start-7">
            <h3 className="mb-5">Generate Labs</h3>
            <ul className="space-y-[18px]">
              <li>
                <Link href={"#"}>Home</Link>
              </li>
              <li>
                <Link href={"#"}>Careers</Link>
              </li>
              <li>
                <Link href={"#"}>Marketplace</Link>
              </li>
            </ul>
          </div>
          <div className="col-span-2">
            <h3 className="mb-5">Product</h3>
            <ul className="space-y-[18px]">
              <li>
                <Link href={"#"}>NFT Generator</Link>
              </li>
              <li>
                <Link href={"#"}>Forms</Link>
              </li>
              <li>
                <Link href={"#"}>Smart Contracts</Link>
              </li>
              <li>
                <Link href={"#"}>Courses</Link>
              </li>
            </ul>
          </div>
          <div className="col-span-2">
            <h3 className="mb-5">Resources</h3>
            <ul className="space-y-[18px]">
              <li>
                <Link href={"#"}>Blog</Link>
              </li>
              <li>
                <Link href={"#"}>Join Our Community</Link>
              </li>
              <li>
                <Link href={"#"}>Help Docs</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p>© Official GenerateLabs.App 2023</p>
          <div className="flex items-center space-x-7">
            <Link href={"#"}>Privacy Policy</Link>
            <Link href={"#"}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
