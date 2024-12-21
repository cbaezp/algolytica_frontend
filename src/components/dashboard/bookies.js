import { useState } from "react";
import DetailsModal from "./detailsModal";
import PropagateLoader from "react-spinners/PropagateLoader";
import useActiveBookies from "../../hooks/useActiveBookies";
import { useSelector } from "react-redux";

export default function Bookies() {
  const [openDetails, setOpenDetails] = useState(false);
  const activeBookies = useActiveBookies();
  const { loadingBookies } = useSelector((state) => state.loading);

  return (
    <>
      {" "}
      <div className="overflow-hidden rounded-2xl bg-[#0f131f]/50 shadow">
        <div className="p-6">
          <h2
            className="text-base font-medium text-gray-300"
            id="recent-hires-title"
          >
            Bookies
          </h2>
          <div className="mt-6 flow-root">
            {loadingBookies ? (
              <div className="flex justify-center items-center">
                <PropagateLoader color="#06b6d4" className="" />
              </div>
            ) : (
              <ul role="list" className="-my-5 divide-y divide-gray-600">
                {activeBookies.slice(0, 5).map((bookies, bookieIdx) => (
                  <li key={bookieIdx} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-400">
                          {bookies.name}
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
              View all ({activeBookies.length})
            </button>
          </div>
        </div>
      </div>
      {openDetails && (
        <DetailsModal
          openDetails={setOpenDetails}
          currentState={openDetails}
          title={"Bookies"}
          data={activeBookies}
          isSports={false}
        />
      )}
    </>
  );
}
