import ProEvTable from "../components/ProEvTable";
import PropagateLoader from "react-spinners/PropagateLoader";
import StatsWithImage from "../components/dashboard/statsWithImage";
import SportsIcons from "../components/dashboard/sportsIcons";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import Access from "../components/dashboard/access";
import LayoutLogged from "../hocs/LayoutLogged";
import useTranslation from "next-translate/useTranslation";


export default function MainDashboard() {
  const user = useSelector((state) => state.auth.user);

  const [isLoading, setIsLoading] = useState(false);

  const [responseData, setResponseData] = useState([]);

  const userEmail = useSelector((state) => state.auth.user.email);
  const { t } = useTranslation("dashboard");

  const fetchEvs = async () => {
    setIsLoading(true);

    const response = await fetch("/api/content/ev-pro/", {
      method: "POST",
      body: JSON.stringify({ league: "upcoming" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      setResponseData(data);
    }
    if (response.status === 403) {
    }

    setIsLoading(false);
  };


  return (
    <>
      <LayoutLogged title={"Home | Algolytica"} content={"Get an edge."}>
        {
          <>
            <StatsWithImage username={user} />
            <div className="bg-[#0F2D3D] py-8 flex flex-col items-center justify-center">
              <div className="flex justify-center items-center mb-4">
                <h2 className=" text-gray-200 text-2xl font-bold pb-4">
                  {t("tableSection.title")}
                </h2>
                <div>
                  <ArrowPathIcon
                    className="h-6 w-6 text-gray-200 cursor-pointer hover:scale-110 hover:text-cyan-500 disabled:opacity-20 disabled-hover:scale-100 mb-3 ml-4"
                    alt="refresh games"
                    onClick={() => fetchEvs()}
                  />
                </div>
              </div>

              {isLoading ? (
                <div className="flex justify-center items-center">
                  <PropagateLoader color="#06b6d4" className="" />
                </div>
              ) : (
                <div className="w-full items-center justify-center px-8">
                  <ProEvTable response={responseData} dasboardTable={true} />
                </div>
              )}
            </div>

            <Access />

            <SportsIcons />

            <Footer />
          </>
        }
      </LayoutLogged>
    </>
  );
}
