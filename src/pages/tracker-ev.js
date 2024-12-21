import Dashboard from "../components/Dashborad";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Datepicker from "react-tailwindcss-datepicker";
import useTranslation from "next-translate/useTranslation";

const TrackerTableEv = dynamic(
  () => import("../components/trackerEv/TrackerTableEv"),
  {
    ssr: false,
  }
);

const Stats = dynamic(() => import("../components/trackerEv/Stats"), {
  ssr: false,
});

const EvPro = () => {
  const { t } = useTranslation("ev");
  return (
    <>
      <Dashboard
        title={t("trackerPage.title")}
        content={t("trackerPage.content")}
        dashboard_name={t("trackerPage.content")}
      >
        <div className="rounded-lg bg-[#0F2D3D] py-5 px-5 shadow sm:px-6">
          <div className="rounded-lg">
            <div>
              <Stats />
              <div className="flex mt-8 mb-8">
                <span className="w-full p-0.5 justify-center items-center border-b border-cyan-500/20 mx-8"></span>
              </div>
            </div>
          </div>

          <div>
            <TrackerTableEv />
          </div>
        </div>
      </Dashboard>
    </>
  );
};

export default EvPro;
