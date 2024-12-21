import { CalculatorIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import ArbCalculator from "./ArbCalculator";
import React, { useState } from "react";
import Image from "next/image";
//toast notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { thousandsSeparators } from "../trackerEv/CalcFunc";
import useUserSettings from "../../hooks/useUserSettings";
import useAmericanOdds from "../../hooks/useAmericanOdds";
import useTranslation from "next-translate/useTranslation";

export default function ProArbTable({ response }) {
  const [openCalculator, setOpenCalculator] = useState(false);
  const [savedBetsState, setSavedBetsState] = useState([]);
  const [gameData, setGameData] = useState({});
  const userSettings = useUserSettings();
  const handleCalculator = (e, game) => {
    e.preventDefault();
    setOpenCalculator(true);
    setGameData(game);
  };

  const handleBetDetails = (e, betDetails) => {
    e.stopPropagation();

    let saveDetails = {
      title: `${betDetails.homeTeam} vs ${betDetails.awayTeam}`,
      game_date: `${betDetails.gameTime}`,
      sport_league: `${betDetails.sportLeage}`,
      game_id: `${betDetails.gameID}`,
      bet_1: `${betDetails.bet1}`,
      price_1: `${betDetails.price1}`,
      bookie_1: `${betDetails.bookie1}`,
      bet_amount_1: `${betDetails.betAmount1}`,
      bet_2: `${betDetails.bet2}`,
      price_2: `${betDetails.price2}`,
      bookie_2: `${betDetails.bookie2}`,
      bet_amount_2: `${betDetails.betAmount2}`,
      bet_3: `${betDetails.bet3}`,
      price_3: `${betDetails.price3}`,
      bookie_3: `${betDetails.bookie3}`,
      bet_amount_3: `${betDetails.betAmount3}`,
      total_bet_stake: `${betDetails.betStake}`,
      bet_profit: `${betDetails.betProfit}`,
      bet_status: "PENDING",
      bet_saved_mode: "automatic",
    };

    const saveBet = async () => {
      const response = await fetch("/api/content/arbitrage-bets/", {
        method: "POST",
        body: JSON.stringify(saveDetails),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.status === 201) {
        toast.success(
          `${t("arbitrageCalculator.saveMessage")}: ${betDetails.homeTeam} vs ${
            betDetails.awayTeam
          } `,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );

        setSavedBetsState((savedBetsState) =>
          savedBetsState.concat(betDetails.betID)
        );
      }
    };
    saveBet();
  };

  const gameTimeDelta = (ganeTime) => {
    const gameDate = new Date(ganeTime);
    const currentDate = new Date();
    const timeDelta = gameDate - currentDate;
    const minutes = Math.floor((timeDelta / 1000 / 60) % 60);
    const hours = Math.floor((timeDelta / (1000 * 60 * 60)) % 24);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  const { t } = useTranslation("arbitrage");

  return (
    <div className="">
      <div className="flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-2xl bg-[#0f131f]/60">
              {/* mobile table */}
              <table className="sm:hidden text-white b-0 w-full">
                <thead className="border-none overflow-hidden p-0 absolute w-0 bg-[#155E75]">
                  <tr className="block">
                    <th scope="col" className="text-sm text-gray-100">
                      {t("arbitrageTable.game")}
                    </th>
                    <th scope="col" className="text-sm text-gray-100">
                      {t("arbitrageTable.mlBet")}
                    </th>
                    <th scope="col" className="text-sm text-gray-100">
                      {t("arbitrageTable.bookmaker")}
                    </th>
                    <th scope="col" className="text-sm text-gray-100">
                      {t("arbitrageTable.betAmount")}
                    </th>
                    <th scope="col" className="text-sm text-gray-100">
                      {t("arbitrageTable.totalStake")}
                    </th>
                    <th scope="col" className="text-sm text-gray-100">
                      {t("arbitrageTable.profit")}
                    </th>
                    <th scope="col" className="text-sm text-gray-100">
                      {t("arbitrageTable.save")}
                    </th>
                    <th scope="col" className="text-sm text-gray-100">
                      {t("arbitrageTable.calculator")}
                    </th>
                  </tr>
                </thead>
                {response.length !== 0 ? (
                  <>
                    {response.map((game, gameIdx) => (
                      <tbody key={gameIdx}>
                        {game.arbitrage.map((bet, betIdx) => (
                          <React.Fragment key={betIdx}>
                            {Object.values(bet).map((betValue, betValueIdx) => {
                              let gameID = game.game_id;
                              let betID = betValue.bet[0].bet_id;
                              let homeTeam = game.home_team;
                              let awayTeam = game.away_team;
                              let gameTime = game.game_time;
                              let betStake = betValue.bet[0].stake;
                              let betProfit = betValue.bet[0].profit;
                              let sportLeage = game.sport;
                              let bet1 = Object.keys(betValue)[0];
                              let price1 = Object.keys(
                                Object.values(betValue)[0]
                              );
                              let bookie1 = Object.values(
                                Object.values(betValue)[0]
                              )[0];
                              let betAmount1 = Object.values(
                                betValue.bet[0]
                              )[1];

                              //Outcome 2
                              let bet2 = Object.keys(betValue)[1];
                              let price2 = Object.keys(
                                Object.values(betValue)[1]
                              );
                              let bookie2 = Object.values(
                                Object.values(betValue)[1]
                              )[0];
                              let betAmount2 = Object.values(
                                betValue.bet[0]
                              )[2];

                              //Check if the game is a non-binary outcome (win/lose/draw)
                              if (Object.values(betValue).length == 4) {
                                var bet3 = Object.keys(betValue)[2];
                                var price3 = Object.keys(
                                  Object.values(betValue)[2]
                                );
                                var bookie3 = Object.values(
                                  Object.values(betValue)[2]
                                )[0];
                                var betAmount3 = Object.values(
                                  betValue.bet[0]
                                )[3];
                              } else {
                                var bet3 = "-";
                                var price3 = "0";
                                var bookie3 = "-";
                                var betAmount3 = "0";
                              }

                              let currentGameDetails = {
                                gameID,
                                betID,
                                sportLeage,
                                homeTeam,
                                awayTeam,
                                gameTime,
                                betStake,
                                betProfit,
                                bet1,
                                price1: price1[0],
                                bookie1: bookie1[0],
                                betAmount1,
                                bet2,
                                price2: price2[0],
                                bookie2: bookie2[0],
                                betAmount2,
                                bet3,
                                price3: price3[0],
                                bookie3: bookie3[0],
                                betAmount3,
                              };

                              return (
                                <tr className="block" key={betValueIdx}>
                                  <td
                                    className="px-4 block text-center before:hidden sm:block pt-2"
                                    data-label={t("arbitrageTable.game")}
                                  >
                                    <div className="ml-4">
                                      <div className="font-medium text-md text-gray-200">
                                        {homeTeam} vs {awayTeam}
                                      </div>
                                      <div className="text-gray-400 text-sm">
                                        {t("arbitrageTable.gameStarts")}{" "}
                                        {gameTimeDelta(gameTime)}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-4 block text-left text-gray-200 bg-[#0f131f] text-xs font-semibold my-1 py-2">
                                    <div className="flex justify-between py-1">
                                      {bet1}:{" "}
                                      {userSettings.odds_format === "American"
                                        ? useAmericanOdds(price1)
                                        : price1}{" "}
                                      <div className="">
                                        {bookie1[0]} | $
                                        {thousandsSeparators(
                                          parseFloat(betAmount1).toFixed(2)
                                        )}
                                      </div>
                                      {Object.values(betValue).length == 4 && (
                                        <div>{bookie3[0]}</div>
                                      )}
                                    </div>
                                    <div className="flex justify-between py-1">
                                      {bet2}:{" "}
                                      {userSettings.odds_format === "American"
                                        ? useAmericanOdds(price2)
                                        : price2}{" "}
                                      <div className="pl-1">
                                        {bookie2[0]} | $
                                        {thousandsSeparators(
                                          parseFloat(betAmount2).toFixed(2)
                                        )}
                                      </div>
                                      {Object.values(betValue).length == 4 && (
                                        <div>
                                          $
                                          {thousandsSeparators(
                                            parseFloat(betAmount3).toFixed(2)
                                          )}
                                        </div>
                                      )}
                                    </div>
                                    {Object.values(betValue).length == 4 && (
                                      <div>
                                        {bet3}:{" "}
                                        {userSettings.odds_format === "American"
                                          ? useAmericanOdds(price3)
                                          : price3}
                                      </div>
                                    )}
                                  </td>
                                  {/* <td
                                    className="px-4 block text-right text-gray-200"
                                    data-label={t("arbitrageTable.bookmaker")}
                                  >
                                    <div>
                                      {bookie1[0]} - $
                                      {thousandsSeparators(
                                        parseFloat(betAmount1).toFixed(2)
                                      )}
                                    </div>

                                    {Object.values(betValue).length == 4 && (
                                      <div>{bookie3[0]}</div>
                                    )}
                                  </td>
                                  <td
                                    className="px-4 block text-right text-gray-200"
                                    data-label={t("arbitrageTable.betAmount")}
                                  >
                                    <div>
                                      {bookie2[0]} - $
                                      {thousandsSeparators(
                                        parseFloat(betAmount2).toFixed(2)
                                      )}
                                    </div>

                                    {Object.values(betValue).length == 4 && (
                                      <div>
                                        $
                                        {thousandsSeparators(
                                          parseFloat(betAmount3).toFixed(2)
                                        )}
                                      </div>
                                    )}
                                  </td> */}
                                  <td
                                    className="px-4 block text-right text-gray-200 text-sm font-semibold"
                                    data-label={t("arbitrageTable.totalStake")}
                                  >
                                    $
                                    {thousandsSeparators(
                                      parseFloat(betStake).toFixed(2)
                                    )}
                                  </td>
                                  <td
                                    className="px-4 block text-right text-gray-200 text-sm font-semibold"
                                    data-label={t("arbitrageTable.profit")}
                                  >
                                    $
                                    {thousandsSeparators(
                                      parseFloat(betProfit).toFixed(2)
                                    )}
                                  </td>
                                  <td className="flex justify-evenly mt-2">
                                    <div
                                      className="px-4 text-center flex justify-center items-center col-span-6 bg-[#155E75] w-full cursor-pointer py-2"
                                      data-label=""
                                      onClick={(e) => {
                                        handleCalculator(e, currentGameDetails);
                                      }}
                                    >
                                      {!savedBetsState.includes(betID) && (
                                        <CalculatorIcon
                                          className="h-5 w-5 text-white"
                                          aria-hidden="true"
                                        />
                                      )}
                                    </div>
                                    {/* <div
                                      className="px-4 block text-center font-semibold col-span-6 bg-cyan-500 w-full py-2"
                                      data-label=""
                                    >
                                      {savedBetsState.includes(betID) ? (
                                        <div className="text-white flex items-center justify-center">
                                          <CheckCircleIcon
                                            className="h-6 w-6 "
                                            aria-hidden="true"
                                          />
                                        </div>
                                      ) : (
                                        <button
                                          className="text-white"
                                          onClick={(event) => {
                                            handleBetDetails(
                                              event,
                                              currentGameDetails
                                            );
                                          }}
                                        >
                                          {t("arbitrageTable.track")}
                                          <span className="sr-only">
                                            {" "}
                                            {t("arbitrageTable.save")}
                                          </span>
                                        </button>
                                      )}
                                    </div> */}
                                    <div
                                      className="px-4 block text-center font-semibold col-span-6 bg-cyan-500 w-full py-2"
                                      data-label=""
                                      onClick={(event) => {
                                        if (!savedBetsState.includes(betID)) {
                                          handleBetDetails(
                                            event,
                                            currentGameDetails
                                          );
                                        }
                                      }}
                                    >
                                      {savedBetsState.includes(betID) ? (
                                        <div className="text-white flex items-center justify-center">
                                          <CheckCircleIcon
                                            className="h-6 w-6 "
                                            aria-hidden="true"
                                          />
                                        </div>
                                      ) : (
                                        <>
                                          {t("arbitrageTable.track")}
                                          <span className="sr-only">
                                            {" "}
                                            {t("arbitrageTable.save")}
                                          </span>
                                        </>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </React.Fragment>
                        ))}
                      </tbody>
                    ))}
                  </>
                ) : (
                  <></>
                )}
              </table>
              {/* ends mobile table */}
              <table className="min-w-full divide-y divide-gray-600 hidden sm:inline-table">
                <thead className="bg-[#155E75]">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-100 sm:pl-6"
                    >
                      {t("arbitrageTable.game")}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-100"
                    >
                      {t("arbitrageTable.mlBet")}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-100"
                    >
                      {t("arbitrageTable.bookmaker")}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-100"
                    >
                      {t("arbitrageTable.betAmount")}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-100"
                    >
                      {t("arbitrageTable.totalStake")}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-100"
                    >
                      {t("arbitrageTable.profit")}
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">
                        {" "}
                        {t("arbitrageTable.save")}
                      </span>
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">
                        {" "}
                        {t("arbitrageTable.calculator")}
                      </span>
                    </th>
                  </tr>
                </thead>

                {response.length !== 0 && (
                  <>
                    {response.map((game, gameIdx) => (
                      <tbody className="" key={gameIdx}>
                        {game.arbitrage.map((bet, betIdx) => (
                          <React.Fragment key={betIdx}>
                            {Object.values(bet).map((betValue, betValueIdx) => {
                              let gameID = game.game_id;
                              let betID = betValue.bet[0].bet_id;
                              let homeTeam = game.home_team;
                              let awayTeam = game.away_team;
                              let gameTime = game.game_time;
                              let betStake = betValue.bet[0].stake;
                              let betProfit = betValue.bet[0].profit;
                              let sportLeage = game.sport;

                              //Bet Details
                              //Outcome 1
                              let bet1 = Object.keys(betValue)[0];
                              let price1 = Object.keys(
                                Object.values(betValue)[0]
                              );
                              let bookie1 = Object.values(
                                Object.values(betValue)[0]
                              )[0];
                              let betAmount1 = Object.values(
                                betValue.bet[0]
                              )[1];

                              //Outcome 2
                              let bet2 = Object.keys(betValue)[1];
                              let price2 = Object.keys(
                                Object.values(betValue)[1]
                              );
                              let bookie2 = Object.values(
                                Object.values(betValue)[1]
                              )[0];
                              let betAmount2 = Object.values(
                                betValue.bet[0]
                              )[2];

                              //Check if the game is a non-binary outcome (win/lose/draw)
                              if (Object.values(betValue).length == 4) {
                                var bet3 = Object.keys(betValue)[2];
                                var price3 = Object.keys(
                                  Object.values(betValue)[2]
                                );
                                var bookie3 = Object.values(
                                  Object.values(betValue)[2]
                                )[0];
                                var betAmount3 = Object.values(
                                  betValue.bet[0]
                                )[3];
                              } else {
                                var bet3 = "-";
                                var price3 = "0";
                                var bookie3 = "-";
                                var betAmount3 = "0";
                              }

                              let currentGameDetails = {
                                gameID,
                                betID,
                                sportLeage,
                                homeTeam,
                                awayTeam,
                                gameTime,
                                betStake,
                                betProfit,
                                bet1,
                                price1: price1[0],
                                bookie1: bookie1[0],
                                betAmount1,
                                bet2,
                                price2: price2[0],
                                bookie2: bookie2[0],
                                betAmount2,
                                bet3,
                                price3: price3[0],
                                bookie3: bookie3[0],
                                betAmount3,
                              };

                              return (
                                <tr
                                  key={betValueIdx}
                                  className={
                                    [gameIdx] % 2 === 0
                                      ? undefined
                                      : "bg-[#0f131f]/10"
                                  }
                                >
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                    <div className="ml-4">
                                      <div className="font-medium text-gray-200">
                                        {homeTeam} vs {awayTeam}
                                      </div>
                                      <div className="text-gray-300">
                                        {t("arbitrageTable.gameStarts")}{" "}
                                        {gameTimeDelta(gameTime)}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300 bg-[#0f131f]/80 font-medium">
                                    <div>
                                      {bet1}:{" "}
                                      {userSettings.odds_format === "American"
                                        ? useAmericanOdds(price1)
                                        : price1}
                                    </div>
                                    <div>
                                      {bet2}:{" "}
                                      {userSettings.odds_format === "American"
                                        ? useAmericanOdds(price2)
                                        : price2}
                                    </div>
                                    {Object.values(betValue).length == 4 && (
                                      <div>
                                        {bet3}:{" "}
                                        {userSettings.odds_format === "American"
                                          ? useAmericanOdds(price3)
                                          : price3}
                                      </div>
                                    )}
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300 bg-[#0f131f]/80 font-medium">
                                    <div>{bookie1[0]}</div>
                                    <div>{bookie2[0]}</div>
                                    {Object.values(betValue).length == 4 && (
                                      <div>{bookie3[0]}</div>
                                    )}
                                  </td>
                                  <td className="whitespace-nowrap px-8 py-4 text-sm text-gray-300 bg-[#0f131f]/80 font-medium">
                                    <div>
                                      $
                                      {thousandsSeparators(
                                        parseFloat(betAmount1).toFixed(2)
                                      )}
                                    </div>
                                    <div>
                                      $
                                      {thousandsSeparators(
                                        parseFloat(betAmount2).toFixed(2)
                                      )}
                                    </div>
                                    {Object.values(betValue).length == 4 && (
                                      <div>
                                        $
                                        {thousandsSeparators(
                                          parseFloat(betAmount3).toFixed(2)
                                        )}
                                      </div>
                                    )}
                                  </td>
                                  <td className="whitespace-nowrap px-10 py-4 text-sm text-gray-300">
                                    $
                                    {thousandsSeparators(
                                      parseFloat(betStake).toFixed(2)
                                    )}
                                  </td>
                                  <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-300">
                                    $
                                    {thousandsSeparators(
                                      parseFloat(betProfit).toFixed(2)
                                    )}
                                  </td>
                                  <td className="relative whitespace-nowrap py-4 pl-4 pr-4 text-right text-sm font-medium sm:pr-6">
                                    {!savedBetsState.includes(betID) && (
                                      <a
                                        href="#"
                                        onClick={(e) => {
                                          handleCalculator(
                                            e,
                                            currentGameDetails
                                          );
                                        }}
                                      >
                                        <CalculatorIcon
                                          className="h-6 w-6 text-white hover:text-cyan-600 hover:scale-110 hover:ease-in-out duration-200"
                                          aria-hidden="true"
                                        />
                                        <span className="sr-only">, {}</span>
                                      </a>
                                    )}
                                  </td>
                                  <td className="relative whitespace-nowrap py-4 pl-0 pr-4 text-right text-sm font-medium sm:pr-6">
                                    {savedBetsState.includes(betID) ? (
                                      <div className="text-cyan-500 hover:text-gray-300 hover:animate-bounce flex items-center justify-center">
                                        <CheckCircleIcon
                                          className="h-6 w-6 "
                                          aria-hidden="true"
                                        />
                                      </div>
                                    ) : (
                                      <button
                                        className="text-white hover:text-cyan-600 hover:scale-110 hover:ease-in-out duration-200"
                                        onClick={(event) => {
                                          handleBetDetails(
                                            event,
                                            currentGameDetails
                                          );
                                        }}
                                      >
                                        {t("arbitrageTable.track")}
                                        <span className="sr-only">
                                          {" "}
                                          {t("arbitrageTable.save")}
                                        </span>
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </React.Fragment>
                        ))}
                      </tbody>
                    ))}
                  </>
                )}
              </table>

              {response.length === 0 && (
                <div className="flex-col mb-4 rounded-b-2xl">
                  <div className="mt-0 flex justify-center ">
                    {" "}
                    <Image
                      src="/images/avatar.gif"
                      alt="no results"
                      width={50}
                      height={50}
                      className="mt-4"
                    />
                  </div>
                  <div className="flex justify-center">
                    {" "}
                    <p className="text-bold text-gray-400 mb-2 ">
                      {t("arbitrageTable.noArbitrage")}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {openCalculator && (
        <ArbCalculator
          openCalc={setOpenCalculator}
          currrentState={openCalculator}
          gameData={gameData}
          setSavedBetsState={setSavedBetsState}
          savedBetsState={savedBetsState}
          oddsFormat={userSettings.odds_format}
        />
      )}
      <ToastContainer />
    </div>
  );
}
