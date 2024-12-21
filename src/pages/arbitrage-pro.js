import Dashboard from "../components/Dashborad";
// import ProEvTable from "../components/ProEvTable";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import DropDownFilter from "../components/DropdownFilter";
import dynamic from "next/dynamic";
import PropagateLoader from "react-spinners/PropagateLoader";
import useTranslation from "next-translate/useTranslation";

const ProArbTable = dynamic(
  () => import("../components/arbitrage/ProArbTable"),
  {
    ssr: false,
  }
);

const ArbPro = () => {
  const { t } = useTranslation("arbitrage");
  const router = useRouter();
  const [arbResponseData, setArbResponseData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [league, setLeague] = useState("Select League");
  const [isLeagueActive, setIsLeagueActive] = useState(false);

  const [leagueTitle, setLeagueTitle] = useState("Select League");

  const fetchArb = async () => {
    setIsLoading(true);
    const response = await fetch("/api/content/arbitrage-pro/", {
      method: "POST",
      body: JSON.stringify({ league: league }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
   
    setArbResponseData(data);

    setIsLoading(false);
  };

  useEffect(() => {
    isLeagueActive && fetchArb();
  }, [league]);

  return (
    <>
      <Dashboard
        title={t("arbitragePage.title")}
        content={t("arbitragePage.description")}
        dashboard_name={t("arbitragePage.pageTitle")}
      >
        <div className="rounded-lg bg-[#0F2D3D] px-5 py-6 shadow sm:px-6">
          <div className="">
            <div>
              <div className="flex flex-wrap items-center justify-between">
                <div className="sm:mb-5">
                  <h1 className="text-xl font-semibold text-gray-100">
                    {leagueTitle !== "Select League" &&
                    leagueTitle !== "Select League"
                      ? leagueTitle.replace("_", ": ").toUpperCase()
                      : `${t("arbitragePage.pageTitle")}`}
                  </h1>
                </div>
                <div className="flex flex-col md:flex-row">
                  <div className="flex-auto w-64 flex-col md:flex-row">
                    <DropDownFilter
                      setLeague={setLeague}
                      setIsLeagueActive={setIsLeagueActive}
                    />
                  </div>
                  {/* <div className="flex-auto flex-col md:flex-row md:flex-auto">
                    <button
                      onClick={fetchArb}
                      disabled={!isLeagueActive}
                      type="button"
                      className="inline-flex items-center justify-center rounded-lg border border-cyan-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 sm:w-auto disabled:opacity-20 "
                    >
                      {t("arbitragePage.arbitrageButton")}
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="mt-8">
              {isLoading ? (
                <div className="flex justify-center items-center">
                  {" "}
                  <PropagateLoader color="#06b6d4" className="" />
                </div>
              ) : (
                <ProArbTable response={arbResponseData} />
              )}
            </div>
          </div>
        </div>
      </Dashboard>
    </>
  );
};

export default ArbPro;
