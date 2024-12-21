import Dashboard from "../components/Dashborad";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Datepicker from "react-tailwindcss-datepicker";
import useTranslation from "next-translate/useTranslation";
const TrackerTableArbitrage = dynamic(
  () => import("../components/trackerArbitrage/TrackerTableArb"),
  {
    ssr: false,
  }
);

const StatsArb = dynamic(
  () => import("../components/trackerArbitrage/StatsArb"),
  {
    ssr: false,
  }
);

const EvPro = () => {
  const { t } = useTranslation("arbitrage");
  return (
    <>
      <Dashboard
        title={t("trackerArbitragePage.title")}
        content={t("trackerArbitragePage.pageTitle")}
        dashboard_name={t("trackerArbitragePage.pageTitle")}
      >
        <div className="rounded-lg bg-[#0F2D3D] py-5 px-5 shadow sm:px-6">
          <div className="rounded-lg">
            <div>
              <StatsArb />
              <div className="flex mt-8 mb-8">
                <span className="w-full p-0.5 justify-center items-center border-b border-cyan-500/20 mx-8"></span>
              </div>
            </div>
          </div>

          <div>
            <TrackerTableArbitrage />
          </div>
        </div>
      </Dashboard>
    </>
  );
};

export default EvPro;
