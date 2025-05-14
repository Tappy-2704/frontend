import Header from "@/components/header/header";

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div id="main-scroll">
      <Header />

      {children}
    </div>
  );
};

export default MainLayout;
