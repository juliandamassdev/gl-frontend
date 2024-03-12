import Link from "next/link";

const FooterMenu1 = {
  label: "Generate Labs",
  menus: [
    {
      label: "Home",
      url: "",
    },
    {
      label: "Careers",
      url: "",
    },
    {
      label: "Marketplace",
      url: "",
    },
  ],
};

const Footer = () => {
  return (
    <div className="bg-c-1 text-white">
      <div className="container-gl">
        <div className="pt-12 pb-20">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-6"></div>
            <div className="col-2">
              <h6>{FooterMenu1.label}</h6>
              <div className="space-y-[18px]">
                {FooterMenu1.menus.map((menu: any, index: number) => (
                  <Link key={index} href={menu.url}>{menu.label}</Link>
                ))}
              </div>
            </div>
            <div className="col-2"></div>
            <div className="col-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
