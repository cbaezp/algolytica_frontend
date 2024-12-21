import { CalculatorIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import EvCalulator from "./EvCalculator";
import { useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
//toast notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { capitalizeFirstLetter } from "./utilsFunc";
import useUserSettings from "../hooks/useUserSettings";
import useAmericanOdds from "../hooks/useAmericanOdds";
import { thousandsSeparators } from "./trackerEv/CalcFunc";
import useTranslation from "next-translate/useTranslation";

export default function ProEvTable({ response, dasboardTable = false }) {
  const { t } = useTranslation("ev");
  const user = useSelector((state) => state.auth.user);
  const userSettings = useUserSettings();
  const [openCalculator, setOpenCalculator] = useState(false);
  const [winProbability, setWinProbability] = useState(0);
  const [betAmount, setBetAmount] = useState(0);
  const [bookiePrice, setBookiePrice] = useState(0);
  const [kellyValues, setKellyValues] = useState({});
  const [savedBetsState, setSavedBetsState] = useState([]);
  const [gameData, setGameData] = useState({});

  const handleCalculator = (
    betProbability,
    betAmount,
    bookiePrice,
    kellyValues,
    game
  ) => {
    setOpenCalculator(true);
    setWinProbability(betProbability);
    setBetAmount(betAmount);
    setBookiePrice(bookiePrice);
    setKellyValues(kellyValues);
    setGameData(game);
  };

  const handleBetDetails = (e, game, bet) => {
    e.stopPropagation();

    let saveDetails = {
      recommendation: "Positive EV",
      notes: "",
      game_date: `${game.game_time}`,
      sport_league: game.sport_key,
      bookie: bet.from,
      game_id: game.game_id,
      title: `${Object.keys(bet)[0]}: ${Object.values(bet)[0]}`,
      home_team: game.home_team,
      away_team: game.away_team,
      win_probability: `${bet.positive_ev.probability_to_win}`,
      expected_ev_value: `${bet.positive_ev.expected_ev_value}`,
      bet_amount: `${bet.positive_ev.kelly_values[0].bet_amount.toFixed(2)}`,
      bet_price: `${Object.values(bet)[0]}`,
      true_line_price: `${bet.positive_ev.kelly_values[0].true_line_price}`,
      bankroll_percentage: `${bet.positive_ev.kelly_values[0].bankroll_fraction}`,
      bet_payout: "0",
      outcome: "PENDING",
      bet_saved_mode: "automatic",
    };

    const saveBet = async () => {
      const response = await fetch("/api/content/ev-bets/", {
        method: "POST",
        body: JSON.stringify(saveDetails),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.status === 201) {
        toast.success(
          `${t("trackMessage.part1")} ${Object.keys(bet)[0]}: ${Object.values(bet)[0]
          } ${t("trackMessage.part2")} `,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );

        setSavedBetsState((savedBetsState) =>
          savedBetsState.concat(bet.positive_ev.kelly_values[0].bet_id)
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

  return (
    <div className="">
      <div className="mt-0 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-2xl bg-[#0f131f]/60">
              {/* starts mobile table */}
              <table className="sm:hidden text-white b-0 w-full">
                <thead className="border-none overflow-hidden p-0 absolute w-0 bg-[#155E75]">
                  <tr className="block">
                    <th scope="col" className="text-sm text-gray-00">
                      {t("evTable.game")}
                    </th>
                    <th scope="col" className="text-sm text-gray-100">
                      {t("evTable.moneyLineBet")}
                    </th>
                    <th scope="col" className="text-sm text-gray-100">
                      {t("evTable.bookmaker")}
                    </th>
                    <th scope="col" className="text-sm text-gray-100">
                      {t("evTable.betAmount")}
                    </th>
                    <th scope="col" className="text-sm text-gray-100">
                      {t("evTable.bankrollFraction")}
                    </th>
                    <th scope="col" className="text-sm text-gray-100">
                      {t("evTable.winProbability")}
                    </th>
                    <th scope="col" className="text-sm text-gray-100">
                      Edit
                    </th>
                    <th scope="col" className="text-sm text-gray-100">
                      Calculator
                    </th>
                  </tr>
                </thead>
                {response.length !== 0 ? (
                  <>
                    {response.map((game, gameIdx) => (
                      <tbody key={gameIdx}>
                        {game.bet_details.map((bet, betIdx) => (
                          <tr key={betIdx} className="block">
                            <td className="px-4 block text-right before:hidden sm:block pt-2">
                              <div className="text-center">
                                {dasboardTable && (
                                  <div className="text-xs text-gray-500">
                                    {capitalizeFirstLetter(game.sport_key.split("_")[0])}:{" "}
                                    {game.sport_key.split("_")[1].toUpperCase()}
                                  </div>
                                )}
                                <div className="font-medium text-lg text-gray-200">
                                  {game.home_team} vs {game.away_team}
                                </div>
                                <div className="text-gray-400 py-1">
                                  {t("evTable.gameStartsIn")} {gameTimeDelta(game.game_time)}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 text-right text-gray-200 bg-[#0f131f]/90">
                              {Object.keys(bet)[0]}:{" "}
                              {userSettings.odds_format === "American"
                                ? useAmericanOdds(Object.values(bet)[0])
                                : Object.values(bet)[0]}
                            </td>
                            <td className="px-4 text-right text-gray-200 bg-[#0f131f]/90">
                              {bet.from}
                            </td>
                            <td className="px-4 text-right text-gray-200 bg-[#0f131f]/90">
                              ${thousandsSeparators(
                                parseFloat(bet.positive_ev.kelly_values[0].bet_amount).toFixed(2)
                              )}
                            </td>
                            <td className="px-4 text-right text-gray-200">
                              {bet.positive_ev.kelly_values[0].bankroll_fraction}%
                            </td>
                            <td className="px-4 text-right text-gray-200">
                              {bet.positive_ev.probability_to_win}%
                            </td>
                            <td className="px-4 text-center bg-[#155E75]">
                              <button
                                onClick={() => {
                                  if (
                                    !savedBetsState.includes(bet.positive_ev.kelly_values[0].bet_id)
                                  ) {
                                    const betProbability = bet.positive_ev.probability_to_win;
                                    const betAmount = bet.positive_ev.kelly_values[0].bet_amount;
                                    const bookiePrice = Object.values(bet)[0];
                                    const kellyValues = bet.positive_ev.kelly_values[0];

                                    handleCalculator(
                                      betProbability,
                                      betAmount,
                                      bookiePrice,
                                      kellyValues,
                                      game
                                    );
                                  }
                                }}
                              >
                                <CalculatorIcon
                                  className="h-7 w-7 text-gray-200"
                                  aria-hidden="true"
                                />
                              </button>
                            </td>
                          </tr>
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
                      className="pl-4 pr-3 text-left text-sm font-semibold text-gray-100 sm:pl-6"
                    >
                      {t("evTable.game")}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-1 text-left text-sm font-semibold text-gray-100"
                    >
                      {t("evTable.moneyLineBet")}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-1 text-left text-sm font-semibold text-gray-100"
                    >
                      {t("evTable.bookmaker")}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-1 text-left text-sm font-semibold text-gray-100"
                    >
                      {t("evTable.betAmount")}
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-1 text-left text-sm font-semibold text-gray-100"
                    >
                      {t("evTable.bankrollFraction")}
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-100"
                    >
                      {t("evTable.winProbability")}
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Calculator</span>
                    </th>
                  </tr>
                </thead>

                {response.length !== 0 ? (
                  <>
                    {response.map((game, gameIdx) => (
                      <tbody className="" key={gameIdx}>
                        {game.bet_details.map((bet, betIdx) => (
                          <tr
                            key={betIdx}
                            className={
                              [gameIdx] % 2 === 0
                                ? undefined
                                : "bg-[#0f131f]/10"
                            }
                          >
                            {bet.positive_ev.kelly_values[0].bet_amount !==
                              0 ? (
                              <>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                  <div className="flex items-center"></div>
                                  <div className="ml-4">
                                    {dasboardTable == true && (
                                      <div className="text-xs text-gray-500">
                                        {capitalizeFirstLetter(
                                          game.sport_key.split("_")[0]
                                        )}
                                        :{" "}
                                        {game.sport_key
                                          .split("_")[1]
                                          .toUpperCase()}
                                      </div>
                                    )}
                                    <div className="font-medium text-gray-200">
                                      {game.home_team} vs {game.away_team}
                                    </div>
                                    <div className="text-gray-400">
                                      {t("evTable.gameStartsIn")}{" "}
                                      {gameTimeDelta(game.game_time)}
                                    </div>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                  {Object.keys(bet)[0]}:{" "}
                                  {userSettings.odds_format === "American"
                                    ? useAmericanOdds(Object.values(bet)[0])
                                    : Object.values(bet)[0]}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                  {bet.from}
                                </td>

                                <td className="whitespace-nowrap px-8 py-4 text-sm text-gray-300">
                                  $
                                  {thousandsSeparators(
                                    parseFloat(
                                      bet.positive_ev.kelly_values[0].bet_amount
                                    ).toFixed(2)
                                  )}
                                </td>
                                <td className="whitespace-nowrap px-10 py-4 text-sm text-gray-300">
                                  {
                                    bet.positive_ev.kelly_values[0]
                                      .bankroll_fraction
                                  }
                                  %
                                </td>
                                <td className="whitespace-nowrap px-10 py-4 text-sm text-gray-300">
                                  {bet.positive_ev.probability_to_win}%
                                </td>

                                <td className="relative whitespace-nowrap py-4 pl-4 pr-4 text-right text-sm font-medium sm:pr-6">
                                  {savedBetsState.includes(
                                    bet.positive_ev.kelly_values[0].bet_id
                                  ) ? (
                                    <></>
                                  ) : (
                                    <a
                                      href="#"
                                      onClick={() => {
                                        const betProbability =
                                          bet.positive_ev.probability_to_win;
                                        const betAmount =
                                          bet.positive_ev.kelly_values[0]
                                            .bet_amount;
                                        const bookiePrice =
                                          Object.values(bet)[0];
                                        const kellyValues =
                                          bet.positive_ev.kelly_values[0];

                                        handleCalculator(
                                          betProbability,
                                          betAmount,
                                          bookiePrice,
                                          kellyValues,
                                          game
                                        );
                                      }}
                                    >
                                      <CalculatorIcon
                                        className="h-6 w-6 text-gray-400 hover:text-cyan-600 hover:scale-110 hover:ease-in-out duration-200"
                                        aria-hidden="true"
                                      />
                                      <span className="sr-only">, { }</span>
                                    </a>
                                  )}
                                </td>
                                <td className="relative whitespace-nowrap py-4 pl-0 pr-4 text-right text-sm font-medium sm:pr-6">
                                  {savedBetsState.includes(
                                    bet.positive_ev.kelly_values[0].bet_id
                                  ) ? (
                                    <div className="text-cyan-500 hover:text-gray-300 hover:animate-bounce flex justify-center">
                                      <CheckCircleIcon
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                      />
                                    </div>
                                  ) : (
                                    <button
                                      className="text-gray-400 hover:text-cyan-600 hover:scale-110 hover:ease-in-out duration-200"
                                      onClick={(event) => {
                                        handleBetDetails(event, game, bet);
                                      }}
                                    >
                                      {t("evTable.track")}
                                      <span className="sr-only">save</span>
                                    </button>
                                  )}
                                </td>
                              </>
                            ) : (
                              <></>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    ))}
                  </>
                ) : (
                  <></>
                )}
              </table>

              {response.length === 0 ? (
                <div className="flex-col mb-4 rounded-b-2xl">
                  <div className="mt-0 flex justify-center">
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
                    <p className="text-bold text-gray-400 mb-2">
                      {t("evTable.noResults")}
                    </p>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      {openCalculator && (
        <EvCalulator
          openCalc={setOpenCalculator}
          currrentState={openCalculator}
          probability={winProbability}
          betAmount={betAmount}
          bookiePrice={bookiePrice}
          kellyValues={kellyValues}
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
