import Dashboard from "../components/Dashborad";
import ProEvTable from "../components/ProEvTable";
import { useEffect, useState } from "react";
import DropDownFilter from "../components/DropdownFilter";
import PropagateLoader from "react-spinners/PropagateLoader";
import useTranslation from "next-translate/useTranslation";

const EvPro = () => {
  const [responseData, setResponseData] = useState([]);
  const [league, setLeague] = useState("Select League");
  const [isLeagueActive, setIsLeagueActive] = useState(false);
  const [leagueTitle, setLeagueTitle] = useState("Select League");
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation("ev");

  const fetchEvs = async () => {
    setIsLoading(true);
    const response = await fetch("/api/content/ev-pro/", {
      method: "POST",
      body: JSON.stringify({ league: league }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    setResponseData(data);
    setLeagueTitle(league);
    setIsLoading(false);
  };

  useEffect(() => {
    isLeagueActive && fetchEvs();
  }, [league]);

  return (
    <>
      <Dashboard
        title={t("evProPage.title")}
        content={t("evProPage.content")}
        dashboard_name="Positive EV"
      >
        <div className="rounded-lg bg-[#0F2D3D] px-5 py-6 shadow sm:px-6">
          <div className="">
            <div>
              <div className="flex flex-wrap items-center justify-between">
                <div className="">
                  <h1 className="text-xl font-semibold text-gray-100">
                    {leagueTitle !== "Select League" &&
                      leagueTitle !== "Select League"
                      ? leagueTitle.replace("_", ": ").toUpperCase()
                      : `${t("evProPage.content")}`}
                  </h1>
                </div>
                <div className="flex flex-col md:flex-row">
                  <div className="flex-auto mr-3 w-64 flex-col md:flex-row">
                    <DropDownFilter
                      setLeague={setLeague}
                      setIsLeagueActive={setIsLeagueActive}
                    />
                  </div>
                  {/* <div className="flex-auto flex-col md:flex-row md:flex-auto">
                    <button
                      onClick={fetchEvs}
                      disabled={!isLeagueActive}
                      type="button"
                      className="inline-flex items-center justify-center rounded-lg border border-cyan-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 sm:w-auto disabled:opacity-20 "
                    >
                      {t("evProPage.getEvButton")}
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="mt-9">
              {isLoading ? (
                <div className="flex justify-center items-center">
                  {" "}
                  <PropagateLoader color="#06b6d4" className="" />
                </div>
              ) : (
                <ProEvTable response={responseData} dasboardTable={false} />
              )}
            </div>
          </div>
        </div>
      </Dashboard>
    </>
  );
};

export default EvPro;
