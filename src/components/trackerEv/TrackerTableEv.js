import Datepicker from "react-tailwindcss-datepicker";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import SaveBetModal from "./SaveBetModal";
import BetDetailsEdit from "./BetDetailsEdit";
import DeleteModal from "./DeleteModal";
import { useDispatch } from "react-redux";
import { completedBets, amountCompletedBets, totalPayout } from "./CalcFunc";
import { TrashIcon } from "@heroicons/react/24/outline";
import Pagination from "./Pagination";
import PropagateLoader from "react-spinners/PropagateLoader";
import useAmericanOdds from "../../hooks/useAmericanOdds";
import useUserSettings from "../../hooks/useUserSettings";
import useFormatDate from "../../hooks/useFormatDate";
import { thousandsSeparators } from "./CalcFunc";
import useTranslation from "next-translate/useTranslation";

export default function TrackerTableEv() {
  const { t } = useTranslation("ev");
  const dispatch = useDispatch();
  const [betData, setBetData] = useState([
    { sport_league: "get_league", outcome: "None" },
  ]);
  //loader
  const [isLoading, setIsLoading] = useState(false);

  const date = new Date();
  const [value, setValue] = useState({
    startDate: date.setDate(date.getDate() - 30),
    endDate: new Date(),
  });
  const userSettings = useUserSettings();
  const [openSaveModal, setOpenSaveModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [betDetailsUpdated, setBetDetailsUpdated] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [betDetailDeleted, setBetDetailDeleted] = useState(false);
  const [betManuallyCreated, setBetManuallyCreated] = useState(false);

  const [currentBetDetails, setCurrentBetDetails] = useState({
    id: 0,
    sport_league: "get_league",
    outcome: "None",
  });

  const handleValueChange = (newValue) => {
    setValue(newValue);
  };

  const handleSaveBet = () => {
    setOpenSaveModal(true);
  };

  const handleEditBet = (bet) => {
    setOpenEditModal(true);
    setCurrentBetDetails(bet);
  };

  const handleDeleteBet = (bet) => {
    setOpenDeleteModal(true);
    setCurrentBetDetails(bet);
  };

  const fetchBets = async (initialDate, endDate) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/content/ev-bets/", {
        method: "GET",
        headers: {
          Accept: "application/json",
          From: initialDate,
          To: endDate,
        },
      });

      const data = await res.json();
      setBetData(data);
      setIsLoading(false);
      let betStats = {};
      let completedBetsAmount = amountCompletedBets(data);
      let completedBetsProfit = (
        totalPayout(data) - amountCompletedBets(data)
      ).toFixed(2);
      let completedBetsROI = (
        (completedBetsProfit / completedBetsAmount) *
        100
      ).toFixed(2);

      if (data.length > 0) {
        betStats = {
          numberCompletedBets: completedBets(data),
          amountCompletedBets: completedBetsAmount,
          totalPayout: totalPayout(data),
          netProfit: completedBetsProfit,
          totalROI: completedBetsROI,
        };
      }
      dispatch(addBets(betStats));
    } catch (err) {
      return err;
    }
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    let initialFromDate = new Date(value.startDate).toISOString().slice(0, 10);
    let initialToDate = new Date(value.endDate).toISOString().slice(0, 10);
    fetchBets(initialFromDate, initialToDate);
    setBetDetailsUpdated(false);
    setBetDetailDeleted(false);
    setBetManuallyCreated(false);
  }, [value, betDetailsUpdated, betDetailDeleted, betManuallyCreated]);

  const addBets = (dataDisp) => {
    return {
      type: "SET_DATA",
      payload: dataDisp,
    };
  };

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [betsPerPage] = useState(10);

  //Get current bets
  const indexOfLastBet = currentPage * betsPerPage;
  const indexOfFirstBet = indexOfLastBet - betsPerPage;
  const currentBets = betData.slice(indexOfFirstBet, indexOfLastBet);

  //Paginate

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div className="px-4 sm:px-6 lg:px-8 ">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <div className="flex">
            <div className="flex w-[280px]">
              <Datepicker
                startFrom={value.startDate}
                value={value}
                onChange={handleValueChange}
                primaryColor={"cyan"}
                placeholder={"Select Date"}
                inputClassName="font-normal bg-black dark:bg-[#0F2D3D] dark:placeholder:text-gray-300 placeholder:text-white text-white dark:text-gray-300 border border-gray-300 dark:border-cyan-500 rounded-md shadow-sm focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-100"
              />
            </div>
          </div>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={handleSaveBet}
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-cyan-500 px-4 py-2 text-sm font-medium text-cyan-500 shadow-sm hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 sm:w-auto hover:text-white"
          >
            {t("trackerTable.manualBetBtn")}
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-2xl">
              {isLoading ? (
                <div className="p-5 flex justify-center items-center">
                  {" "}
                  <PropagateLoader color="#06b6d4" className="" />
                </div>
              ) : (
                <div>
                  {/* starts mobile table */}
                  <table className="text-white b-0 w-full sm:hidden">
                    <thead className="border-none overflow-hidden p-0 absolute w-0 bg-[#155E75]">
                      <tr className="block">
                        <th scope="col" className="text-sm text-gray-00">
                          {t("trackerTable.sport")}
                        </th>
                        <th scope="col" className="text-sm text-gray-100">
                          {t("trackerTable.details")}
                        </th>
                        <th scope="col" className="text-sm text-gray-100">
                          {t("trackerTable.amount")}
                        </th>
                        <th scope="col" className="text-sm text-gray-100">
                          {t("trackerTable.status")}
                        </th>
                        <th scope="col" className="text-sm text-gray-100">
                          {t("trackerTable.edit")}
                        </th>
                        {/* <th scope="col" className="text-sm text-gray-100">
                      Edit
                    </th>
                    <th scope="col" classNamse="text-sm text-gray-100">
                      Calculator
                    </th> */}
                      </tr>
                    </thead>

                    <tbody>
                      {currentBets.map((bet, betIdx) => (
                        <tr className="block bg-[#0f1d2b]" key={betIdx}>
                          <td
                            className="px-4 block text-right sm:block pt-2"
                            data-label={t("trackerTable.sport")}
                          >
                            <div className="flex items-center justify-end">
                              <div className="h-5 w-5 flex-shrink-0">
                                {bet.bet_saved_mode !== "manually" ? (
                                  <Image
                                    className="h-5 w-5 rounded"
                                    src={
                                      "/images/sports/" +
                                      bet.sport_league.split("_")[0] +
                                      ".svg"
                                    }
                                    alt={bet.sport_league.split("_")[0]}
                                    width={5}
                                    height={5}
                                  />
                                ) : (
                                  <Image
                                    className="h-5 w-5 rounded"
                                    src={"/images/sports/flag.svg"}
                                    alt={"saved-bet-image"}
                                    width={5}
                                    height={5}
                                  />
                                )}
                              </div>
                              <div className=" text-gray-400 ml-1">
                                {bet.bet_saved_mode !== "manually"
                                  ? capitalizeFirstLetter(
                                      bet.sport_league.split("_")[0]
                                    )
                                  : bet.sport_league}
                              </div>
                              <span className="px-2 text-gray-400">|</span>
                              <div className=""> 
                                <div className="text-gray-400">
                                  {bet.bet_saved_mode !== "manually" &&
                                    bet.sport_league
                                      .split("_")[1]
                                      .toUpperCase()}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td
                            className="px-4 block text-right text-gray-200"
                            data-label={t("trackerTable.details")}
                          >
                            <div className="text-gray-200 font-medium">
                              {userSettings.odds_format === "American"
                                ? `${
                                    bet.title.split(":")[0]
                                  } : ${useAmericanOdds(
                                    bet.title.split(":")[1]
                                  )} | ${bet.bookie}`
                                : `${bet.title} | ${bet.bookie}`}
                            </div>
                            <div className="text-gray-400">
                              {" "}
                              {bet.bet_saved_mode !== "manually" && (
                                <p>
                                  {bet.home_team} vs {bet.away_team}
                                </p>
                              )}
                            </div>
                            <div className="text-gray-400">
                              {bet.game_date
                                ? `Game date: ${useFormatDate(bet.game_date)}`
                                : "-"}
                            </div>
                          </td>
                          <td
                            className="px-4 block text-right text-gray-200"
                            data-label={t("trackerTable.amount")}
                          >
                            <div className=" text-gray-200">
                              $
                              {thousandsSeparators(
                                parseFloat(bet.bet_amount).toFixed(2)
                              )}
                            </div>
                            <div className="text-gray-400">
                              $
                              {thousandsSeparators(
                                parseFloat(bet.bet_payout).toFixed(2)
                              )}
                            </div>
                          </td>
                          <td
                            className="px-4 block text-right text-gray-200"
                            data-label={t("trackerTable.status")}
                          >
                            <span
                              className={`inline-flex rounded-full px-3 text-xs font-semibold leading-5 ${
                                bet.outcome === "WON"
                                  ? "text-green-800 bg-green-100"
                                  : bet.outcome === "LOST"
                                  ? "text-red-800 bg-red-100"
                                  : "text-yellow-800 bg-yellow-100"
                              }`}
                            >
                              {t("trackerEditBet." + bet.outcome.toLowerCase())}
                            </span>
                          </td>
                          <td
                            className="before:hidden text-right text-gray-200 flex items-center mt-2"
                            data-label={t("trackerTable.edit")}
                          >
                            <div
                              onClick={() => handleEditBet(bet)}
                              className="bg-[#155e75] p-2 w-full text-center cursor-pointer"
                            >
                              <button className="text-gray-300 ">
                                {t("trackerTable.edit")}
                              </button>
                            </div>
                            <div
                              onClick={() => handleDeleteBet(bet)}
                              className="bg-[#06b6d4] p-2 w-full text-center flex justify-center h-full cursor-pointer"
                            >
                              <TrashIcon className="w-6 text-gray-300 " />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* ends mobile table */}
                  <table className="min-w-full divide-y divide-gray-600 hidden sm:inline-table">
                    <thead className="bg-[#155E75]">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-100 sm:pl-6"
                        >
                          {t("trackerTable.sport")}
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-100"
                        >
                          {t("trackerTable.details")}
                        </th>
                        <th
                          scope="col"
                          className="px-0 py-3.5 text-left text-sm font-semibold text-gray-100"
                        >
                          {t("trackerTable.amount")}
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-100"
                        >
                          {t("trackerTable.status")}
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                        >
                          <span className="sr-only">
                            {t("trackerTable.edit")}
                          </span>
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-600 bg-[#0f131f]/60">
                      {currentBets.map((bet, betIdx) => (
                        <tr key={betIdx}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                {bet.bet_saved_mode !== "manually" ? (
                                  <Image
                                    className="h-10 w-10 rounded"
                                    src={
                                      "/images/sports/" +
                                      bet.sport_league.split("_")[0] +
                                      ".svg"
                                    }
                                    alt={bet.sport_league.split("_")[0]}
                                    width={10}
                                    height={10}
                                  />
                                ) : (
                                  <Image
                                    className="h-10 w-10 rounded"
                                    src={"/images/sports/flag.svg"}
                                    alt={"saved-bet-image"}
                                    width={10}
                                    height={10}
                                  />
                                )}
                              </div>
                              <div className="ml-4">
                                <div className=" text-gray-200">
                                  {bet.bet_saved_mode !== "manually"
                                    ? capitalizeFirstLetter(
                                        bet.sport_league.split("_")[0]
                                      )
                                    : bet.sport_league}
                                </div>
                                <div className="text-gray-400 text-xs">
                                  {bet.bet_saved_mode !== "manually" &&
                                    bet.sport_league
                                      .split("_")[1]
                                      .toUpperCase()}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400">
                            <div className="text-gray-200 font-medium">
                              {userSettings.odds_format === "American"
                                ? `${
                                    bet.title.split(":")[0]
                                  } : ${useAmericanOdds(
                                    bet.title.split(":")[1]
                                  )} | ${bet.bookie}`
                                : `${bet.title} | ${bet.bookie}`}
                            </div>
                            <div className="text-gray-400">
                              {" "}
                              {bet.bet_saved_mode !== "manually" && (
                                <p>
                                  {bet.home_team} vs {bet.away_team}
                                </p>
                              )}
                            </div>
                            <div className="text-gray-400">
                              {bet.game_date
                                ? `Game date: ${useFormatDate(bet.game_date)}`
                                : "-"}
                            </div>
                          </td>
                          <td className="whitespace-nowrap pr-12 py-4 text-sm text-gray-400">
                            <div className=" text-gray-200">
                              $
                              {thousandsSeparators(
                                parseFloat(bet.bet_amount).toFixed(2)
                              )}
                            </div>
                            <div className="text-gray-400">
                              $
                              {thousandsSeparators(
                                parseFloat(bet.bet_payout).toFixed(2)
                              )}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-2 py-4 text-sm text-gray-400">
                            <span
                              className={`inline-flex rounded-full px-3 text-xs font-semibold leading-5 ${
                                bet.outcome === "WON"
                                  ? "text-green-800 bg-green-100"
                                  : bet.outcome === "LOST"
                                  ? "text-red-800 bg-red-100"
                                  : "text-yellow-800 bg-yellow-100"
                              }`}
                            >
                              {t("trackerEditBet." + bet.outcome.toLowerCase())}
                            </span>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-0 pr-4 text-right text-sm font-medium sm:pr-6">
                            <div className="flex items-center justify-end">
                              <button
                                onClick={() => handleEditBet(bet)}
                                className="text-gray-300 hover:text-cyan-600 pr-5 hover:scale-110 hover:ease-in-out duration-200"
                              >
                                {t("trackerTable.edit")}
                              </button>

                              <TrashIcon
                                className="h-4 w-4 text-gray-300 hover:text-red-400 hover:scale-125 hover:ease-in-out duration-200 cursor-pointer"
                                onClick={() => handleDeleteBet(bet)}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {openSaveModal && (
                <SaveBetModal
                  openModal={setOpenSaveModal}
                  currrentState={openSaveModal}
                  betCreated={setBetManuallyCreated}
                  oddsFormat={userSettings.odds_format}
                />
              )}
              {openEditModal && (
                <BetDetailsEdit
                  openModal={setOpenEditModal}
                  currrentState={openEditModal}
                  betDetails={currentBetDetails}
                  betDetailsUpdated={setBetDetailsUpdated}
                  oddsFormat={userSettings.odds_format}
                />
              )}
              {openDeleteModal && (
                <DeleteModal
                  openModal={setOpenDeleteModal}
                  currrentState={openDeleteModal}
                  betDetails={currentBetDetails}
                  betDetailDeleted={setBetDetailDeleted}
                  betEvent={"ev-bets"}
                  oddsFormat={userSettings.odds_format}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Pagination
          betsPerPage={betsPerPage}
          totalBets={betData.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
