import HeaderMain from "@/components/headers/header-main";

interface ILayoutMain {
  children: JSX.Element;
}

const LayoutMain = ({ children }: ILayoutMain) => {
  return (
    <div id="layout-main">
      <HeaderMain />
      <main>{children}</main>
    </div>
  );
};

export default LayoutMain;
