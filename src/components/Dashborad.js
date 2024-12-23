import LayoutLogged from "../hocs/LayoutLogged";
import Footer from "./Footer";

const Dashboard = ({ title, content, dashboard_name, children }) => {
  return (
    <>
      <LayoutLogged title={title} content={content}>
        <div className="min-h-full bg-[#0F2D3D]">
          <header className="bg-[#0F2D3D] shadow-sm">
            <div className="mx-auto max-w-3xl py-4 px-4 sm:px-6 lg:px-8 border-b border-cyan-500/30">
              <h1 className="text-lg font-semibold leading-6 text-gray-200 items-center flex justify-center">
                {content}
              </h1>
            </div>
          </header>

          <main>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-0">
              {/* Replace with your content */}
              <div className="px-4 py-8 sm:px-0">{children}</div>
              {/* /End replace */}
            </div>
          </main>
        </div>

        <Footer />
      </LayoutLogged>
    </>
  );
};

Dashboard.defaultProps = {
  title: "Algolytica",
  content: "Be the house",
  dashboard_name: "Dashboard",
};
export default Dashboard;
