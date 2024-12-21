import { useState } from "react";
import { capitalizeFirstLetter } from "../utilsFunc";
import Image from "next/image";
import DetailsModal from "./detailsModal";
import PropagateLoader from "react-spinners/PropagateLoader";
import useActiveSports from "../../hooks/useActiveSports";
import { useSelector } from "react-redux";

export default function SportsList() {
  const [openDetails, setOpenDetails] = useState(false);
  const activeLeagues = useActiveSports();
  const { loadingSports } = useSelector((state) => state.loading);

  const listOfSports = () => {
    const sports = activeLeagues.map((league) => league.name.split("_")[0]);
    return [...new Set(sports)];
  };

  const uniqueSports = listOfSports();

  return (
    <>
      {" "}
      <div className="overflow-hidden rounded-2xl bg-[#0f131f]/50 shadow">
        <div className="p-6">
          <h2
            className="text-base font-medium text-gray-300"
            id="recent-hires-title"
          >
            Sports
          </h2>
          <div className="mt-6 flow-root">
            {loadingSports ? (
              <div className="flex justify-center items-center">
                <PropagateLoader color="#06b6d4" className="" />
              </div>
            ) : (
              <ul role="list" className="-my-5 divide-y divide-gray-600">
                {uniqueSports.slice(0, 5).map((sport, sportIdx) => (
                  <li key={sportIdx} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {sport !== "Select League" && (
                          <Image
                            className="h-10 w-10 rounded opacity-40"
                            src={"/images/sports/" + sport + ".svg"}
                            alt={sport}
                            width={5}
                            height={5}
                          />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-400">
                          {capitalizeFirstLetter(sport)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mt-6">
            <button
              onClick={() => setOpenDetails(true)}
              className="flex w-full items-center justify-center rounded-md border border-cyan-500/30 px-4 py-2 text-sm font-medium text-cyan-500/30 shadow-sm hover:border-cyan-500 hover:text-cyan-500"
            >
              View all ({activeLeagues.length})
            </button>
          </div>
        </div>
      </div>
      {openDetails && (
        <DetailsModal
          openDetails={setOpenDetails}
          currentState={openDetails}
          title={"Sports"}
          data={activeLeagues}
          isSports={true}
        />
      )}
    </>
  );
}
