import HeaderApp from "@/components/headers/header-app";

interface ILayoutDashboard {
  children: JSX.Element;
}

const LayoutDashboard = ({ children }: ILayoutDashboard) => {
  return (
    <div id="layout-dashboard">
      <HeaderApp />
      <main className="flex w-full min-h-screen pt-20">{children}</main>
    </div>
  );
};

export default LayoutDashboard;
