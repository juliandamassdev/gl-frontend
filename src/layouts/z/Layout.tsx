import Footer from "@/components/organisms/footers/footer";
import Header from "@/components/organisms/headers/header";

interface ILayout {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayout) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
