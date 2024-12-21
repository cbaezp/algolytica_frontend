import useActiveSports from "../../hooks/useActiveSports";
import { useState } from "react";
import DetailsModal from "./detailsModal";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

export default function SportsIcons() {
  const { t } = useTranslation("dashboard");
  const activeSports = useActiveSports();
  const [openDetails, setOpenDetails] = useState(false);

  const listOfSports = () => {
    const sports = activeSports.map((league) => league.name.split("_")[0]);
    return [...new Set(sports)];
  };
  const uniqueSports = listOfSports();

  return (
    <>
      {activeSports[0].name === "Select League" ? (
        <div> Loading... </div>
      ) : (
        <div className="bg-gray-900 py-10 sm:py-15">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-3 mt-3">
              {uniqueSports.map((sport, sportIdx) => (
                // <div>{sport.name.split('_')[0]}</div>
                <div key={sportIdx}>
                  <Image
                    className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                    src={`/images/sports/${sport}.svg`}
                    alt={sport}
                    width={100}
                    height={100}
                  />
                </div>
              ))}
            </div>
            <div className="mt-16 flex justify-center">
              <p className="relative rounded-full bg-gray-800 px-4 py-1.5 text-sm leading-6 text-gray-300">
                <span className="hidden md:inline">
                  {t("sportList.paragraph")}
                </span>
                <a
                  href="#"
                  className="font-semibold text-white hover:text-cyan-500"
                >
                  <span
                    className="absolute inset-0"
                    aria-hidden="true"
                    onClick={() => setOpenDetails(true)}
                  />{" "}
                  {t("sportList.button")} <span aria-hidden="true">&rarr;</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      )}

      {openDetails && (
        <DetailsModal
          openDetails={setOpenDetails}
          currentState={openDetails}
          title={t("sportList.title")}
          data={activeSports}
          isSports={true}
        />
      )}
    </>
  );
}
